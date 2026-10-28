/**
 * Firebase & Site Data Service for Dr. Rafiqul Islam MP Website
 * Handles Firestore, Authentication, Storage, with graceful offline/local fallback.
 */

const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyCp3fITNSYxEw-_SoertNeqAdISaXiohz4",
    authDomain: "dr-rafiqul-islam.firebaseapp.com",
    projectId: "dr-rafiqul-islam",
    storageBucket: "dr-rafiqul-islam.firebasestorage.app",
    messagingSenderId: "792519959845",
    appId: "1:792519959845:web:a33c3dc3745e02f76ca6cc",
    measurementId: "G-2QZJSBV34Q"
};

class SiteDataService {
    constructor() {
        this.app = null;
        this.db = null;
        this.auth = null;
        this.storage = null;
        this.isConfigured = false;
        this.listeners = [];
        this.init();
    }

    init() {
        let config = null;
        const storedConfig = localStorage.getItem('firebase_site_config');
        if (storedConfig) {
            try {
                config = JSON.parse(storedConfig);
            } catch (e) {
                console.error("Invalid stored Firebase config", e);
            }
        }

        if (!config && DEFAULT_FIREBASE_CONFIG.projectId) {
            config = DEFAULT_FIREBASE_CONFIG;
        }

        if (config && config.projectId && config.apiKey && typeof firebase !== 'undefined') {
            try {
                if (!firebase.apps.length) {
                    this.app = firebase.initializeApp(config);
                } else {
                    this.app = firebase.app();
                }
                this.db = firebase.firestore();
                this.auth = firebase.auth();
                this.storage = firebase.storage();
                this.isConfigured = true;
                console.log("Firebase initialized successfully with project:", config.projectId);
            } catch (err) {
                console.warn("Firebase initialization failed, falling back to local storage:", err);
                this.isConfigured = false;
            }
        } else {
            this.isConfigured = false;
        }
    }

    saveFirebaseConfig(config) {
        if (!config || !config.projectId) {
            throw new Error("Project ID is required");
        }
        localStorage.setItem('firebase_site_config', JSON.stringify(config));
        this.init();
        return this.isConfigured;
    }

    getFirebaseConfig() {
        const stored = localStorage.getItem('firebase_site_config');
        return stored ? JSON.parse(stored) : DEFAULT_FIREBASE_CONFIG;
    }

    clearFirebaseConfig() {
        localStorage.removeItem('firebase_site_config');
        this.isConfigured = false;
    }

    /**
     * Fetch complete site content:
     * 1. If Firebase configured -> Firestore
     * 2. Else -> LocalStorage cache
     * 3. Else -> data/default_data.json
     */
    async getSiteData() {
        if (this.isConfigured && this.db) {
            try {
                const doc = await this.db.collection('site_content').doc('main').get();
                if (doc.exists) {
                    const data = doc.data();
                    localStorage.setItem('cached_site_data', JSON.stringify(data));
                    return data;
                }
            } catch (err) {
                console.warn("Could not fetch from Firestore, trying local cache:", err);
            }
        }

        const cached = localStorage.getItem('cached_site_data');
        if (cached) {
            try {
                return JSON.parse(cached);
            } catch (e) {}
        }

        // Fallback to default_data.json (handles root /, /admin/, or subpath)
        const possibleUrls = [
            'data/default_data.json',
            '../data/default_data.json',
            '/data/default_data.json'
        ];

        for (const url of possibleUrls) {
            try {
                const resp = await fetch(url);
                if (resp.ok) {
                    const data = await resp.json();
                    localStorage.setItem('cached_site_data', JSON.stringify(data));
                    return data;
                }
            } catch (err) {
                // Continue to next candidate URL
            }
        }

        console.error("Failed to load default_data.json from any known path");
        return null;
    }

    /**
     * Subscribe to real-time site updates (useful for live preview on public site)
     */
    subscribeToUpdates(callback) {
        if (this.isConfigured && this.db) {
            return this.db.collection('site_content').doc('main')
                .onSnapshot((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        localStorage.setItem('cached_site_data', JSON.stringify(data));
                        callback(data);
                    }
                }, (err) => {
                    console.warn("Firestore snapshot listener error:", err);
                });
        }
        return () => {};
    }

    /**
     * Save site data:
     * Writes to Firestore if configured with timeout protection; always updates local cache.
     */
    async saveSiteData(data) {
        // Immediate local cache save - instant feedback
        localStorage.setItem('cached_site_data', JSON.stringify(data));

        if (this.isConfigured && this.db) {
            try {
                // Timeout after 2.5s if Firestore rules block or DB isn't created yet
                const firestorePromise = this.db.collection('site_content').doc('main').set(data, { merge: true });
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Firebase timeout: Firestore Database may not be enabled or rules are blocking writes.')), 2500)
                );

                await Promise.race([firestorePromise, timeoutPromise]);
                return { success: true, destination: 'cloud' };
            } catch (err) {
                console.warn("Firestore save delayed or failed, saved locally:", err);
                return { success: true, destination: 'local', warning: err.message };
            }
        }

        return { success: true, destination: 'local' };
    }

    /**
     * Compress image using canvas (resizes to max 1200px width/height and compresses to JPEG)
     */
    async compressImage(file, maxDim = 1200, quality = 0.75) {
        return new Promise((resolve) => {
            if (!file || !file.type || !file.type.startsWith('image/')) {
                return resolve(file);
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    let w = img.width;
                    let h = img.height;
                    if (w > maxDim || h > maxDim) {
                        if (w > h) {
                            h = Math.round((h * maxDim) / w);
                            w = maxDim;
                        } else {
                            w = Math.round((w * maxDim) / h);
                            h = maxDim;
                        }
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = w;
                    canvas.height = h;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, w, h);
                    const dataUrl = canvas.toDataURL('image/jpeg', quality);
                    resolve(dataUrl);
                };
                img.onerror = () => resolve(e.target.result);
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    /**
     * Upload an image:
     * Compresses the image first, then uploads to Firebase Storage or returns compact data URL.
     */
    async uploadImage(file, pathPrefix = 'uploads') {
        if (!file) throw new Error("No file provided");

        const compressedDataUrl = await this.compressImage(file);

        if (this.isConfigured && this.storage) {
            try {
                const filename = `${pathPrefix}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
                const storageRef = this.storage.ref().child(filename);
                // Convert dataUrl to blob
                const resp = await fetch(compressedDataUrl);
                const blob = await resp.blob();
                const snapshot = await storageRef.put(blob);
                const downloadURL = await snapshot.ref.getDownloadURL();
                return downloadURL;
            } catch (err) {
                console.warn("Firebase storage upload failed, using compressed base64:", err);
            }
        }

        return compressedDataUrl;
    }

    // Auth methods
    async login(email, password) {
        if (this.isConfigured && this.auth) {
            try {
                return await this.auth.signInWithEmailAndPassword(email, password);
            } catch (authErr) {
                // If user not yet created in Firebase Console, fallback to master local password
                const adminPass = localStorage.getItem('local_admin_password') || 'admin123';
                if (password === adminPass) {
                    const mockUser = { email: email || 'admin@drsmrafiqulislammp.info', uid: 'master-admin-uid' };
                    localStorage.setItem('local_admin_user', JSON.stringify(mockUser));
                    return { user: mockUser };
                }
                throw authErr;
            }
        }
        // Local simulation if Firebase auth isn't configured
        const adminPass = localStorage.getItem('local_admin_password') || 'admin123';
        if (password === adminPass) {
            const mockUser = { email: email || 'admin@drsmrafiqulislammp.info', uid: 'local-admin-uid' };
            localStorage.setItem('local_admin_user', JSON.stringify(mockUser));
            return { user: mockUser };
        } else {
            throw new Error("ভুল পাসওয়ার্ড! (পূর্বনির্ধারিত পাসওয়ার্ড: admin123)");
        }
    }

    async logout() {
        if (this.isConfigured && this.auth) {
            try {
                await this.auth.signOut();
            } catch (e) {}
        }
        localStorage.removeItem('local_admin_user');
    }

    onAuthChange(callback) {
        if (this.isConfigured && this.auth) {
            return this.auth.onAuthStateChanged((user) => {
                if (user) {
                    callback(user);
                } else {
                    const storedUser = localStorage.getItem('local_admin_user');
                    callback(storedUser ? JSON.parse(storedUser) : null);
                }
            });
        } else {
            const storedUser = localStorage.getItem('local_admin_user');
            callback(storedUser ? JSON.parse(storedUser) : null);
            return () => {};
        }
    }

    getCurrentUser() {
        if (this.isConfigured && this.auth && this.auth.currentUser) {
            return this.auth.currentUser;
        }
        const storedUser = localStorage.getItem('local_admin_user');
        return storedUser ? JSON.parse(storedUser) : null;
    }

    /**
     * Citizen Messages Portal
     */
    async submitCitizenMessage(msg) {
        const item = {
            id: `msg_${Date.now()}`,
            name: msg.name,
            phone: msg.phone,
            category: msg.category || 'সাধারণ',
            message: msg.message,
            createdAt: new Date().toISOString()
        };

        // Always save to local cache
        const localMsgs = JSON.parse(localStorage.getItem('cached_citizen_messages') || '[]');
        localMsgs.unshift(item);
        localStorage.setItem('cached_citizen_messages', JSON.stringify(localMsgs));

        // Save to Firestore if available
        if (this.isConfigured && this.db) {
            try {
                await this.db.collection('citizen_messages').doc(item.id).set(item);
            } catch (err) {
                console.warn("Could not save message to Firestore, saved locally:", err);
            }
        }

        return item;
    }

    async getCitizenMessages() {
        if (this.isConfigured && this.db) {
            try {
                const snapshot = await this.db.collection('citizen_messages').orderBy('createdAt', 'desc').get();
                const list = [];
                snapshot.forEach(doc => list.push(doc.data()));
                if (list.length > 0) {
                    localStorage.setItem('cached_citizen_messages', JSON.stringify(list));
                    return list;
                }
            } catch (err) {
                console.warn("Could not fetch messages from Firestore, using cache:", err);
            }
        }

        return JSON.parse(localStorage.getItem('cached_citizen_messages') || '[]');
    }

    async deleteCitizenMessage(msgId) {
        let localMsgs = JSON.parse(localStorage.getItem('cached_citizen_messages') || '[]');
        localMsgs = localMsgs.filter(m => m.id !== msgId);
        localStorage.setItem('cached_citizen_messages', JSON.stringify(localMsgs));

        if (this.isConfigured && this.db) {
            try {
                await this.db.collection('citizen_messages').doc(msgId).delete();
            } catch (err) {
                console.warn("Could not delete from Firestore:", err);
            }
        }

        return true;
    }
}

// Global instance
window.siteDataService = new SiteDataService();

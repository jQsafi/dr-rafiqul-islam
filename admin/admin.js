/**
 * Admin Panel JavaScript Engine for Dr. S. M. Rafiqul Islam MP Website
 * Comprehensive manager for Themes, Per-Section Colors, Fonts, Sliders, and Section Content.
 */

document.addEventListener('DOMContentLoaded', async () => {
    let siteData = null;

    // UI Element References
    const authOverlay = document.getElementById('authOverlay');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const saveAllBtn = document.getElementById('saveAllBtn');
    const connectionStatusBadge = document.getElementById('connectionStatusBadge');
    const connectionStatusText = document.getElementById('connectionStatusText');
    const admToast = document.getElementById('admToast');
    const toastMsg = document.getElementById('toastMsg');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');

    // Firebase Modal References
    const firebaseModal = document.getElementById('firebaseModal');
    const openFirebaseSetupBtn = document.getElementById('openFirebaseSetupBtn');
    const reopenFirebaseModalBtn = document.getElementById('reopenFirebaseModalBtn');
    const closeFirebaseModalBtn = document.getElementById('closeFirebaseModalBtn');
    const firebaseConfigForm = document.getElementById('firebaseConfigForm');
    const clearFirebaseBtn = document.getElementById('clearFirebaseBtn');

    // Helper: Show Toast Notification
    function showToast(message, isError = false) {
        toastMsg.textContent = message;
        admToast.style.borderColor = isError ? 'var(--adm-danger)' : 'var(--adm-primary)';
        admToast.classList.add('show');
        setTimeout(() => admToast.classList.remove('show'), 3500);
    }

    // Helper: Update Connection Status UI
    function updateConnectionStatus() {
        const isConfigured = window.siteDataService && window.siteDataService.isConfigured;
        const detailsEl = document.getElementById('firebaseStatusDetails');

        if (isConfigured) {
            connectionStatusBadge.className = 'status-badge';
            connectionStatusText.innerHTML = '<i class="fas fa-check-circle"></i> Firebase Firestore কানেক্টেড';
            if (detailsEl) {
                const cfg = window.siteDataService.getFirebaseConfig();
                detailsEl.innerHTML = `
                    <div style="color: #10b981; margin-bottom: 8px;"><strong>✓ ফায়ারবেস সংযুক্ত রয়েছে</strong></div>
                    <div><strong>Project ID:</strong> ${cfg.projectId || 'N/A'}</div>
                    <div><strong>Auth Domain:</strong> ${cfg.authDomain || 'N/A'}</div>
                    <div><strong>Storage Bucket:</strong> ${cfg.storageBucket || 'N/A'}</div>
                `;
            }
        } else {
            connectionStatusBadge.className = 'status-badge offline';
            connectionStatusText.innerHTML = '<i class="fas fa-exclamation-triangle"></i> লোকাল মেমরি (ডেমো মোড)';
            if (detailsEl) {
                detailsEl.innerHTML = `
                    <div style="color: #fbbf24; margin-bottom: 8px;"><strong>! Firebase এখনও কনফিগার করা হয়নি</strong></div>
                    <p style="color: var(--adm-text-muted);">বর্তমানে সকল পরিবর্তন ব্রাউজারের লোকাল স্টোরেজে সেভ হচ্ছে। যেকোনো সময় আপনার Firebase কী দিয়ে কানেক্ট করতে পারেন।</p>
                `;
            }
        }
    }

    // Tab Navigation Logic
    const tabButtons = document.querySelectorAll('.sidebar-nav .nav-item button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTabId = btn.getAttribute('data-tab');

            tabButtons.forEach(b => b.parentElement.classList.remove('active'));
            btn.parentElement.classList.add('active');

            tabPanes.forEach(pane => {
                pane.classList.toggle('active', pane.id === targetTabId);
            });

            if (targetTabId === 'tab-inbox') {
                renderInboxMessages();
            }

            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
            }
        });
    });

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Auth Listeners & Login Handling
    async function checkAuth() {
        const currentUser = window.siteDataService ? window.siteDataService.getCurrentUser() : null;
        if (currentUser) {
            authOverlay.style.display = 'none';
            await loadAllData();
        } else {
            authOverlay.style.display = 'flex';
        }
        updateConnectionStatus();
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('adminEmail').value.trim();
            const password = document.getElementById('adminPassword').value.trim();

            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';
            submitBtn.disabled = true;

            try {
                await window.siteDataService.login(email, password);
                authOverlay.style.display = 'none';
                showToast("সফলভাবে লগইন হয়েছে!");
                await loadAllData();
            } catch (err) {
                alert("লগইন ব্যর্থ: " + (err.message || "পাসওয়ার্ড সঠিক নয়"));
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                updateConnectionStatus();
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (confirm("আপনি কি নিশ্চিত লগআউট করতে চান?")) {
                await window.siteDataService.logout();
                authOverlay.style.display = 'flex';
                showToast("লগআউট সফল হয়েছে");
            }
        });
    }

    // Firebase Setup Modal Handlers
    function populateFirebaseForm() {
        const cfg = window.siteDataService ? window.siteDataService.getFirebaseConfig() : {};
        document.getElementById('fbProjectId').value = cfg.projectId || '';
        document.getElementById('fbApiKey').value = cfg.apiKey || '';
        document.getElementById('fbAuthDomain').value = cfg.authDomain || '';
        document.getElementById('fbStorageBucket').value = cfg.storageBucket || '';
        document.getElementById('fbAppId').value = cfg.appId || '';
    }

    if (openFirebaseSetupBtn) {
        openFirebaseSetupBtn.addEventListener('click', () => {
            populateFirebaseForm();
            firebaseModal.style.display = 'flex';
        });
    }
    if (reopenFirebaseModalBtn) {
        reopenFirebaseModalBtn.addEventListener('click', () => {
            populateFirebaseForm();
            firebaseModal.style.display = 'flex';
        });
    }
    if (closeFirebaseModalBtn) {
        closeFirebaseModalBtn.addEventListener('click', () => {
            firebaseModal.style.display = 'none';
        });
    }
    if (firebaseConfigForm) {
        firebaseConfigForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const cfg = {
                projectId: document.getElementById('fbProjectId').value.trim(),
                apiKey: document.getElementById('fbApiKey').value.trim(),
                authDomain: document.getElementById('fbAuthDomain').value.trim(),
                storageBucket: document.getElementById('fbStorageBucket').value.trim(),
                appId: document.getElementById('fbAppId').value.trim()
            };

            try {
                window.siteDataService.saveFirebaseConfig(cfg);
                firebaseModal.style.display = 'none';
                showToast("Firebase কনফিগারেশন সফল হয়েছে!");
                updateConnectionStatus();
            } catch (err) {
                alert("ত্রুটি: " + err.message);
            }
        });
    }
    if (clearFirebaseBtn) {
        clearFirebaseBtn.addEventListener('click', () => {
            if (confirm("Firebase কনফিগারেশন মুছে লোকাল মোডে ফেরত যেতে চান?")) {
                window.siteDataService.clearFirebaseConfig();
                populateFirebaseForm();
                firebaseModal.style.display = 'none';
                showToast("Firebase সংযোগ মুছে ফেলা হয়েছে");
                updateConnectionStatus();
            }
        });
    }

    // Color Pickers Helper
    function bindColorInputs(pickerId, textId) {
        const picker = document.getElementById(pickerId);
        const text = document.getElementById(textId);
        if (picker && text) {
            picker.addEventListener('input', () => { text.value = picker.value; });
            text.addEventListener('input', () => {
                if (/^#[0-9A-F]{6}$/i.test(text.value)) {
                    picker.value = text.value;
                }
            });
        }
    }

    bindColorInputs('themeBgColor', 'themeBgColorText');
    bindColorInputs('themePrimaryColor', 'themePrimaryColorText');
    bindColorInputs('themePrimaryHover', 'themePrimaryHoverText');
    bindColorInputs('themeTextMain', 'themeTextMainText');
    bindColorInputs('themeTextMuted', 'themeTextMutedText');

    // Section definitions for the Per-Section Color Manager
    const SECTIONS_CONFIG = [
        { key: 'hero', label: 'হিরো স্লাইডার সেকশন (#hero)' },
        { key: 'electionResults', label: 'নির্বাচনী ফলাফল (#election-results)' },
        { key: 'about', label: 'সংক্ষিপ্ত পরিচিতি (#about)' },
        { key: 'career', label: 'রাজনৈতিক জীবন (#career)' },
        { key: 'projects', label: 'উন্নয়ন কর্মকাণ্ড (#projects)' },
        { key: 'videos', label: 'ভিডিও গ্যালারি (#videos)' },
        { key: 'news', label: 'নিউজ ও প্রেস (#news)' },
        { key: 'faq', label: 'সাধারণ প্রশ্নাবলী (#faq)' },
        { key: 'map', label: 'প্রজেক্ট ম্যাপ (#map-section)' },
        { key: 'contact', label: 'সিটিজেন পোর্টাল ও যোগাযোগ (#contact)' },
        { key: 'footer', label: 'ফুটার সেকশন (footer)' }
    ];

    // Helper: Render Section Color Customizer
    function renderSectionColorsManager(sectionStyles = {}) {
        const container = document.getElementById('sectionColorsContainer');
        if (!container) return;

        container.innerHTML = SECTIONS_CONFIG.map(sec => {
            const cur = sectionStyles[sec.key] || {};
            const bgVal = cur.bg || 'transparent';
            const textVal = cur.textColor || '#f8fafc';
            const accentVal = cur.accentColor || '#10b981';

            // Safe hex for color inputs
            const safeBgHex = bgVal.startsWith('#') && bgVal.length === 7 ? bgVal : '#0f172a';
            const safeTextHex = textVal.startsWith('#') && textVal.length === 7 ? textVal : '#f8fafc';
            const safeAccentHex = accentVal.startsWith('#') && accentVal.length === 7 ? accentVal : '#10b981';

            return `
                <div class="item-card" data-section-key="${sec.key}">
                    <div class="item-card-header">
                        <div class="item-card-title"><i class="fas fa-layer-group" style="color:var(--adm-primary);margin-right:8px;"></i> ${sec.label}</div>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>ব্যাকগ্রাউন্ড রঙ (Background)</label>
                            <div class="color-picker-row">
                                <input type="color" class="color-input sec-bg-picker" value="${safeBgHex}">
                                <input type="text" class="form-control sec-bg-text" value="${bgVal}" placeholder="transparent অথবা #hex">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>টেক্সটের রঙ (Text Color)</label>
                            <div class="color-picker-row">
                                <input type="color" class="color-input sec-text-picker" value="${safeTextHex}">
                                <input type="text" class="form-control sec-text-text" value="${textVal}" placeholder="#hex">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>একসেন্ট রঙ (Accent/Border Color)</label>
                            <div class="color-picker-row">
                                <input type="color" class="color-input sec-accent-picker" value="${safeAccentHex}">
                                <input type="text" class="form-control sec-accent-text" value="${accentVal}" placeholder="#hex">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Wire event sync for color pickers
        container.querySelectorAll('.item-card').forEach(card => {
            const bgPicker = card.querySelector('.sec-bg-picker');
            const bgText = card.querySelector('.sec-bg-text');
            bgPicker.addEventListener('input', () => { bgText.value = bgPicker.value; });

            const textPicker = card.querySelector('.sec-text-picker');
            const textText = card.querySelector('.sec-text-text');
            textPicker.addEventListener('input', () => { textText.value = textPicker.value; });

            const accPicker = card.querySelector('.sec-accent-picker');
            const accText = card.querySelector('.sec-accent-text');
            accPicker.addEventListener('input', () => { accText.value = accPicker.value; });
        });
    }

    // Helper: Render Nav Links Manager
    function renderNavLinksManager(navLinks = []) {
        const container = document.getElementById('navLinksContainer');
        if (!container) return;

        container.innerHTML = navLinks.map((link, idx) => `
            <div class="item-card nav-link-item" data-index="${idx}">
                <div class="form-grid" style="align-items: center;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>মেনু নাম</label>
                        <input type="text" class="form-control nav-label" value="${link.label}">
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>টার্গেট লিংক (URL/Anchor)</label>
                        <input type="text" class="form-control nav-href" value="${link.href}">
                    </div>
                    <div class="form-group" style="margin-bottom: 0; width: 120px;">
                        <label>দৃশ্যমান?</label>
                        <select class="form-control nav-visible">
                            <option value="true" ${link.visible !== false ? 'selected' : ''}>হ্যাঁ</option>
                            <option value="false" ${link.visible === false ? 'selected' : ''}>না</option>
                        </select>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Helper: Render Slider Manager
    function renderSliderManager(slides = []) {
        const container = document.getElementById('sliderItemsContainer');
        if (!container) return;

        container.innerHTML = slides.map((slide, idx) => {
            const badgesText = (slide.badges || []).map(b => b.text || b).join(', ');
            return `
                <div class="item-card slide-item" data-index="${idx}">
                    <div class="item-card-header">
                        <div class="item-card-title"><span class="item-badge">স্লাইড #${idx + 1}</span></div>
                        <button type="button" class="adm-btn adm-btn-danger adm-btn-sm delete-slide-btn"><i class="fas fa-trash"></i> স্লাইড মুছুন</button>
                    </div>
                    <div class="form-grid">
                        <div class="form-group">
                            <label>স্লাইড ইমেজ (URL অথবা আপলোড করুন)</label>
                            <input type="text" class="form-control slide-image-url" value="${slide.image || ''}">
                            <div class="image-preview-container">
                                <input type="file" class="slide-file-upload" accept="image/*" style="font-size:0.85rem;">
                                <img src="../${slide.image || 'assets/politician_portrait.jpg'}" class="image-preview slide-img-preview" alt="Slide">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>স্লাইড শিরোনাম (HTML সমর্থিত, যেমন &lt;br&gt;)</label>
                            <input type="text" class="form-control slide-title" value="${slide.title.replace(/"/g, '&quot;')}">
                        </div>
                        <div class="form-group">
                            <label>সাব-টাইটেল / সংক্ষিপ্ত কথা</label>
                            <textarea class="form-control slide-subtitle" rows="2">${slide.subtitle || ''}</textarea>
                        </div>
                        <div class="form-group">
                            <label>ব্যাজসমূহ (কমা দিয়ে আলাদা করুন)</label>
                            <input type="text" class="form-control slide-badges" value="${badgesText}" placeholder="সংসদ সদস্য, বিএনপি নেতা">
                        </div>
                        <div class="form-group">
                            <label>মূল বাটন লেখা ও লিংক</label>
                            <div style="display:flex;gap:8px;">
                                <input type="text" class="form-control slide-btn1-text" value="${slide.primaryBtn ? slide.primaryBtn.text : 'বিস্তারিত জানুন'}" style="flex:1;">
                                <input type="text" class="form-control slide-btn1-url" value="${slide.primaryBtn ? slide.primaryBtn.url : '#about'}" style="flex:1;">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>সেকেন্ডারি বাটন লেখা ও লিংক</label>
                            <div style="display:flex;gap:8px;">
                                <input type="text" class="form-control slide-btn2-text" value="${slide.secondaryBtn ? slide.secondaryBtn.text : 'যোগাযোগ'}" style="flex:1;">
                                <input type="text" class="form-control slide-btn2-url" value="${slide.secondaryBtn ? slide.secondaryBtn.url : '#contact'}" style="flex:1;">
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Wire Image Upload & Delete buttons for slides
        container.querySelectorAll('.slide-item').forEach(itemEl => {
            const fileInput = itemEl.querySelector('.slide-file-upload');
            const urlInput = itemEl.querySelector('.slide-image-url');
            const previewImg = itemEl.querySelector('.slide-img-preview');
            const deleteBtn = itemEl.querySelector('.delete-slide-btn');

            if (fileInput) {
                fileInput.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        try {
                            const url = await window.siteDataService.uploadImage(file, 'slides');
                            urlInput.value = url;
                            previewImg.src = url;
                            showToast("ছবি সফলভাবে আপলোড হয়েছে!");
                        } catch (err) {
                            alert("আপলোড ব্যর্থ: " + err.message);
                        }
                    }
                });
            }

            if (urlInput) {
                urlInput.addEventListener('input', () => {
                    previewImg.src = urlInput.value.startsWith('http') || urlInput.value.startsWith('data:') ? urlInput.value : `../${urlInput.value}`;
                });
            }

            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    const idx = parseInt(itemEl.getAttribute('data-index'), 10);
                    if (confirm("এই স্লাইডটি মুছে ফেলতে চান?")) {
                        siteData.hero.slides.splice(idx, 1);
                        renderSliderManager(siteData.hero.slides);
                    }
                });
            }
        });
    }

    // Add New Slide button
    const addNewSlideBtn = document.getElementById('addNewSlideBtn');
    if (addNewSlideBtn) {
        addNewSlideBtn.addEventListener('click', () => {
            if (!siteData.hero.slides) siteData.hero.slides = [];
            siteData.hero.slides.push({
                id: `slide_${Date.now()}`,
                image: 'assets/hero_cover.jpg',
                title: 'নতুন শিরোনাম <br><span class="highlight">এখানে লিখুন</span>',
                subtitle: 'আপনার বার্তা বা বিস্তারিত তথ্য এখানে দিন।',
                badges: [{ text: 'নতুন আপডেট', style: 'default' }],
                socialLinks: [
                    { platform: 'facebook', icon: 'fab fa-facebook-f', url: 'https://www.facebook.com/Dr.Bachchu' },
                    { platform: 'whatsapp', icon: 'fab fa-whatsapp', url: '#' }
                ],
                primaryBtn: { text: 'বিস্তারিত', url: '#about', visible: true },
                secondaryBtn: { text: 'যোগাযোগ', url: '#contact', visible: true }
            });
            renderSliderManager(siteData.hero.slides);
            showToast("নতুন স্লাইড যুক্ত করা হয়েছে");
        });
    }

    // Helper: Render Election Stats Cards
    function renderElectionStats(stats = []) {
        const container = document.getElementById('electionStatsContainer');
        if (!container) return;

        container.innerHTML = stats.map((s, idx) => `
            <div class="item-card stat-item" data-index="${idx}">
                <div class="form-grid">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>আইকন (FontAwesome ক্লাস)</label>
                        <input type="text" class="form-control stat-icon" value="${s.icon || 'fas fa-chart-line'}">
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>মান / সংখ্যা (Value)</label>
                        <input type="text" class="form-control stat-val" value="${s.value}">
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>বিবরণী লেবেল (Label)</label>
                        <input type="text" class="form-control stat-lbl" value="${s.label}">
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Helper: Render Timeline Manager
    function renderTimelineManager(timeline = []) {
        const container = document.getElementById('timelineItemsContainer');
        if (!container) return;

        container.innerHTML = timeline.map((item, idx) => `
            <div class="item-card timeline-item-box" data-index="${idx}">
                <div class="item-card-header">
                    <div class="item-card-title"><span class="item-badge">মাইলফলক #${idx + 1}</span></div>
                    <button type="button" class="adm-btn adm-btn-danger adm-btn-sm delete-timeline-btn"><i class="fas fa-trash"></i> মুছুন</button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>শিরোনাম</label>
                        <input type="text" class="form-control tl-title" value="${item.title}">
                    </div>
                    <div class="form-group">
                        <label>তারিখ বা সময়কাল</label>
                        <input type="text" class="form-control tl-date" value="${item.date}">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label>বিবরণ</label>
                    <textarea class="form-control tl-desc" rows="3">${item.description}</textarea>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.delete-timeline-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.closest('.timeline-item-box').getAttribute('data-index'), 10);
                siteData.career.timeline.splice(idx, 1);
                renderTimelineManager(siteData.career.timeline);
            });
        });
    }

    const addNewTimelineBtn = document.getElementById('addNewTimelineBtn');
    if (addNewTimelineBtn) {
        addNewTimelineBtn.addEventListener('click', () => {
            if (!siteData.career.timeline) siteData.career.timeline = [];
            siteData.career.timeline.unshift({
                id: `tl_${Date.now()}`,
                title: 'নতুন রাজনৈতিক অর্জন',
                date: '২০২৬',
                description: 'এখানে বিবরণ লিখুন...'
            });
            renderTimelineManager(siteData.career.timeline);
        });
    }

    // Helper: Render Projects Manager
    function renderProjectsManager(projects = []) {
        const container = document.getElementById('projectsItemsContainer');
        if (!container) return;

        container.innerHTML = projects.map((item, idx) => `
            <div class="item-card project-item-box" data-index="${idx}">
                <div class="item-card-header">
                    <div class="item-card-title"><span class="item-badge">প্রকল্প #${idx + 1}</span></div>
                    <button type="button" class="adm-btn adm-btn-danger adm-btn-sm delete-project-btn"><i class="fas fa-trash"></i> মুছুন</button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>প্রকল্পের নাম</label>
                        <input type="text" class="form-control proj-title" value="${item.title}">
                    </div>
                    <div class="form-group">
                        <label>ক্যাটাগরি</label>
                        <input type="text" class="form-control proj-cat" value="${item.category}" placeholder="health, transport, education">
                    </div>
                    <div class="form-group">
                        <label>ছবি (URL অথবা আপলোড)</label>
                        <input type="text" class="form-control proj-img-url" value="${item.image}">
                        <div class="image-preview-container">
                            <input type="file" class="proj-file-upload" accept="image/*" style="font-size:0.85rem;">
                            <img src="../${item.image}" class="image-preview proj-img-preview" alt="Project">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>সংক্ষিপ্ত বিবরণ</label>
                        <textarea class="form-control proj-desc" rows="3">${item.description}</textarea>
                    </div>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.project-item-box').forEach(box => {
            const fileInput = box.querySelector('.proj-file-upload');
            const urlInput = box.querySelector('.proj-img-url');
            const previewImg = box.querySelector('.proj-img-preview');
            const delBtn = box.querySelector('.delete-project-btn');

            if (fileInput) {
                fileInput.addEventListener('change', async (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const url = await window.siteDataService.uploadImage(file, 'projects');
                        urlInput.value = url;
                        previewImg.src = url;
                        showToast("প্রকল্প ছবি আপলোড হয়েছে!");
                    }
                });
            }

            if (urlInput) {
                urlInput.addEventListener('input', () => {
                    previewImg.src = urlInput.value.startsWith('http') || urlInput.value.startsWith('data:') ? urlInput.value : `../${urlInput.value}`;
                });
            }

            if (delBtn) {
                delBtn.addEventListener('click', () => {
                    const idx = parseInt(box.getAttribute('data-index'), 10);
                    siteData.projects.items.splice(idx, 1);
                    renderProjectsManager(siteData.projects.items);
                });
            }
        });
    }

    const addNewProjectBtn = document.getElementById('addNewProjectBtn');
    if (addNewProjectBtn) {
        addNewProjectBtn.addEventListener('click', () => {
            if (!siteData.projects.items) siteData.projects.items = [];
            siteData.projects.items.unshift({
                id: `proj_${Date.now()}`,
                title: 'নতুন উন্নয়ন প্রকল্প',
                category: 'health',
                image: 'assets/project_hospital.png',
                description: 'প্রকল্পের লক্ষ্য ও সুবিধা...'
            });
            renderProjectsManager(siteData.projects.items);
        });
    }

    // Helper: Render Videos Manager
    function renderVideosManager(videos = []) {
        const container = document.getElementById('videosItemsContainer');
        if (!container) return;

        container.innerHTML = videos.map((v, idx) => `
            <div class="item-card video-item-box" data-index="${idx}">
                <div class="item-card-header">
                    <div class="item-card-title"><span class="item-badge">ভিডিও #${idx + 1}</span></div>
                    <button type="button" class="adm-btn adm-btn-danger adm-btn-sm delete-video-btn"><i class="fas fa-trash"></i> মুছুন</button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>ভিডিও শিরোনাম</label>
                        <input type="text" class="form-control vid-title" value="${v.title}">
                    </div>
                    <div class="form-group">
                        <label>ইউটিউব / ফেসবুক Embed URL</label>
                        <input type="text" class="form-control vid-url" value="${v.embedUrl}">
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label>সংক্ষিপ্ত বিবরণ</label>
                    <textarea class="form-control vid-desc" rows="2">${v.description}</textarea>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.delete-video-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.closest('.video-item-box').getAttribute('data-index'), 10);
                siteData.videos.items.splice(idx, 1);
                renderVideosManager(siteData.videos.items);
            });
        });
    }

    const addNewVideoBtn = document.getElementById('addNewVideoBtn');
    if (addNewVideoBtn) {
        addNewVideoBtn.addEventListener('click', () => {
            if (!siteData.videos.items) siteData.videos.items = [];
            siteData.videos.items.push({
                id: `vid_${Date.now()}`,
                title: 'নতুন ভিডিও সাক্ষাৎকার',
                embedUrl: 'https://www.youtube.com/embed/F8jVIZel5yk',
                description: 'ভিডিও সম্পর্কে বিস্তারিত আলোচনা।'
            });
            renderVideosManager(siteData.videos.items);
        });
    }

    // Helper: Render News Manager
    function renderNewsManager(news = []) {
        const container = document.getElementById('newsItemsContainer');
        if (!container) return;

        container.innerHTML = news.map((n, idx) => `
            <div class="item-card news-item-box" data-index="${idx}">
                <div class="item-card-header">
                    <div class="item-card-title"><span class="item-badge">সংবাদ #${idx + 1}</span></div>
                    <button type="button" class="adm-btn adm-btn-danger adm-btn-sm delete-news-btn"><i class="fas fa-trash"></i> মুছুন</button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>তারিখ</label>
                        <input type="text" class="form-control news-date-input" value="${n.date}">
                    </div>
                    <div class="form-group">
                        <label>শিরোনাম</label>
                        <input type="text" class="form-control news-title-input" value="${n.title}">
                    </div>
                    <div class="form-group">
                        <label>বিস্তারিত খবর লিংক (URL)</label>
                        <input type="text" class="form-control news-link-input" value="${n.link}">
                    </div>
                    <div class="form-group">
                        <label>সংক্ষিপ্ত বিবরণ</label>
                        <textarea class="form-control news-desc-input" rows="2">${n.description}</textarea>
                    </div>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.delete-news-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.closest('.news-item-box').getAttribute('data-index'), 10);
                siteData.news.items.splice(idx, 1);
                renderNewsManager(siteData.news.items);
            });
        });
    }

    const addNewNewsBtn = document.getElementById('addNewNewsBtn');
    if (addNewNewsBtn) {
        addNewNewsBtn.addEventListener('click', () => {
            if (!siteData.news.items) siteData.news.items = [];
            siteData.news.items.unshift({
                id: `news_${Date.now()}`,
                date: 'আজ',
                title: 'নতুন সংবাদ শিরোনাম',
                link: '#',
                description: 'সংবাদের মূল অংশ এখানে লিখুন...'
            });
            renderNewsManager(siteData.news.items);
        });
    }

    // Helper: Render FAQ Manager
    function renderFaqManager(faq = []) {
        const container = document.getElementById('faqItemsContainer');
        if (!container) return;

        container.innerHTML = faq.map((item, idx) => `
            <div class="item-card faq-item-box" data-index="${idx}">
                <div class="item-card-header">
                    <div class="item-card-title"><span class="item-badge">প্রশ্ন #${idx + 1}</span></div>
                    <button type="button" class="adm-btn adm-btn-danger adm-btn-sm delete-faq-btn"><i class="fas fa-trash"></i> মুছুন</button>
                </div>
                <div class="form-group">
                    <label>প্রশ্ন</label>
                    <input type="text" class="form-control faq-q" value="${item.question}">
                </div>
                <div class="form-group" style="margin-bottom: 0;">
                    <label>উত্তর</label>
                    <textarea class="form-control faq-a" rows="3">${item.answer}</textarea>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.delete-faq-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.closest('.faq-item-box').getAttribute('data-index'), 10);
                siteData.faq.items.splice(idx, 1);
                renderFaqManager(siteData.faq.items);
            });
        });
    }

    const addNewFaqBtn = document.getElementById('addNewFaqBtn');
    if (addNewFaqBtn) {
        addNewFaqBtn.addEventListener('click', () => {
            if (!siteData.faq.items) siteData.faq.items = [];
            siteData.faq.items.push({
                id: `faq_${Date.now()}`,
                question: 'নতুন সাধারণ প্রশ্ন?',
                answer: 'প্রশ্নের উপযুক্ত উত্তর এখানে লিখুন।'
            });
            renderFaqManager(siteData.faq.items);
        });
    }

    // Helper: Render Map Markers Manager
    function renderMapManager(markers = []) {
        const container = document.getElementById('mapMarkersContainer');
        if (!container) return;

        container.innerHTML = markers.map((m, idx) => `
            <div class="item-card map-item-box" data-index="${idx}">
                <div class="item-card-header">
                    <div class="item-card-title"><span class="item-badge">পিন #${idx + 1}</span></div>
                    <button type="button" class="adm-btn adm-btn-danger adm-btn-sm delete-marker-btn"><i class="fas fa-trash"></i> মুছুন</button>
                </div>
                <div class="form-grid">
                    <div class="form-group">
                        <label>স্থান বা প্রতিষ্ঠানের নাম</label>
                        <input type="text" class="form-control marker-name" value="${m.name}">
                    </div>
                    <div class="form-group">
                        <label>ধরন (যেমন: স্বাস্থ্য, যোগাযোগ)</label>
                        <input type="text" class="form-control marker-type" value="${m.type}">
                    </div>
                    <div class="form-group">
                        <label>অক্ষাংশ (Latitude) ও দ্রাঘিমাংশ (Longitude)</label>
                        <div style="display:flex;gap:8px;">
                            <input type="number" step="0.0001" class="form-control marker-lat" value="${m.coords ? m.coords[0] : 24.1}" placeholder="Lat">
                            <input type="number" step="0.0001" class="form-control marker-lng" value="${m.coords ? m.coords[1] : 90.4}" placeholder="Lng">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>পপআপ বিবরণ</label>
                        <input type="text" class="form-control marker-desc" value="${m.desc}">
                    </div>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.delete-marker-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.closest('.map-item-box').getAttribute('data-index'), 10);
                siteData.map.markers.splice(idx, 1);
                renderMapManager(siteData.map.markers);
            });
        });
    }

    const addNewMapMarkerBtn = document.getElementById('addNewMapMarkerBtn');
    if (addNewMapMarkerBtn) {
        addNewMapMarkerBtn.addEventListener('click', () => {
            if (!siteData.map.markers) siteData.map.markers = [];
            siteData.map.markers.push({
                id: `m_${Date.now()}`,
                name: 'নতুন সেবা কেন্দ্র',
                type: 'উন্নয়ন',
                coords: [24.15, 90.4],
                desc: 'সেবা কেন্দ্রের বিবরণ...'
            });
            renderMapManager(siteData.map.markers);
        });
    }

    // Master Populate Function
    async function loadAllData() {
        siteData = await window.siteDataService.getSiteData();
        if (!siteData) {
            try {
                const resp = await fetch('../data/default_data.json');
                if (resp.ok) siteData = await resp.json();
            } catch (e) {}
        }
        if (!siteData) {
            console.error("Could not load site data from any source");
            showToast("ডেটা লোড করতে সমস্যা হয়েছে! পেজ রিফ্রেশ করুন।", true);
            return;
        }

        // 1. Theme
        const theme = siteData.theme || {};
        if (theme.fontFamily && theme.googleFont) {
            const fontVal = `${theme.fontFamily}|${theme.googleFont}`;
            const fontSel = document.getElementById('fontSelect');
            if (fontSel) {
                // If not in standard options, add custom option
                let matched = false;
                for (let opt of fontSel.options) {
                    if (opt.value === fontVal) {
                        fontSel.value = fontVal;
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    const opt = document.createElement('option');
                    opt.value = fontVal;
                    opt.textContent = theme.fontFamily;
                    opt.selected = true;
                    fontSel.appendChild(opt);
                }
            }
        }

        const global = theme.global || {};
        const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
        setVal('themeBgColor', global.bgColor || '#0f172a');
        setVal('themeBgColorText', global.bgColor || '#0f172a');
        setVal('themePrimaryColor', global.primary || '#10b981');
        setVal('themePrimaryColorText', global.primary || '#10b981');
        setVal('themePrimaryHover', global.primaryHover || '#059669');
        setVal('themePrimaryHoverText', global.primaryHover || '#059669');
        setVal('themeTextMain', global.textMain || '#f8fafc');
        setVal('themeTextMainText', global.textMain || '#f8fafc');
        setVal('themeTextMuted', global.textMuted || '#cbd5e1');
        setVal('themeTextMutedText', global.textMuted || '#cbd5e1');

        // 2. Per-Section Colors
        renderSectionColorsManager(theme.sectionStyles);

        // 3. Header & Logo
        const header = siteData.header || {};
        setVal('headerSiteTitle', header.siteTitle || '');
        setVal('headerLogoImage', header.logoImage || '');
        const logoPreview = document.getElementById('logoPreviewImg');
        if (logoPreview && header.logoImage) {
            logoPreview.src = header.logoImage.startsWith('http') || header.logoImage.startsWith('data:') ? header.logoImage : `../${header.logoImage}`;
        }
        renderNavLinksManager(header.navLinks);

        // Logo Upload Event
        const logoUpload = document.getElementById('logoUploadFile');
        if (logoUpload) {
            logoUpload.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const url = await window.siteDataService.uploadImage(file, 'logo');
                    setVal('headerLogoImage', url);
                    if (logoPreview) logoPreview.src = url;
                    showToast("লোগো সফলভাবে আপলোড হয়েছে!");
                }
            });
        }

        // 4. Hero Slider
        const hero = siteData.hero || {};
        setVal('sliderAutoplay', hero.autoplay !== false ? 'true' : 'false');
        setVal('sliderDelay', hero.autoplayDelay || 6000);
        renderSliderManager(hero.slides);

        // 5. Election Results
        const elec = siteData.electionResults || {};
        setVal('electionTitle', elec.title || '');
        setVal('electionSubtitle', elec.subtitle || '');
        if (elec.voteComparison) {
            setVal('electionWinnerName', elec.voteComparison.winnerName || '');
            setVal('electionWinnerPercent', elec.voteComparison.winnerPercent || 61.9);
            setVal('electionRivalName', elec.voteComparison.rivalName || '');
            setVal('electionRivalPercent', elec.voteComparison.rivalPercent || 38.1);
        }
        renderElectionStats(elec.stats);

        // 6. About
        const about = siteData.about || {};
        setVal('aboutTitle', about.title || '');
        if (about.paragraphs) {
            setVal('aboutParagraph1', about.paragraphs[0] || '');
            setVal('aboutParagraph2', about.paragraphs[1] || '');
        }

        // 7. Career
        const career = siteData.career || {};
        setVal('careerTitle', career.title || '');
        renderTimelineManager(career.timeline);

        // 8. Projects
        const proj = siteData.projects || {};
        setVal('projectsTitle', proj.title || '');
        setVal('projectsSubtitle', proj.subtitle || '');
        renderProjectsManager(proj.items);

        // 9. Videos
        const vids = siteData.videos || {};
        setVal('videosTitle', vids.title || '');
        setVal('videosSubtitle', vids.subtitle || '');
        setVal('videosMoreBtnUrl', vids.moreVideosBtn ? vids.moreVideosBtn.url : '');
        renderVideosManager(vids.items);

        // 10. News
        const news = siteData.news || {};
        setVal('newsTitle', news.title || '');
        setVal('newsSubtitle', news.subtitle || '');
        renderNewsManager(news.items);

        // 11. FAQ
        const faq = siteData.faq || {};
        setVal('faqTitle', faq.title || '');
        setVal('faqSubtitle', faq.subtitle || '');
        renderFaqManager(faq.items);

        // 12. Map
        const map = siteData.map || {};
        setVal('mapTitle', map.title || '');
        setVal('mapSubtitle', map.subtitle || '');
        renderMapManager(map.markers);

        // 13. Contact & Social Media
        const contact = siteData.contact || {};
        setVal('contactBadge', contact.badge || '');
        setVal('contactTitle', contact.title || '');
        setVal('contactSubtitle', contact.subtitle || '');
        setVal('contactAddress', contact.officeAddress || '');
        setVal('contactPhone', contact.phone || '');
        setVal('contactEmail', contact.email || '');
        setVal('contactWhatsapp', contact.whatsapp || '');
        setVal('contactHours', contact.officeHours || '');

        const social = siteData.social || {};
        setVal('socialFacebook', social.facebook || '');
        setVal('socialYoutube', social.youtube || '');
        setVal('socialTwitter', social.twitter || '');
        setVal('socialWhatsapp', social.whatsapp || '');
        setVal('socialInstagram', social.instagram || '');
        setVal('socialTelegram', social.telegram || '');

        // 14. Footer
        const footer = siteData.footer || {};
        setVal('footerCopyright', footer.copyright || '');
    }

    // Save All Data Handler
    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', async () => {
            saveAllBtn.disabled = true;
            const originalText = saveAllBtn.innerHTML;
            saveAllBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> সংরক্ষণ হচ্ছে...';

            try {
                if (!siteData) {
                    siteData = await window.siteDataService.getSiteData();
                }
                if (!siteData) {
                    try {
                        const resp = await fetch('../data/default_data.json');
                        if (resp.ok) siteData = await resp.json();
                    } catch (e) {}
                }
                siteData = siteData || {};

                // Harvest Theme
                const fontVal = document.getElementById('fontSelect').value.split('|');
                siteData.theme = siteData.theme || {};
                siteData.theme.fontFamily = fontVal[0];
                siteData.theme.googleFont = fontVal[1];

                siteData.theme.global = {
                    bgColor: document.getElementById('themeBgColorText').value,
                    primary: document.getElementById('themePrimaryColorText').value,
                    primaryHover: document.getElementById('themePrimaryHoverText').value,
                    textMain: document.getElementById('themeTextMainText').value,
                    textMuted: document.getElementById('themeTextMutedText').value
                };

                // Harvest Per-Section Colors
                siteData.theme.sectionStyles = siteData.theme.sectionStyles || {};
                document.querySelectorAll('#sectionColorsContainer .item-card').forEach(card => {
                    const secKey = card.getAttribute('data-section-key');
                    siteData.theme.sectionStyles[secKey] = {
                        bg: card.querySelector('.sec-bg-text').value.trim(),
                        textColor: card.querySelector('.sec-text-text').value.trim(),
                        accentColor: card.querySelector('.sec-accent-text').value.trim()
                    };
                });

                // Harvest Header
                siteData.header = siteData.header || {};
                siteData.header.siteTitle = document.getElementById('headerSiteTitle').value.trim();
                siteData.header.logoImage = document.getElementById('headerLogoImage').value.trim();

                const navItems = [];
                document.querySelectorAll('#navLinksContainer .nav-link-item').forEach((item, idx) => {
                    navItems.push({
                        id: `nav_${idx + 1}`,
                        label: item.querySelector('.nav-label').value.trim(),
                        href: item.querySelector('.nav-href').value.trim(),
                        visible: item.querySelector('.nav-visible').value === 'true'
                    });
                });
                siteData.header.navLinks = navItems;

                // Harvest Hero Slider
                siteData.hero = siteData.hero || {};
                siteData.hero.autoplay = document.getElementById('sliderAutoplay').value === 'true';
                siteData.hero.autoplayDelay = parseInt(document.getElementById('sliderDelay').value, 10) || 6000;

                const slides = [];
                document.querySelectorAll('#sliderItemsContainer .slide-item').forEach((item, idx) => {
                    const rawBadges = item.querySelector('.slide-badges').value.split(',').map(s => s.trim()).filter(Boolean);
                    slides.push({
                        id: `slide_${idx + 1}`,
                        image: item.querySelector('.slide-image-url').value.trim(),
                        title: item.querySelector('.slide-title').value.trim(),
                        subtitle: item.querySelector('.slide-subtitle').value.trim(),
                        badges: rawBadges.map(b => ({ text: b, style: 'default' })),
                        primaryBtn: {
                            text: item.querySelector('.slide-btn1-text').value.trim(),
                            url: item.querySelector('.slide-btn1-url').value.trim(),
                            visible: true
                        },
                        secondaryBtn: {
                            text: item.querySelector('.slide-btn2-text').value.trim(),
                            url: item.querySelector('.slide-btn2-url').value.trim(),
                            visible: true
                        }
                    });
                });
                siteData.hero.slides = slides;

                // Harvest Election Results
                siteData.electionResults = siteData.electionResults || {};
                siteData.electionResults.title = document.getElementById('electionTitle').value.trim();
                siteData.electionResults.subtitle = document.getElementById('electionSubtitle').value.trim();
                siteData.electionResults.voteComparison = {
                    title: 'ভোটের ব্যবধান (তুলনামূলক চিত্র)',
                    winnerName: document.getElementById('electionWinnerName').value.trim(),
                    winnerPercent: parseFloat(document.getElementById('electionWinnerPercent').value) || 61.9,
                    rivalName: document.getElementById('electionRivalName').value.trim(),
                    rivalPercent: parseFloat(document.getElementById('electionRivalPercent').value) || 38.1
                };

                const stats = [];
                document.querySelectorAll('#electionStatsContainer .stat-item').forEach((item, idx) => {
                    stats.push({
                        id: `stat_${idx + 1}`,
                        icon: item.querySelector('.stat-icon').value.trim(),
                        value: item.querySelector('.stat-val').value.trim(),
                        label: item.querySelector('.stat-lbl').value.trim()
                    });
                });
                siteData.electionResults.stats = stats;

                // Harvest About
                siteData.about = siteData.about || {};
                siteData.about.title = document.getElementById('aboutTitle').value.trim();
                siteData.about.paragraphs = [
                    document.getElementById('aboutParagraph1').value.trim(),
                    document.getElementById('aboutParagraph2').value.trim()
                ].filter(Boolean);

                // Harvest Career
                siteData.career = siteData.career || {};
                siteData.career.title = document.getElementById('careerTitle').value.trim();
                const timeline = [];
                document.querySelectorAll('#timelineItemsContainer .timeline-item-box').forEach((box, idx) => {
                    timeline.push({
                        id: `tl_${idx + 1}`,
                        title: box.querySelector('.tl-title').value.trim(),
                        date: box.querySelector('.tl-date').value.trim(),
                        description: box.querySelector('.tl-desc').value.trim()
                    });
                });
                siteData.career.timeline = timeline;

                // Harvest Projects
                siteData.projects = siteData.projects || {};
                siteData.projects.title = document.getElementById('projectsTitle').value.trim();
                siteData.projects.subtitle = document.getElementById('projectsSubtitle').value.trim();
                const projItems = [];
                document.querySelectorAll('#projectsItemsContainer .project-item-box').forEach((box, idx) => {
                    projItems.push({
                        id: `proj_${idx + 1}`,
                        title: box.querySelector('.proj-title').value.trim(),
                        category: box.querySelector('.proj-cat').value.trim(),
                        image: box.querySelector('.proj-img-url').value.trim(),
                        description: box.querySelector('.proj-desc').value.trim()
                    });
                });
                siteData.projects.items = projItems;

                // Harvest Videos
                siteData.videos = siteData.videos || {};
                siteData.videos.title = document.getElementById('videosTitle').value.trim();
                siteData.videos.subtitle = document.getElementById('videosSubtitle').value.trim();
                siteData.videos.moreVideosBtn = {
                    text: 'আরও ভিডিও দেখুন',
                    url: document.getElementById('videosMoreBtnUrl').value.trim()
                };
                const vids = [];
                document.querySelectorAll('#videosItemsContainer .video-item-box').forEach((box, idx) => {
                    vids.push({
                        id: `vid_${idx + 1}`,
                        title: box.querySelector('.vid-title').value.trim(),
                        embedUrl: box.querySelector('.vid-url').value.trim(),
                        description: box.querySelector('.vid-desc').value.trim()
                    });
                });
                siteData.videos.items = vids;

                // Harvest News
                siteData.news = siteData.news || {};
                siteData.news.title = document.getElementById('newsTitle').value.trim();
                siteData.news.subtitle = document.getElementById('newsSubtitle').value.trim();
                const newsList = [];
                document.querySelectorAll('#newsItemsContainer .news-item-box').forEach((box, idx) => {
                    newsList.push({
                        id: `news_${idx + 1}`,
                        date: box.querySelector('.news-date-input').value.trim(),
                        title: box.querySelector('.news-title-input').value.trim(),
                        link: box.querySelector('.news-link-input').value.trim(),
                        description: box.querySelector('.news-desc-input').value.trim()
                    });
                });
                siteData.news.items = newsList;

                // Harvest FAQ
                siteData.faq = siteData.faq || {};
                siteData.faq.title = document.getElementById('faqTitle').value.trim();
                siteData.faq.subtitle = document.getElementById('faqSubtitle').value.trim();
                const faqList = [];
                document.querySelectorAll('#faqItemsContainer .faq-item-box').forEach((box, idx) => {
                    faqList.push({
                        id: `faq_${idx + 1}`,
                        question: box.querySelector('.faq-q').value.trim(),
                        answer: box.querySelector('.faq-a').value.trim()
                    });
                });
                siteData.faq.items = faqList;

                // Harvest Map
                siteData.map = siteData.map || {};
                siteData.map.title = document.getElementById('mapTitle').value.trim();
                siteData.map.subtitle = document.getElementById('mapSubtitle').value.trim();
                const markers = [];
                document.querySelectorAll('#mapMarkersContainer .map-item-box').forEach((box, idx) => {
                    markers.push({
                        id: `m_${idx + 1}`,
                        name: box.querySelector('.marker-name').value.trim(),
                        type: box.querySelector('.marker-type').value.trim(),
                        coords: [
                            parseFloat(box.querySelector('.marker-lat').value) || 24.1,
                            parseFloat(box.querySelector('.marker-lng').value) || 90.4
                        ],
                        desc: box.querySelector('.marker-desc').value.trim()
                    });
                });
                siteData.map.markers = markers;

                // Harvest Contact & Office Info
                siteData.contact = siteData.contact || {};
                siteData.contact.badge = document.getElementById('contactBadge').value.trim();
                siteData.contact.title = document.getElementById('contactTitle').value.trim();
                siteData.contact.subtitle = document.getElementById('contactSubtitle').value.trim();
                siteData.contact.officeAddress = document.getElementById('contactAddress').value.trim();
                siteData.contact.phone = document.getElementById('contactPhone').value.trim();
                siteData.contact.email = document.getElementById('contactEmail').value.trim();
                siteData.contact.whatsapp = document.getElementById('contactWhatsapp').value.trim();
                siteData.contact.officeHours = document.getElementById('contactHours').value.trim();

                // Harvest Social Media
                siteData.social = siteData.social || {};
                siteData.social.facebook = document.getElementById('socialFacebook').value.trim();
                siteData.social.youtube = document.getElementById('socialYoutube').value.trim();
                siteData.social.twitter = document.getElementById('socialTwitter').value.trim();
                siteData.social.whatsapp = document.getElementById('socialWhatsapp').value.trim();
                siteData.social.instagram = document.getElementById('socialInstagram').value.trim();
                siteData.social.telegram = document.getElementById('socialTelegram').value.trim();

                // Keep Footer Social Links in sync
                siteData.footer = siteData.footer || {};
                siteData.footer.copyright = document.getElementById('footerCopyright').value.trim();
                siteData.footer.socialLinks = [];
                if (siteData.social.facebook) siteData.footer.socialLinks.push({ platform: 'facebook', icon: 'fab fa-facebook-f', url: siteData.social.facebook, label: 'Facebook' });
                if (siteData.social.youtube) siteData.footer.socialLinks.push({ platform: 'youtube', icon: 'fab fa-youtube', url: siteData.social.youtube, label: 'YouTube' });
                if (siteData.social.twitter) siteData.footer.socialLinks.push({ platform: 'twitter', icon: 'fab fa-twitter', url: siteData.social.twitter, label: 'Twitter' });
                if (siteData.social.whatsapp) siteData.footer.socialLinks.push({ platform: 'whatsapp', icon: 'fab fa-whatsapp', url: siteData.social.whatsapp, label: 'WhatsApp' });
                if (siteData.social.instagram) siteData.footer.socialLinks.push({ platform: 'instagram', icon: 'fab fa-instagram', url: siteData.social.instagram, label: 'Instagram' });
                if (siteData.social.telegram) siteData.footer.socialLinks.push({ platform: 'telegram', icon: 'fab fa-telegram-plane', url: siteData.social.telegram, label: 'Telegram' });

                // Save to Firestore & Local Storage
                const result = await window.siteDataService.saveSiteData(siteData);
                if (result.destination === 'cloud') {
                    showToast("সফলভাবে ক্লাউডে (Firebase) সংরক্ষিত ও লাইভ হয়েছে!");
                } else if (result.warning) {
                    showToast("লোকাল মেমরিতে সেভ হয়েছে! (Firebase রুলস বা ডেটাবেস চেক করুন)", true);
                } else {
                    showToast("সফলভাবে সংরক্ষিত হয়েছে (লোকাল মেমরি)");
                }
            } catch (err) {
                console.error("Save failed:", err);
                alert("সংরক্ষণ ব্যর্থ: " + err.message);
            } finally {
                saveAllBtn.disabled = false;
                saveAllBtn.innerHTML = originalText;
            }
        });
    }

    // Export & Import Backup handlers
    const exportBackupBtn = document.getElementById('exportBackupBtn');
    if (exportBackupBtn) {
        exportBackupBtn.addEventListener('click', () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteData, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", `dr_rafiqul_islam_backup_${Date.now()}.json`);
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast("ব্যাকআপ ফাইল ডাউনলোড হয়েছে!");
        });
    }

    const importBackupFile = document.getElementById('importBackupFile');
    if (importBackupFile) {
        importBackupFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    try {
                        const importedData = JSON.parse(event.target.result);
                        siteData = importedData;
                        await window.siteDataService.saveSiteData(siteData);
                        loadAllData();
                        showToast("ব্যাকআপ থেকে সফলভাবে রিস্টোর করা হয়েছে!");
                    } catch (err) {
                        alert("ভুল JSON ফাইল: " + err.message);
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    const resetDefaultBtn = document.getElementById('resetDefaultBtn');
    if (resetDefaultBtn) {
        resetDefaultBtn.addEventListener('click', async () => {
            if (confirm("আপনি কি নিশ্চিত সমস্ত সেটিংস ডিফল্ট অবস্থায় ফিরিয়ে নিতে চান?")) {
                try {
                    const resp = await fetch('../data/default_data.json');
                    const defaultData = await resp.json();
                    siteData = defaultData;
                    await window.siteDataService.saveSiteData(siteData);
                    loadAllData();
                    showToast("ডিফল্ট ডেটায় রিসেট সফল হয়েছে!");
                } catch (err) {
                    alert("রিসেট ব্যর্থ: " + err.message);
                }
            }
        });
    }

    // Helper: Render Citizen Messages Inbox
    async function renderInboxMessages() {
        const container = document.getElementById('inboxMessagesContainer');
        if (!container) return;

        const messages = await window.siteDataService.getCitizenMessages();
        if (!messages || messages.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: var(--adm-text-muted); padding: 3rem 1rem;">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.4;"></i>
                    <p style="font-size: 1.1rem;">এখনও কোনো নতুন বার্তা আসেনি।</p>
                </div>
            `;
            return;
        }

        container.innerHTML = messages.map(msg => {
            const dateStr = msg.createdAt ? new Date(msg.createdAt).toLocaleString('bn-BD', {
                dateStyle: 'medium',
                timeStyle: 'short'
            }) : 'সম্প্রতি';

            return `
                <div class="item-card message-box" data-id="${msg.id}" style="border-left: 3px solid var(--adm-primary);">
                    <div class="item-card-header" style="margin-bottom: 0.5rem;">
                        <div>
                            <strong style="font-size: 1.05rem; color: #fff;">${msg.name}</strong>
                            <span class="item-badge" style="margin-left: 8px;">${msg.category}</span>
                            <span style="font-size: 0.8rem; color: var(--adm-text-muted); margin-left: 10px;">${dateStr}</span>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <a href="tel:${msg.phone}" class="adm-btn adm-btn-outline adm-btn-sm" style="color: #93c5fd;">
                                <i class="fas fa-phone-alt"></i> ${msg.phone}
                            </a>
                            <button type="button" class="adm-btn adm-btn-danger adm-btn-sm delete-msg-btn">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p style="color: var(--adm-text); font-size: 0.95rem; line-height: 1.6; margin-top: 8px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
                        ${(msg.message || '').replace(/</g, '&lt;')}
                    </p>
                </div>
            `;
        }).join('');

        container.querySelectorAll('.delete-msg-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const box = e.target.closest('.message-box');
                const msgId = box.getAttribute('data-id');
                if (confirm("এই বার্তাটি মুছে ফেলতে চান?")) {
                    await window.siteDataService.deleteCitizenMessage(msgId);
                    renderInboxMessages();
                    showToast("বার্তা মুছে ফেলা হয়েছে");
                }
            });
        });
    }

    const refreshInboxBtn = document.getElementById('refreshInboxBtn');
    if (refreshInboxBtn) {
        refreshInboxBtn.addEventListener('click', () => {
            renderInboxMessages();
            showToast("ইনবক্স আপডেট করা হয়েছে");
        });
    }

    // Start
    checkAuth();
});

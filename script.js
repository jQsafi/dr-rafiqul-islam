document.addEventListener('DOMContentLoaded', () => {
    // Scroll Progress Bar & Back to Top Logic
    const progressBar = document.getElementById('progressBar');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        // Calculate scroll progress percentage
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }

        // Show or hide back to top button
        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    // Scroll reveals for timeline items and sections (Standard IntersectionObserver)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observe timeline items and custom hero animations
    document.querySelectorAll('.timeline-item, .animate-hero-text, .animate-hero-img').forEach(item => {
        observer.observe(item);
    });

    // Handle generic elements like sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        sectionObserver.observe(item);
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Project Map Initialization
    if (document.getElementById('map')) {
        // Center of Gazipur (approximate coordinates for Sriupur/Kaliakair)
        const gazipurCoord = [24.1, 90.4];
        const map = L.map('map', {
            scrollWheelZoom: false
        }).setView(gazipurCoord, 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Project Locations (Mock coordinates for demo)
        const projects = [
            {
                name: "আধুনিক হাসপাতাল",
                type: "স্বাস্থ্য",
                coords: [24.15, 90.45],
                desc: "তৃণমূল পর্যায়ে উন্নত স্বাস্থ্যসেবা।"
            },
            {
                name: "যোগাযোগ উন্নয়ন (রাস্তা)",
                type: "যোগাযোগ",
                coords: [24.05, 90.35],
                desc: "নতুন প্রশস্ত রাস্তা ও কালভার্ট।"
            },
            {
                name: "শিক্ষা প্রতিষ্ঠান সংস্কার",
                type: "শিক্ষা",
                coords: [24.18, 90.38],
                desc: "সরকারি প্রাথমিক বিদ্যালয়ের নতুন ভবন।"
            },
            {
                name: "কৃষি ও আধুনিক সেচ",
                type: "কৃষি",
                coords: [24.12, 90.41],
                desc: "কৃষকদের জন্য আধুনিক সেচ ব্যবস্থা।"
            },
            {
                name: "তরুণদের কর্মসংস্থান",
                type: "কর্মসংস্থান",
                coords: [24.08, 90.48],
                desc: "নতুন কারিগরি ট্রেনিং সেন্টার।"
            },
            {
                name: "পল্লী উন্নয়ন",
                type: "অবকাঠামো",
                coords: [24.20, 90.35],
                desc: "গ্রামাঞ্চলে শতভাগ বিদ্যুতায়ন।"
            }
        ];

        // Custom Red Marker
        const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: #ff6b6b; width: 15px; height: 15px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(255,107,107,0.5);"></div>`,
            iconSize: [15, 15],
            iconAnchor: [7, 7]
        });

        projects.forEach(p => {
            L.marker(p.coords, { icon: customIcon })
                .addTo(map)
                .bindPopup(`
                    <div style="font-family: inherit; padding: 5px;">
                        <strong style="color: #ff6b6b;">${p.name}</strong><br>
                        <span style="font-size: 0.85rem; opacity: 0.8;">${p.desc}</span>
                    </div>
                `);
        });
    }

    // Form submission animation for Portal
    const form = document.querySelector('.portal-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.textContent;

            // Premium sending animation
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> পাঠানো হচ্ছে...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check-circle"></i> সফলভাবে জমা দেওয়া হয়েছে!';
                btn.style.backgroundColor = '#059669'; // Emerald 600
                btn.style.opacity = '1';
                form.reset();

                // Show a toast or subtle notification if needed, but button change is good for now
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }, 4000);
            }, 2000);
        });
    }
});

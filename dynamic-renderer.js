/**
 * Dynamic Website Renderer for Dr. Rafiqul Islam MP Website
 * Re-hydrates and updates all sections, slider, fonts, and colors dynamically from Firestore/JSON.
 */

(function () {
    let currentSlideIndex = 0;
    let sliderTimer = null;
    let leafletMapInstance = null;
    let currentData = null;

    // Helper: Apply Dynamic Theme (Fonts, Global Colors, Per-Section Colors)
    function applyTheme(theme) {
        if (!theme) return;

        // 1. Google Font loader
        if (theme.fontFamily && theme.googleFont) {
            let fontLink = document.getElementById('dynamic-google-font');
            if (!fontLink) {
                fontLink = document.createElement('link');
                fontLink.id = 'dynamic-google-font';
                fontLink.rel = 'stylesheet';
                document.head.appendChild(fontLink);
            }
            fontLink.href = `https://fonts.googleapis.com/css2?family=${theme.googleFont}&display=swap`;
            document.documentElement.style.fontFamily = theme.fontFamily;
        }

        // 2. Injected CSS Variables
        let styleTag = document.getElementById('dynamic-theme-styles');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'dynamic-theme-styles';
            document.head.appendChild(styleTag);
        }

        const global = theme.global || {};
        const sec = theme.sectionStyles || {};

        let css = `
            :root {
                ${global.bgColor ? `--bg-color: ${global.bgColor} !important;` : ''}
                ${global.textMain ? `--text-main: ${global.textMain} !important;` : ''}
                ${global.textMuted ? `--text-muted: ${global.textMuted} !important;` : ''}
                ${global.primary ? `--primary: ${global.primary} !important;` : ''}
                ${global.primaryHover ? `--primary-hover: ${global.primaryHover} !important;` : ''}
                ${global.glassBg ? `--glass-bg: ${global.glassBg} !important;` : ''}
                ${global.glassBorder ? `--glass-border: ${global.glassBorder} !important;` : ''}
            }
        `;

        // Per-section custom colors
        if (sec.hero) {
            css += `
                #hero {
                    --sec-hero-bg: ${sec.hero.bg || 'transparent'};
                    --sec-hero-text: ${sec.hero.textColor || 'inherit'};
                }
            `;
        }
        if (sec.electionResults) {
            css += `
                #election-results {
                    --sec-electionResults-bg: ${sec.electionResults.bg || 'transparent'};
                    --sec-electionResults-text: ${sec.electionResults.textColor || 'inherit'};
                }
            `;
        }
        if (sec.about) {
            css += `
                #about {
                    --sec-about-bg: ${sec.about.bg || 'transparent'};
                    --sec-about-text: ${sec.about.textColor || 'inherit'};
                }
            `;
        }
        if (sec.career) {
            css += `
                #career {
                    --sec-career-bg: ${sec.career.bg || 'transparent'};
                    --sec-career-text: ${sec.career.textColor || 'inherit'};
                }
            `;
        }
        if (sec.projects) {
            css += `
                #projects {
                    --sec-projects-bg: ${sec.projects.bg || 'transparent'};
                    --sec-projects-text: ${sec.projects.textColor || 'inherit'};
                }
            `;
        }
        if (sec.videos) {
            css += `
                #videos {
                    --sec-videos-bg: ${sec.videos.bg || 'transparent'};
                    --sec-videos-text: ${sec.videos.textColor || 'inherit'};
                }
            `;
        }
        if (sec.news) {
            css += `
                #news {
                    --sec-news-bg: ${sec.news.bg || 'transparent'};
                    --sec-news-text: ${sec.news.textColor || 'inherit'};
                }
            `;
        }
        if (sec.faq) {
            css += `
                #faq {
                    --sec-faq-bg: ${sec.faq.bg || 'transparent'};
                    --sec-faq-text: ${sec.faq.textColor || 'inherit'};
                }
            `;
        }
        if (sec.map) {
            css += `
                #map-section {
                    --sec-map-bg: ${sec.map.bg || 'transparent'};
                    --sec-map-text: ${sec.map.textColor || 'inherit'};
                }
            `;
        }
        if (sec.contact) {
            css += `
                #contact {
                    --sec-contact-bg: ${sec.contact.bg || 'transparent'};
                    --sec-contact-text: ${sec.contact.textColor || 'inherit'};
                }
            `;
        }
        if (sec.footer) {
            css += `
                footer {
                    --sec-footer-bg: ${sec.footer.bg || 'rgba(15, 23, 42, 0.9)'};
                    --sec-footer-text: ${sec.footer.textColor || 'inherit'};
                }
            `;
        }

        styleTag.innerHTML = css;
    }

    // Helper: Render Header (Logo and Nav links)
    function renderHeader(header) {
        if (!header) return;

        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            if (header.logoImage) {
                navLogo.innerHTML = `<img src="${header.logoImage}" alt="${header.siteTitle || 'Logo'}">`;
            } else if (header.logoText) {
                navLogo.innerHTML = `<span style="font-weight:700;font-size:1.2rem;color:var(--text-main);">${header.logoText}</span>`;
            }
        }

        const navLinks = document.querySelector('.nav-links');
        if (navLinks && header.navLinks && header.navLinks.length) {
            navLinks.innerHTML = header.navLinks
                .filter(item => item.visible !== false)
                .map(item => `<li><a href="${item.href}">${item.label}</a></li>`)
                .join('');
        }
    }

    // Helper: Render Hero Slider
    function renderHero(hero) {
        const heroSection = document.getElementById('hero');
        if (!heroSection || !hero || !hero.slides || !hero.slides.length) return;

        clearInterval(sliderTimer);

        // Build Slider Container HTML
        let slidesHtml = '';
        hero.slides.forEach((slide, idx) => {
            const isActive = idx === 0 ? 'active' : '';
            const bgImage = slide.image ? `style="background-image: linear-gradient(to bottom, rgba(15, 23, 42, 0.25) 20%, rgba(15, 23, 42, 0.85) 100%), url('${slide.image}');"` : '';

            // Badges
            let badgesHtml = '';
            if (slide.badges && slide.badges.length) {
                badgesHtml = slide.badges.map(b => {
                    let badgeStyle = '';
                    if (b.style === 'blue') badgeStyle = 'background: rgba(59, 130, 246, 0.2); border-color: rgba(59, 130, 246, 0.3); color: #93c5fd;';
                    else if (b.style === 'yellow') badgeStyle = 'background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.3); color: #fcd34d;';
                    return `<span class="badge" style="margin-bottom: 0; ${badgeStyle}">${b.text || b}</span>`;
                }).join(' ');
            }

            // Social links
            let socialHtml = '';
            if (slide.socialLinks && slide.socialLinks.length) {
                socialHtml = slide.socialLinks.map(s => `
                    <a href="${s.url}" target="_blank" class="social-icon" title="${s.label || s.platform}">
                        <i class="${s.icon}"></i>
                    </a>
                `).join('');
            }

            // Buttons
            let buttonsHtml = '';
            if (slide.primaryBtn && slide.primaryBtn.visible !== false) {
                buttonsHtml += `<a href="${slide.primaryBtn.url}" class="btn btn-primary" style="margin-top: 0.5rem; margin-right: 0.5rem;">${slide.primaryBtn.text}</a>`;
            }
            if (slide.secondaryBtn && slide.secondaryBtn.visible !== false) {
                buttonsHtml += `<a href="${slide.secondaryBtn.url}" class="btn btn-outline" style="margin-top: 0.5rem; border: 1px solid var(--primary); color: #fff;">${slide.secondaryBtn.text}</a>`;
            }

            slidesHtml += `
                <div class="hero-slide ${isActive}" ${bgImage} data-slide-index="${idx}">
                    <div class="hero-content">
                        <div class="hero-image-container glass-effect animate-hero-img">
                            <img src="${slide.image || 'assets/politician_portrait.jpg'}" alt="Slide Portrait" class="hero-img">
                        </div>
                        <div class="hero-text animate-hero-text" style="display: flex; flex-direction: column; align-items: flex-end; text-align: right;">
                            <div style="display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.6rem; margin-bottom: 1.5rem;">
                                ${badgesHtml}
                            </div>
                            <h1 class="title">${slide.title}</h1>
                            <p class="subtitle" style="margin-left: auto; margin-right: 0;">${slide.subtitle}</p>
                            <div class="social-links" style="justify-content: flex-end; width: 100%;">
                                ${socialHtml}
                            </div>
                            <div style="display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.5rem; width: 100%;">
                                ${buttonsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        // Add Controls if more than 1 slide
        let controlsHtml = '';
        if (hero.slides.length > 1) {
            let dotsHtml = hero.slides.map((_, i) => `<span class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('');
            controlsHtml = `
                <button class="slider-control-btn slider-prev" aria-label="Previous Slide"><i class="fas fa-chevron-left"></i></button>
                <button class="slider-control-btn slider-next" aria-label="Next Slide"><i class="fas fa-chevron-right"></i></button>
                <div class="slider-indicators">${dotsHtml}</div>
            `;
        }

        heroSection.innerHTML = `
            <div class="hero-slider-container">
                ${slidesHtml}
                ${controlsHtml}
            </div>
        `;

        // Initialize slider actions
        currentSlideIndex = 0;
        const slides = heroSection.querySelectorAll('.hero-slide');
        const dots = heroSection.querySelectorAll('.slider-dot');

        function goToSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentSlideIndex = index;

            slides.forEach((s, i) => s.classList.toggle('active', i === currentSlideIndex));
            dots.forEach((d, i) => d.classList.toggle('active', i === currentSlideIndex));
        }

        const prevBtn = heroSection.querySelector('.slider-prev');
        const nextBtn = heroSection.querySelector('.slider-next');

        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));
        dots.forEach(d => {
            d.addEventListener('click', (e) => {
                const targetIdx = parseInt(e.target.getAttribute('data-index'), 10);
                goToSlide(targetIdx);
            });
        });

        // Autoplay
        if (hero.autoplay !== false && hero.slides.length > 1) {
            const delay = hero.autoplayDelay || 6000;
            sliderTimer = setInterval(() => {
                goToSlide(currentSlideIndex + 1);
            }, delay);

            const container = heroSection.querySelector('.hero-slider-container');
            if (container) {
                container.addEventListener('mouseenter', () => clearInterval(sliderTimer));
                container.addEventListener('mouseleave', () => {
                    clearInterval(sliderTimer);
                    sliderTimer = setInterval(() => goToSlide(currentSlideIndex + 1), delay);
                });
            }
        }
    }

    // Helper: Render Election Results
    function renderElectionResults(data) {
        const section = document.getElementById('election-results');
        if (!section || !data) return;

        let compHtml = '';
        if (data.voteComparison) {
            const vc = data.voteComparison;
            compHtml = `
                <div class="stat-card glass-effect hover-float full-width-card">
                    <div class="stat-label" style="margin-bottom: 1.5rem;">${vc.title || 'ভোটের ব্যবধান'}</div>
                    <div class="comparison-bar-container">
                        <div class="comparison-segment bachchu" style="width: ${vc.winnerPercent}%;">
                            <span class="segment-label">${vc.winnerName} (${vc.winnerPercent}%)</span>
                        </div>
                        <div class="comparison-segment rival" style="width: ${vc.rivalPercent}%;">
                            <span class="segment-label">${vc.rivalName} (${vc.rivalPercent}%)</span>
                        </div>
                    </div>
                </div>
            `;
        }

        let statsCardsHtml = '';
        if (data.stats && data.stats.length) {
            statsCardsHtml = data.stats.map(s => {
                if (s.type === 'radial') {
                    return `
                        <div class="stat-card glass-effect hover-float radial-stat">
                            <div class="radial-progress" style="--percent: ${s.percent};">
                                <svg viewBox="0 0 140 140">
                                    <circle cx="70" cy="70" r="60"></circle>
                                    <circle cx="70" cy="70" r="60"></circle>
                                </svg>
                                <div class="radial-text">${s.value}</div>
                            </div>
                            <div class="stat-label">${s.label}</div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="stat-card glass-effect hover-float">
                            <div class="stat-icon"><i class="${s.icon}"></i></div>
                            <div class="stat-value">${s.value}</div>
                            <div class="stat-label">${s.label}</div>
                        </div>
                    `;
                }
            }).join('');
        }

        section.innerHTML = `
            <div class="section-header">
                <h2>${data.title}</h2>
                <p>${data.subtitle}</p>
                <div class="divider"></div>
            </div>
            <div class="stats-grid">
                ${compHtml}
                ${statsCardsHtml}
            </div>
        `;
    }

    // Helper: Render About Section
    function renderAbout(data) {
        const section = document.getElementById('about');
        if (!section || !data) return;

        let paragraphsHtml = (data.paragraphs || []).map(p => `
            <p style="margin-bottom: 1rem; max-width: 800px; margin-left: auto; margin-right: auto;">${p}</p>
        `).join('');

        let cardsHtml = (data.cards || []).map(c => `
            <div class="about-card glass-effect hover-float">
                <div class="icon">${c.icon}</div>
                <h3>${c.title}</h3>
                <p>${c.description}</p>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="section-header">
                <h2>${data.title}</h2>
                ${paragraphsHtml}
                <div class="divider"></div>
            </div>
            <div class="about-grid">
                ${cardsHtml}
            </div>
        `;
    }

    // Helper: Render Career Timeline
    function renderCareer(data) {
        const section = document.getElementById('career');
        if (!section || !data) return;

        let timelineHtml = (data.timeline || []).map(t => `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <h3>${t.title}</h3>
                    <span class="date">${t.date}</span>
                    <p>${t.description}</p>
                </div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="section-header">
                <h2>${data.title}</h2>
                ${data.subtitle ? `<p>${data.subtitle}</p>` : ''}
                <div class="divider"></div>
            </div>
            <div class="timeline glass-effect">
                ${timelineHtml}
            </div>
        `;
    }

    // Helper: Render Projects Gallery & Wire Filters
    function renderProjects(data) {
        const section = document.getElementById('projects');
        if (!section || !data) return;

        let filterBtnsHtml = (data.categories || []).map((cat, idx) => `
            <button class="filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${cat.id}">${cat.label}</button>
        `).join('');

        let projectsHtml = (data.items || []).map(item => `
            <div class="project-card glass-effect hover-float" data-category="${item.category}">
                <div class="project-image">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="project-info">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="section-header">
                <h2>${data.title}</h2>
                <p>${data.subtitle}</p>
                <div class="divider"></div>
            </div>
            <div class="gallery-filters">
                ${filterBtnsHtml}
            </div>
            <div class="projects-grid">
                ${projectsHtml}
            </div>
        `;

        // Attach dynamic filtering event listeners
        const filterButtons = section.querySelectorAll('.filter-btn');
        const projectCards = section.querySelectorAll('.project-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
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
    }

    // Helper: Render Video Gallery
    function renderVideos(data) {
        const section = document.getElementById('videos');
        if (!section || !data) return;

        let videosHtml = (data.items || []).map(v => `
            <div class="video-card glass-effect hover-float">
                <div class="video-container">
                    <iframe src="${v.embedUrl}" title="${v.title}" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
                </div>
                <div class="video-info">
                    <h3>${v.title}</h3>
                    <p>${v.description}</p>
                </div>
            </div>
        `).join('');

        let moreBtnHtml = '';
        if (data.moreVideosBtn && data.moreVideosBtn.url) {
            moreBtnHtml = `
                <div style="text-align: center; margin-top: 3rem;">
                    <a href="${data.moreVideosBtn.url}" target="_blank" class="btn btn-primary" style="padding: 1rem 2.5rem; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);">
                        <i class="fab fa-facebook-f" style="margin-right: 10px;"></i> ${data.moreVideosBtn.text}
                    </a>
                </div>
            `;
        }

        section.innerHTML = `
            <div class="section-header">
                <h2>${data.title}</h2>
                <p>${data.subtitle}</p>
                <div class="divider"></div>
            </div>
            <div class="video-grid">
                ${videosHtml}
            </div>
            ${moreBtnHtml}
        `;
    }

    // Helper: Render News & Press
    function renderNews(data) {
        const section = document.getElementById('news');
        if (!section || !data) return;

        let newsHtml = (data.items || []).map(n => `
            <article class="news-card glass-effect hover-float">
                <div class="news-date">${n.date}</div>
                <div class="news-content">
                    <h3>${n.title}</h3>
                    <p>${n.description}</p>
                    <a href="${n.link}" target="_blank" class="read-more">আরও পড়ুন →</a>
                </div>
            </article>
        `).join('');

        section.innerHTML = `
            <div class="section-header">
                <h2>${data.title}</h2>
                <p>${data.subtitle}</p>
                <div class="divider"></div>
            </div>
            <div class="news-grid">
                ${newsHtml}
            </div>
        `;
    }

    // Helper: Render FAQ
    function renderFAQ(data) {
        const section = document.getElementById('faq');
        if (!section || !data) return;

        let faqHtml = (data.items || []).map(item => `
            <div class="faq-item glass-effect">
                <button class="faq-question">
                    <span>${item.question}</span>
                    <i class="fas fa-plus"></i>
                </button>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>
        `).join('');

        section.innerHTML = `
            <div class="section-header">
                <h2>${data.title}</h2>
                <p>${data.subtitle}</p>
                <div class="divider"></div>
            </div>
            <div class="faq-grid">
                ${faqHtml}
            </div>
        `;

        // Wire FAQ accordions
        const faqItems = section.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        });
    }

    // Helper: Render Map Section
    function renderMap(data) {
        const section = document.getElementById('map-section');
        if (!section || !data) return;

        const headerTitle = section.querySelector('.section-header h2');
        const headerSub = section.querySelector('.section-header p');
        if (headerTitle) headerTitle.textContent = data.title;
        if (headerSub) headerSub.textContent = data.subtitle;

        // Update markers if Leaflet is present
        if (typeof L !== 'undefined' && document.getElementById('map')) {
            try {
                if (leafletMapInstance) {
                    leafletMapInstance.remove();
                }
                const centerCoord = data.center || [24.1, 90.4];
                const zoom = data.zoom || 11;

                leafletMapInstance = L.map('map', { scrollWheelZoom: false }).setView(centerCoord, zoom);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(leafletMapInstance);

                const customIcon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #ff6b6b; width: 15px; height: 15px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(255,107,107,0.5);"></div>`,
                    iconSize: [15, 15],
                    iconAnchor: [7, 7]
                });

                (data.markers || []).forEach(p => {
                    L.marker(p.coords, { icon: customIcon })
                        .addTo(leafletMapInstance)
                        .bindPopup(`
                            <div style="font-family: inherit; padding: 5px;">
                                <strong style="color: #ff6b6b;">${p.name}</strong><br>
                                <span style="font-size: 0.85rem; opacity: 0.8;">${p.desc}</span>
                            </div>
                        `);
                });
            } catch (err) {
                console.warn("Leaflet Map init skipped:", err);
            }
        }
    }

    // Helper: Render Contact, Social Media & Footer
    function renderContactAndFooter(contact, footer, social) {
        if (contact) {
            const sec = document.getElementById('contact');
            if (sec) {
                const badge = sec.querySelector('.portal-header .badge');
                const title = sec.querySelector('.portal-header h2');
                const p = sec.querySelector('.portal-header p');
                if (badge && contact.badge) badge.textContent = contact.badge;
                if (title && contact.title) title.textContent = contact.title;
                if (p && contact.subtitle) p.textContent = contact.subtitle;

                // Add or update Contact Info Cards Grid above the form
                let cardsContainer = sec.querySelector('.contact-info-grid');
                if (!cardsContainer) {
                    cardsContainer = document.createElement('div');
                    cardsContainer.className = 'contact-info-grid';
                    cardsContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;';
                    const portalHeader = sec.querySelector('.portal-header');
                    if (portalHeader && portalHeader.nextSibling) {
                        portalHeader.parentNode.insertBefore(cardsContainer, portalHeader.nextSibling);
                    }
                }

                let cardsHtml = '';
                if (contact.officeAddress) {
                    cardsHtml += `
                        <div class="contact-info-card glass-effect hover-float" style="padding: 1rem 1.25rem; border-radius: 16px; display: flex; align-items: center; gap: 12px;">
                            <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(16, 185, 129, 0.2); display: flex; align-items: center; justify-content: center; color: var(--primary); font-size: 1.1rem; flex-shrink: 0;"><i class="fas fa-map-marker-alt"></i></div>
                            <div><strong style="display: block; font-size: 0.85rem; color: var(--text-muted);">অফিস ঠিকানা</strong><span style="font-size: 0.95rem; color: #fff;">${contact.officeAddress}</span></div>
                        </div>
                    `;
                }
                if (contact.phone) {
                    cardsHtml += `
                        <a href="tel:${contact.phone}" class="contact-info-card glass-effect hover-float" style="padding: 1rem 1.25rem; border-radius: 16px; display: flex; align-items: center; gap: 12px; text-decoration: none;">
                            <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(59, 130, 246, 0.2); display: flex; align-items: center; justify-content: center; color: #60a5fa; font-size: 1.1rem; flex-shrink: 0;"><i class="fas fa-phone-alt"></i></div>
                            <div><strong style="display: block; font-size: 0.85rem; color: var(--text-muted);">হটলাইন ফোন</strong><span style="font-size: 0.95rem; color: #fff;">${contact.phone}</span></div>
                        </a>
                    `;
                }
                if (contact.email) {
                    cardsHtml += `
                        <a href="mailto:${contact.email}" class="contact-info-card glass-effect hover-float" style="padding: 1rem 1.25rem; border-radius: 16px; display: flex; align-items: center; gap: 12px; text-decoration: none;">
                            <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(245, 158, 11, 0.2); display: flex; align-items: center; justify-content: center; color: #fbbf24; font-size: 1.1rem; flex-shrink: 0;"><i class="fas fa-envelope"></i></div>
                            <div><strong style="display: block; font-size: 0.85rem; color: var(--text-muted);">ইমেইল</strong><span style="font-size: 0.95rem; color: #fff;">${contact.email}</span></div>
                        </a>
                    `;
                }
                if (contact.whatsapp) {
                    const waUrl = contact.whatsapp.startsWith('http') ? contact.whatsapp : `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`;
                    cardsHtml += `
                        <a href="${waUrl}" target="_blank" class="contact-info-card glass-effect hover-float" style="padding: 1rem 1.25rem; border-radius: 16px; display: flex; align-items: center; gap: 12px; text-decoration: none;">
                            <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(37, 211, 102, 0.2); display: flex; align-items: center; justify-content: center; color: #4ade80; font-size: 1.1rem; flex-shrink: 0;"><i class="fab fa-whatsapp"></i></div>
                            <div><strong style="display: block; font-size: 0.85rem; color: var(--text-muted);">হোয়াটসঅ্যাপ</strong><span style="font-size: 0.95rem; color: #fff;">${contact.whatsapp}</span></div>
                        </a>
                    `;
                }
                cardsContainer.innerHTML = cardsHtml;
            }
        }

        // Build Dynamic Social Links
        const socialList = [];
        if (social) {
            if (social.facebook) socialList.push({ platform: 'facebook', icon: 'fab fa-facebook-f', url: social.facebook, label: 'Facebook' });
            if (social.youtube) socialList.push({ platform: 'youtube', icon: 'fab fa-youtube', url: social.youtube, label: 'YouTube' });
            if (social.twitter) socialList.push({ platform: 'twitter', icon: 'fab fa-twitter', url: social.twitter, label: 'Twitter' });
            if (social.whatsapp) socialList.push({ platform: 'whatsapp', icon: 'fab fa-whatsapp', url: social.whatsapp, label: 'WhatsApp' });
            if (social.instagram) socialList.push({ platform: 'instagram', icon: 'fab fa-instagram', url: social.instagram, label: 'Instagram' });
            if (social.telegram) socialList.push({ platform: 'telegram', icon: 'fab fa-telegram-plane', url: social.telegram, label: 'Telegram' });
        } else if (footer && footer.socialLinks) {
            socialList.push(...footer.socialLinks);
        }

        if (footer) {
            const footerEl = document.querySelector('footer');
            if (footerEl) {
                const p = footerEl.querySelector('p');
                if (p && footer.copyright) p.innerHTML = footer.copyright;

                const socialContainer = footerEl.querySelector('.footer-social');
                if (socialContainer && socialList.length) {
                    socialContainer.innerHTML = socialList.map(s => `
                        <a href="${s.url}" target="_blank" title="${s.label || s.platform}">
                            <i class="${s.icon}"></i>
                        </a>
                    `).join('');
                }
            }
        }
    }

    // Insert Admin Floating Link if not present
    function addAdminButton() {
        if (!document.getElementById('adminQuickLink')) {
            const btn = document.createElement('a');
            btn.id = 'adminQuickLink';
            btn.className = 'admin-quick-link';
            btn.href = 'admin/';
            btn.innerHTML = '<i class="fas fa-sliders-h"></i> এডমিন প্যানেল';
            document.body.appendChild(btn);
        }
    }

    // Main Hydration Function
    async function hydrateSite() {
        if (!window.siteDataService) {
            console.error("siteDataService not loaded.");
            return;
        }

        try {
            const data = await window.siteDataService.getSiteData();
            if (!data) return;
            currentData = data;

            // Apply theme (Fonts, Colors)
            applyTheme(data.theme);

            // Render Header & Navigation
            renderHeader(data.header);

            // Render Hero Slider
            renderHero(data.hero);

            // Render Sections
            renderElectionResults(data.electionResults);
            renderAbout(data.about);
            renderCareer(data.career);
            renderProjects(data.projects);
            renderVideos(data.videos);
            renderNews(data.news);
            renderFAQ(data.faq);
            renderMap(data.map);
            renderContactAndFooter(data.contact, data.footer, data.social);

            // Add Admin shortcut
            addAdminButton();

            // Re-trigger scroll observer for animations
            if (window.initObservers) {
                window.initObservers();
            }
        } catch (err) {
            console.error("Error hydrating site data:", err);
        }
    }

    // Initialize once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            hydrateSite();
            // Listen to real-time changes
            if (window.siteDataService) {
                window.siteDataService.subscribeToUpdates((newData) => {
                    if (newData) {
                        applyTheme(newData.theme);
                        renderHeader(newData.header);
                        renderHero(newData.hero);
                        renderElectionResults(newData.electionResults);
                        renderAbout(newData.about);
                        renderCareer(newData.career);
                        renderProjects(newData.projects);
                        renderVideos(newData.videos);
                        renderNews(newData.news);
                        renderFAQ(newData.faq);
                        renderMap(newData.map);
                        renderContactAndFooter(newData.contact, newData.footer, newData.social);
                    }
                });
            }
        });
    } else {
        hydrateSite();
    }

    // Export renderer globally so Admin preview can trigger it
    window.DynamicRenderer = {
        applyTheme,
        hydrateSite,
        renderHero
    };
})();

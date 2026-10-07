<?php get_header(); ?>
<!-- Hero Section -->
    <section id="hero" class="hero">
        <div class="hero-content">
            <div class="hero-image-container glass-effect animate-hero-img">
                <img src="<?php echo get_template_directory_uri(); ?>/assets/politician_portrait.jpg" alt="Dr. S. M. Rafiqul Islam Bachchu" class="hero-img"
                    id="hero-img">
            </div>
            <div class="hero-text animate-hero-text" style="display: flex; flex-direction: column; align-items: flex-end; text-align: right;">
                <div style="display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.6rem; margin-bottom: 1.5rem;">
                    <span class="badge" style="margin-bottom: 0;">সংসদ সদস্য, ১৯৬,গাজীপুর-০৩</span>
                    <span class="badge" style="margin-bottom: 0; background: rgba(59, 130, 246, 0.2); border-color: rgba(59, 130, 246, 0.3); color: #93c5fd;">সহ-স্বাস্থ্য বিষয়ক সম্পাদক, বিএনপি।</span>
                    <span class="badge" style="margin-bottom: 0; background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.3); color: #fcd34d;">সিনিয়র যুগ্ম আহ্বায়ক-গাজীপুর জেলা বিএনপি।</span>
                </div>
                <h1 class="title"><?php echo get_theme_mod('pb_hero_title', 'ডা: এস. এম. <br><span class="highlight">রফিকুল ইসলাম</span> বাচ্চু'); ?></h1>
                <p class="subtitle" style="margin-left: auto; margin-right: 0;"><?php echo esc_html(get_theme_mod('pb_hero_subtitle', 'বাংলাদেশ জাতীয়তাবাদী দলের (বিএনপি) একজন নিবেদিতপ্রাণ নেতা এবং গাজীপুরের মানুষের সেবক।')); ?></p>
                <div class="social-links" style="justify-content: flex-end; width: 100%;">
                    <a href="<?php echo esc_url(get_theme_mod('pb_facebook_url', 'https://www.facebook.com/Dr.Bachchu')); ?>" target="_blank" class="social-icon" title="Facebook" aria-label="Visit Facebook Page of Dr. Bachchu"><i class="fab fa-facebook-f"></i></a>
                    <a href="<?php echo esc_url(get_theme_mod('pb_twitter_url', '#')); ?>" class="social-icon" title="Twitter" aria-label="Visit Twitter Profile of Dr. Bachchu"><i class="fab fa-twitter"></i></a>
                    <a href="<?php echo esc_url(get_theme_mod('pb_youtube_url', '#')); ?>" class="social-icon" title="YouTube" aria-label="Watch Dr. Bachchu on YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="<?php echo esc_url(get_theme_mod('pb_whatsapp_url', '#')); ?>" class="social-icon" title="WhatsApp" aria-label="Connect with Dr. Bachchu on WhatsApp"><i class="fab fa-whatsapp"></i></a>
                </div>
                <a href="#about" class="btn btn-primary" style="margin-top: 0.5rem;">বিস্তারিত জানুন</a>
            </div>
        </div>
    </section>

    <main>

        <!-- Election Results Section -->
        <section id="election-results" class="election-results section-offset fade-in-up">
            <div class="section-header">
                <h2>নির্বাচনী ফলাফল ২০২৬</h2>
                <p>১৩তম জাতীয় সংসদ নির্বাচনে গাজীপুর-৩ আসনে বিপুল জনসমর্থনে বিজয়।</p>
                <div class="divider"></div>
            </div>
            <div class="stats-grid">
                <!-- Info Graphic: Vote Share Comparison -->
                <div class="stat-card glass-effect hover-float full-width-card">
                    <div class="stat-label" style="margin-bottom: 1.5rem;">ভোটের ব্যবধান (তুলনামূলক চিত্র)</div>
                    <div class="comparison-bar-container">
                        <div class="comparison-segment bachchu" style="width: 61.9%;">
                            <span class="segment-label">ডা: বাচ্চু (৬১.৯%)</span>
                        </div>
                        <div class="comparison-segment rival" style="width: 38.1%;">
                            <span class="segment-label">নিকটতম প্রতিদ্বন্দ্বী (৩৮.১%)</span>
                        </div>
                    </div>
                </div>

                <div class="stat-card glass-effect hover-float">
                    <div class="stat-icon"><i class="fas fa-box-check"></i></div>
                    <div class="stat-value">১,৬১,২৫৮</div>
                    <div class="stat-label">মোট প্রাপ্ত ভোট</div>
                </div>
                
                <div class="stat-card glass-effect hover-float">
                    <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
                    <div class="stat-value">৬১,৯০৪</div>
                    <div class="stat-label">জয়ের ব্যবধান</div>
                </div>

                <div class="stat-card glass-effect hover-float radial-stat">
                    <div class="radial-progress" style="--percent: 57.5;">
                        <svg viewBox="0 0 140 140">
                            <circle cx="70" cy="70" r="60"></circle>
                            <circle cx="70" cy="70" r="60"></circle>
                        </svg>
                        <div class="radial-text">৫৭.৫০%</div>
                    </div>
                    <div class="stat-label">ভোট প্রদানের হার</div>
                </div>

                <div class="stat-card glass-effect hover-float">
                    <div class="stat-icon"><i class="fas fa-user-friends"></i></div>
                    <div class="stat-value" style="font-size: 1.15rem; line-height: 1.4; margin-top: 0.5rem;">মোহাম্মদ এহসানুল হক</div>
                    <div class="stat-label">নিকটতম প্রতিদ্বন্দ্বী (রিক্সা)</div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="about section-offset fade-in-up">
            <div class="section-header">
                <h2>সংক্ষিপ্ত পরিচিতি</h2>
                <p style="margin-bottom: 1rem; max-width: 800px; margin-left: auto; margin-right: auto;">ডা. এস এম রফিকুল ইসলাম (বাচ্চু) একজন বাংলাদেশী চিকিৎসক ও রাজনীতিবিদ। তিনি ১৯৬, গাজীপুর-০৩ (শ্রীপুর ও গাজীপুর সদর আংশিক) আসন থেকে নির্বাচিত ত্রয়োদশ জাতীয় সংসদের একজন গর্বিত সদস্য। গাজীপুর-৩ এর মানুষের সেবক হিসেবে তিনি শ্রীপুর, মাওনা, তেলিহাটী ও বরমী সহ পুরো এলাকায় উন্নয়নের রূপকার হিসেবে কাজ করছেন। বর্তমানে তিনি বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি)-এর কেন্দ্রীয় নির্বাহী কমিটির সহ-স্বাস্থ্য বিষয়ক সম্পাদক ও গাজীপুর জেলা বিএনপির সিনিয়র যুগ্ম আহ্বায়ক হিসেবে দায়িত্ব পালন করছেন। ২০২৬ সালের ১২ ফেব্রুয়ারি অনুষ্ঠিত নির্বাচনে তিনি এই আসন থেকে বিপুল জনসমর্থনে বিজয়ী হন।</p>
                <p style="margin-bottom: 1.5rem; max-width: 800px; margin-left: auto; margin-right: auto;">তাছাড়া তিনি ড্যাব (ডক্টরস অ্যাসোসিয়েশন অব বাংলাদেশ)-এর উপদেষ্টা হিসাবেও দায়িত্ব পালন করে আসছেন।</p>
                <div class="divider"></div>
            </div>
            <div class="about-grid">
                <div class="about-card glass-effect hover-float">
                    <div class="icon">🎓</div>
                    <h3>শিক্ষা ও পেশা</h3>
                    <p>তিনি একজন বিশিষ্ট চিকিৎসক, যিনি চিকিৎসা সেবার পাশাপাশি জনকল্যাণে নিজেকে নিয়োজিত করেছেন।</p>
                </div>
                <div class="about-card glass-effect hover-float">
                    <div class="icon">🤝</div>
                    <h3>সমাজসেবা</h3>
                    <p>গাজীপুরের সাধারণ মানুষের আর্থ-সামালিক উন্নয়ন ও অধিকার আদায়ের সংগ্রামে তিনি সবসময় সোচ্চার।</p>
                </div>
                <div class="about-card glass-effect hover-float">
                    <div class="icon">🏛️</div>
                    <h3>রাজনৈতিক অবস্থান</h3>
                    <p>বিনয়ী ও সাহসী এই নেতা বিএনপি'র কেন্দ্রীয় কমিটির স্বাস্থ্য বিষয়ক সহ-সম্পাদক হিসেবেও দায়িত্ব
                        পালন করছেন।</p>
                </div>
            </div>
        </section>

        <!-- Career Section -->
        <section id="career" class="career section-offset fade-in-up">
            <div class="section-header">
                <h2>রাজনৈতিক জীবন</h2>
                <div class="divider"></div>
            </div>
            <div class="timeline glass-effect">
                <?php
                $timeline = new WP_Query(array('post_type' => 'timeline', 'posts_per_page' => -1, 'order' => 'ASC', 'orderby' => 'date'));
                if ($timeline->have_posts()) :
                    while ($timeline->have_posts()) : $timeline->the_post();
                ?>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3><?php the_title(); ?></h3>
                        <span class="date"><?php echo get_the_excerpt(); ?></span>
                        <p><?php echo get_the_content(); ?></p>
                    </div>
                </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                ?>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>সংসদ সদস্য নির্বাচিত</h3>
                        <span class="date">ফেব্রুয়ারি ২০২৬</span>
                        <p>ত্রয়োদশ জাতীয় সংসদ নির্বাচনে তিনি ১৯৬, গাজীপুর-০৩ আসন থেকে বিপুল ব্যবধানে জয়লাভ করেন।</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>কেন্দ্রীয় ও পেশাজীবী দায়িত্ব</h3>
                        <span class="date">বর্তমান</span>
                        <p>বিএনপির কেন্দ্রীয় কমিটির সহ-স্বাস্থ্য বিষয়ক সম্পাদক, ড্যাবের সিনিয়র যুগ্ম মহাসচিব ও সম্মলিত পেশাজীবী পরিষদের কেন্দ্রীয় আহবায়ক কমিটির সদস্য। পেশাগত জীবনে তিনি এনাম মেডিকেল কলেজের অধ্যাপক হিসেবে এবং পরপর চারবার নির্বাচিত বিএমএ-এর কেন্দ্রীয় প্রতিনিধি হিসেবে দায়ীত্ব পালন করছেন।</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>চাকরিচ্যুতি ও রাজনৈতিক দুঃসময়</h3>
                        <span class="date">২০০৭ – ২০১০</span>
                        <p>০১-১১ এর পর বিএনপির রাজনৈতিক দুঃসময়ে তিনি ড্যাবের ভারপ্রাপ্ত মহাসচিবের দায়ীত্ব পালন করেন ও শাহাবাগ থানা বিএনপির সাথে জড়িত হন। রাজনৈতিক প্রতিহিংসার কারনে ২০১০ সালের ২২শে ডিসেম্বর বিএসএমএমইউ (পিজি হাসপাতাল) হতে চাকুরীতুচ্য হন।</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>ড্যাব প্রতিষ্ঠা ও শ্রীপুর বিএনপি</h3>
                        <span class="date">১৯৮৯ – ১৯৯১</span>
                        <p>১৯৮৯ সালের ৬ই আগষ্ট ড্যাব প্রতিষ্ঠা করেন ও যুগ্ন মহাসচিব হিসেবে এর সম্প্রসারনে নিরলস কাজ করেন। পরবর্তীতে ১৯৯১ সাল হতে শ্রীপুর বিএনপির সাথে জড়িত হন ও দলের জন্য কাজ করেন।</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>ছাত্র রাজনীতিতে সূচনা</h3>
                        <span class="date">৩ মার্চ, ১৯৮১ – ১৯৮৭</span>
                        <p>১৯৮১ সালের ৩রা র্মাচ ছাত্রদলে যোগদানের মাধ্যমে রাজনীতিতে হাতেখড়ি। এরপর ১৯৮৫-৮৬ সালে ময়মনসিংহ মেডিকেল ছাত্রদলের এবং ১৯৮৬-৮৭ সালে বৃহত্তর ময়মনসিংহ জেলা ছাত্রদলের সেক্রেটারী হিসেবে দায়ীত্ব পালন করেন।</p>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </section>

        <!-- Achievements Gallery Section -->
        <section id="projects" class="projects section-offset fade-in-up">
            <div class="section-header">
                <h2>উন্নয়নমূলক কর্মকাণ্ড</h2>
                <p>গাজীপুর-৩ আসনের (শ্রীপুর, মাওনা ও তেলিহাটী) মানুষের জীবনমান উন্নয়নে বাস্তবায়িত কিছু উল্লেখযোগ্য প্রকল্প।</p>
                <div class="divider"></div>
            </div>

            <!-- Gallery Filters -->
            <div class="gallery-filters">
                <button class="filter-btn active" data-filter="all">সবগুলো</button>
                <button class="filter-btn" data-filter="health">স্বাস্থ্য</button>
                <button class="filter-btn" data-filter="transport">যোগাযোগ</button>
                <button class="filter-btn" data-filter="education">শিক্ষা</button>
                <button class="filter-btn" data-filter="agriculture">কৃষি</button>
                <button class="filter-btn" data-filter="employment">কর্মসংস্থান</button>
                <button class="filter-btn" data-filter="infrastructure">অবকাঠামো</button>
            </div>

            <div class="projects-grid">
                <?php
                $projects_query = new WP_Query(array('post_type' => 'projects', 'posts_per_page' => -1));
                if ($projects_query->have_posts()) :
                    while ($projects_query->have_posts()) : $projects_query->the_post();
                        $terms = get_the_terms(get_the_ID(), 'project_category');
                        $cat_slug = ($terms && !is_wp_error($terms)) ? esc_attr($terms[0]->slug) : 'all';
                ?>
                <div class="project-card glass-effect hover-float" data-category="<?php echo $cat_slug; ?>">
                    <div class="project-image">
                        <?php if (has_post_thumbnail()) : ?>
                            <?php the_post_thumbnail('large'); ?>
                        <?php else : ?>
                            <img src="<?php echo get_template_directory_uri(); ?>/assets/project_hospital.png" alt="<?php the_title_attribute(); ?>">
                        <?php endif; ?>
                    </div>
                    <div class="project-info">
                        <h3><?php the_title(); ?></h3>
                        <p><?php echo get_the_excerpt(); ?></p>
                    </div>
                </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                ?>
                <div class="project-card glass-effect hover-float" data-category="health">
                    <div class="project-image">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/project_hospital.png" alt="ডা: রফিকুল ইসলাম বাচ্চুর উন্নয়ন প্রকল্প - নতুন আধুনিক হাসপাতাল ভবন নির্মাণ">
                    </div>
                    <div class="project-info">
                        <h3>আধুনিক হাসপাতাল নির্মাণ</h3>
                        <p>তৃণমূল পর্যায়ে উন্নত স্বাস্থ্যসেবা পৌঁছে দিতে নতুন আধুনিক হাসপাতাল ভবন নির্মাণ।</p>
                    </div>
                </div>
                <div class="project-card glass-effect hover-float" data-category="transport">
                    <div class="project-image">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/project_road.png" alt="উদয়খালী থেকে চেয়ারম্যান বাড়ি মোড় সড়ক উন্নয়ন কাজ">
                    </div>
                    <div class="project-info">
                        <h3>উদয়খালী – চেয়ারম্যান বাড়ি মোড় সড়ক উন্নয়ন</h3>
                        <p>সম্প্রতি উদয়খালী থেকে চেয়ারম্যান বাড়ি মোড় পর্যন্ত জনগুরুত্বপূর্ণ রাস্তার সংস্কার ও আধুনিক উন্নয়নমূলক কাজ সম্পন্ন।</p>
                    </div>
                </div>
                <div class="project-card glass-effect hover-float" data-category="transport">
                    <div class="project-image">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/project_road.png" alt="গাজীপুর-৩ আসনে যোগাযোগ ব্যাবস্থার উন্নয়ন - প্রশস্ত রাস্তা ও কালভার্ট">
                    </div>
                    <div class="project-info">
                        <h3>যোগাযোগ ব্যবস্থার উন্নয়ন</h3>
                        <p>এলাকার যাতায়াত ব্যবস্থা সহজ করতে নতুন প্রশস্ত রাস্তা ও কালভার্ট নির্মাণ।</p>
                    </div>
                </div>
                <div class="project-card glass-effect hover-float" data-category="education">
                    <div class="project-image">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/project_school.png" alt="ডা: রফিকুল ইসলাম বাচ্চুর উদ্যোগে শিক্ষা প্রতিষ্ঠানের আধুনিকায়ন ও নতুন ভবন">
                    </div>
                    <div class="project-info">
                        <h3>শিক্ষা প্রতিষ্ঠানের সংস্কার</h3>
                        <p>শিক্ষার মান উন্নয়নে সরকারি প্রাথমিক ও উচ্চ বিদ্যালয়গুলোর নতুন ভবন এবং আধুনিক ক্লাসরুম।</p>
                    </div>
                </div>
                <div class="project-card glass-effect hover-float" data-category="agriculture">
                    <div class="project-image">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/project_agriculture.png" alt="গাজীপুর-৩ আসনে আধুনিক সেচ ও উন্নত কৃষি সরঞ্জাম বিতরণ প্রকল্প">
                    </div>
                    <div class="project-info">
                        <h3>কৃষি ও আধুনিক সেচ</h3>
                        <p>কৃষকদের জীবনমান উন্নয়নে আধুনিক সেচ প্রকল্প ও উন্নত কৃষি সরঞ্জাম বিতরণ।</p>
                    </div>
                </div>
                <div class="project-card glass-effect hover-float" data-category="employment">
                    <div class="project-image">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/project_employment.png" alt="গাজীপুরের তরুণদের জন্য কারিগরি শিক্ষা ও কর্মসংস্থান উদ্যোগ">
                    </div>
                    <div class="project-info">
                        <h3>তরুণদের কর্মসংস্থান</h3>
                        <p>বেকারত্ব দূরীকরণে তরুণদের জন্য কারিগরি ও ভোকেশনাল ট্রেনিং সেন্টার স্থাপন।</p>
                    </div>
                </div>
                <div class="project-card glass-effect hover-float" data-category="infrastructure">
                    <div class="project-image">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/project_infrastructure.png" alt="গাজীপুর-৩ পল্লী উন্নয়ন ও বিদ্যুৎ সংযোগ প্রকল্প">
                    </div>
                    <div class="project-info">
                        <h3>পল্লী উন্নয়ন</h3>
                        <p>গ্রামাঞ্চলে শতভাগ বিদ্যুতায়নসহ সোলার প্যানেল স্থাপন ও গ্রামীণ সেতু নির্মাণ।</p>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </section>

        <!-- Video Gallery Section -->
        <section id="videos" class="videos section-offset fade-in-up">
            <div class="section-header">
                <h2>ভিডিও গ্যালারি</h2>
                <p>ডা: রফিকুল ইসলাম বাচ্চুর গুরুত্বপূর্ণ বক্তব্য এবং জনসভার ভিডিওগুলো দেখুন।</p>
                <div class="divider"></div>
            </div>
            <div class="video-grid">
                <?php
                $videos = new WP_Query(array('post_type' => 'videos', 'posts_per_page' => 6));
                if ($videos->have_posts()) :
                    while ($videos->have_posts()) : $videos->the_post();
                ?>
                <div class="video-card glass-effect hover-float">
                    <div class="video-container">
                        <?php the_content(); ?>
                    </div>
                    <div class="video-info">
                        <h3><?php the_title(); ?></h3>
                    </div>
                </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                ?>
                <div class="video-card glass-effect hover-float">
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/F8jVIZel5yk" title="Speech 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="video-info">
                        <h3>বিশেষ সাক্ষাৎকার</h3>
                        <p>বর্তমান রাজনৈতিক প্রেক্ষাপট, ভবিষ্যৎ কর্মপন্থা ও গাজীপুরের উন্নয়ন নিয়ে বিশেষ আলোচনা।</p>
                    </div>
                </div>
                <div class="video-card glass-effect hover-float">
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/ux_PmMA247s" title="Speech 2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="video-info">
                        <h3>জনসংযোগ ও মতবিনিময়</h3>
                        <p>তৃণমূল নেতাকর্মী ও সাধারণ মানুষের সাথে সরাসরি কথোপকথন।</p>
                    </div>
                </div>
                <div class="video-card glass-effect hover-float">
                    <div class="video-container">
                        <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2006334740286220%2F&show_text=true&width=auto&t=0" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                    <div class="video-info">
                        <h3>সাম্প্রতিক ফেসবুক রিলস</h3>
                        <p>অফিসিয়াল ফেসবুক পেইজ থেকে ডা: রফিকুল ইসলাম বাচ্চুর সাম্প্রতিক মুহূর্ত।</p>
                    </div>
                </div>
                <div class="video-card glass-effect hover-float">
                    <div class="video-container">
                        <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1123229459932926%2F&show_text=false&width=auto&t=0" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                    <div class="video-info">
                        <h3>ঈদ মোবারক বার্তা</h3>
                        <p>সবাইকে পবিত্র ঈদের শুভেচ্ছা জানিয়ে ডা: রফিকুল ইসলাম বাচ্চুর বিশেষ বার্তা।</p>
                    </div>
                </div>
                <div class="video-card glass-effect hover-float">
                    <div class="video-container">
                        <iframe src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1141825111335046%2F&show_text=false&width=auto&t=0" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                    <div class="video-info">
                        <h3>নতুন ভিডিও আপডেট</h3>
                        <p>ডা: রফিকুল ইসলাম বাচ্চুর অফিসিয়াল ফেসবুক পেইজ থেকে সর্বশেষ বক্তব্য ও ভিডিও।</p>
                    </div>
                </div>
                <div class="video-card glass-effect hover-float">
                    <div class="video-container">
                        <iframe src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fbdbnpnews%2Fvideos%2F1096290142872081%2F&show_text=false&width=560&t=0" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                    </div>
                    <div class="video-info">
                        <h3>বিএনপি নিউজ ভিডিও</h3>
                        <p>বাংলাদেশ জাতীয়তাবাদী দল (বিএনপি) অফিসিয়াল পেইজ থেকে গুরুত্বপূর্ণ ভিডিও ফুটেজ ও বক্তব্য।</p>
                    </div>
                </div>
                <?php endif; ?>
            </div>

            <div style="text-align: center; margin-top: 3rem;">
                <a href="https://www.facebook.com/watch/Dr.Bachchu/" target="_blank" class="btn btn-primary" style="padding: 1rem 2.5rem; font-size: 1.1rem; box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);">
                    <i class="fab fa-facebook-f" style="margin-right: 10px;"></i> আরও ভিডিও দেখুন
                </a>
            </div>
        </section>

        <!-- News & Updates Section -->
        <section id="news" class="news section-offset fade-in-up">
            <div class="section-header">
                <h2>নিউজ ও আপডেট</h2>
                <p>ডা: রফিকুল ইসলাম বাচ্চুর সাম্প্রতিক রাজনৈতিক ও সামাজিক কর্মকাণ্ডের আপডেটসমূহ।</p>
                <div class="divider"></div>
            </div>
            <div class="news-grid">
                <?php
                $news = new WP_Query(array('post_type' => 'post', 'posts_per_page' => 3));
                if ($news->have_posts()) :
                    while ($news->have_posts()) : $news->the_post();
                ?>
                <article class="news-card glass-effect hover-float">
                    <div class="news-date"><?php echo get_the_date(); ?></div>
                    <div class="news-content">
                        <h3><?php the_title(); ?></h3>
                        <p><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                        <a href="<?php the_permalink(); ?>" class="read-more">আরও পড়ুন →</a>
                    </div>
                </article>
                <?php
                    endwhile;
                    wp_reset_postdata();
                else :
                ?>
                <!-- News Card 1 -->
                <article class="news-card glass-effect hover-float">
                    <div class="news-date">২৪ জানুয়ারি, ২০২৬</div>
                    <div class="news-content">
                        <h3>তারেক রহমানের সাথে সৌজন্য সাক্ষাতে জাকসু ও গকসু নেতৃবৃন্দ</h3>
                        <p>তারেক রহমানের সাথে জাকসু ও গকসু নেতৃবৃন্দের সৌজন্য সাক্ষাৎ ও মতবিনিময় সভা অনুষ্ঠিত হয়। গাজীপুর জেলা বিএনপি এই সফল সফরের সার্বিক সহযোগিতায় ছিল।</p>
                        <a href="https://www.tariquerahman.info/%e0%a6%a4%e0%a6%be%e0%a6%b0%e0%a7%87%e0%a6%95-%e0%a6%b0%e0%a6%b9%e0%a6%ae%e0%a6%be%e0%a6%a8%e0%a7%87%e0%a6%b0-%e0%a6%b8%e0%a6%be%e0%a6%a5%e0%a7%87-%e0%a6%b8%e0%a7%8c%e0%a6%9c%e0%a6%a8%e0%a7%8d/" target="_blank" class="read-more">আরও পড়ুন →</a>
                    </div>
                </article>

                <!-- News Card 2 -->
                <article class="news-card glass-effect hover-float">
                    <div class="news-date">২১ জানুয়ারি, ২০২৬</div>
                    <div class="news-content">
                        <h3>নির্বাচনী ইশতেহার উন্মোচন করলেন তারেক রহমান</h3>
                        <p>আগামী জাতীয় নির্বাচন উপলক্ষে তারেক রহমান ২৭ দফার ভিত্তিতে আধুনিক বাংলাদেশ গড়ার ইশতেহার ঘোষণা করেন। গাজীপুর-৩ আসনে এই বার্তা পৌঁছে দেওয়া হচ্ছে।</p>
                        <a href="https://www.tariquerahman.info/%e0%a6%a8%e0%a6%bf%e0%a6%b0%e0%a7%8d%e0%a6%ac%e0%a6%be%e0%a6%9a%e0%a6%a8%e0%a7%80-%e0%a6%87%e0%a6%b6%e0%a6%a4%e0%a7%87%e0%a6%b9%e0%a6%be%e0%a6%b0-%e0%a6%89%e0%a6%a8%e0%a7%8d%e0%a6%ae%e0%a7%8b%e0%a6%9a/" target="_blank" class="read-more">আরও পড়ুন →</a>
                    </div>
                </article>

                <!-- News Card 3 -->
                <article class="news-card glass-effect hover-float">
                    <div class="news-date">১৯ জানুয়ারি, ২০২৬</div>
                    <div class="news-content">
                        <h3>তারেক রহমানের সঙ্গে নবনিযুক্ত মার্কিন রাষ্ট্রদূতের সাক্ষাৎ</h3>
                        <p>তারেক রহমানের সাথে নবনিযুক্ত মার্কিন রাষ্ট্রদূতের সৌজন্য সাক্ষাৎ। বৈঠকে দ্বিপাক্ষিক সম্পর্ক ও গণতন্ত্রের ভবিষ্যৎ নিয়ে আলোচনা হয়।</p>
                        <a href="https://www.tariquerahman.info/%e0%a6%a4%e0%a6%be%e0%a6%b0%e0%a7%87%e0%a6%95-%e0%a6%b0%e0%a6%b9%e0%a6%ae%e0%a6%be%e0%a6%a8%e0%a7%87%e0%a6%b0-%e0%a6%b8%e0%a6%99%e0%a7%8d%e0%a6%97%e0%a7%87-%e0%a6%ae%e0%a6%be%e0%a6%b0%e0%a7%8d-2/" target="_blank" class="read-more">আরও পড়ুন →</a>
                    </div>
                </article>
                <?php endif; ?>
            </div>
        </section>

        <!-- FAQ Section -->
        <section id="faq" class="faq section-offset fade-in-up">
            <div class="section-header">
                <h2>সচরাচর জিজ্ঞাস্য (FAQ)</h2>
                <p>ডা: রফিকুল ইসলাম বাচ্চু এবং গাজীপুর-৩ এর উন্নয়ন নিয়ে কিছু সাধারণ প্রশ্ন ও উত্তর।</p>
                <div class="divider"></div>
            </div>
            <div class="faq-grid">
                <div class="faq-item glass-effect">
                    <button class="faq-question">
                        <span>ডা: এস. এম. রফিকুল ইসলাম বাচ্চু কে?</span>
                        <i class="fas fa-plus"></i>
                    </button>
                    <div class="faq-answer">
                        <p>ডা: এস. এম. রফিকুল ইসলাম বাচ্চু একজন বিশিষ্ট চিকিৎসক এবং গাজীপুর-৩ (শ্রীপুর ও গাজীপুর সদর) আসনের নির্বাচিত সংসদ সদস্য। তিনি বিএনপির কেন্দ্রীয় নির্বাহী কমিটির সহ-স্বাস্থ্য বিষয়ক সম্পাদক হিসেবেও দায়িত্ব পালন করছেন।</p>
                    </div>
                </div>
                <div class="faq-item glass-effect">
                    <button class="faq-question">
                        <span>গাজীপুর-৩ আসনে তার প্রধান উন্নয়ন পরিকল্পনাগুলো কী কী?</span>
                        <i class="fas fa-plus"></i>
                    </button>
                    <div class="faq-answer">
                        <p>তার প্রধান লক্ষ্যগুলোর মধ্যে রয়েছে শ্রীপুর ও মাওনা এলাকায় আধুনিক স্বাস্থ্যসেবা নিশ্চিত করা, তেলিহাটী ও বরমী এলাকায় শিল্পায়ন ও কর্মসংস্থান তৈরি এবং পুরো গাজীপুর-৩ আসনে টেকসই যোগাযোগ ব্যবস্থা গড়ে তোলা।</p>
                    </div>
                </div>
                <div class="faq-item glass-effect">
                    <button class="faq-question">
                        <span>তার সাথে সরাসরি যোগাযোগের কোনো মাধ্যম আছে কি?</span>
                        <i class="fas fa-plus"></i>
                    </button>
                    <div class="faq-answer">
                        <p>হ্যাঁ, এই ওয়েবসাইটের "জনগণের সরাসরি যোগাযোগ" (Contact) ফরমের মাধ্যমে আপনি আপনার নাম ও মোবাইল নম্বর দিয়ে সরাসরি বার্তা পাঠাতে পারেন।</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Project Map Section -->
        <section id="map-section" class="map-section section-offset fade-in-up">
            <div class="section-header">
                <h2>সেবা ও উন্নয়ন ম্যাপ</h2>
                <p>গাজীপুর-৩ আসনের বিভিন্ন স্থানে বাস্তবায়িত প্রকল্পগুলোর অবস্থান।</p>
                <div class="divider"></div>
            </div>
            <div class="map-container-wrapper glass-effect">
                <div id="map"></div>
            </div>
        </section>

        <!-- Constituent Portal Section (Feedback) -->
        <section id="contact" class="contact section-offset fade-in-up">
            <div class="contact-box glass-effect">
                <div class="portal-header">
                    <span class="badge">সিটিজেন পোর্টাল</span>
                    <h2>জনগণের সরাসরি যোগাযোগ</h2>
                    <p>গাজীপুর-৩ আসনের উন্নিয়ন এবং আপনার যেকোনো সাহায্য বা পরামর্শের জন্য আমরা প্রস্তুত।</p>
                </div>
                <?php 
                $contact_shortcode = get_theme_mod('pb_contact_shortcode');
                if (empty($contact_shortcode) && shortcode_exists('contact-form-7')) {
                    $contact_shortcode = '[contact-form-7 id="12" title="Contact form 1"]';
                }
                if (!empty($contact_shortcode)) :
                    echo do_shortcode($contact_shortcode);
                else : 
                ?>
                <form class="contact-form portal-form">
                    <div class="form-row">
                        <div class="input-group">
                            <label for="name">আপনার নাম</label>
                            <input type="text" id="name" placeholder="নাম লিখুন" required>
                        </div>
                        <div class="input-group">
                            <label for="phone">ফোন নম্বর</label>
                            <input type="tel" id="phone" placeholder="০১৭XXXXXXXX" required>
                        </div>
                    </div>
                    <div class="input-group">
                        <label for="category">বার্তার ধরন</label>
                        <select id="category" class="glass-effect">
                            <option value="suggestion">পরামর্শ (Suggestion)</option>
                            <option value="complaint">অভিযোগ (Complaint)</option>
                            <option value="help">সহায়তা (Help Request)</option>
                            <option value="appreciation">ধন্যবাদ জ্ঞাপন (Appreciation)</option>
                        </select>
                    </div>
                    <div class="input-group">
                        <label for="message">আপনার বার্তা</label>
                        <textarea id="message" placeholder="আপনার কথা বিস্তারিত লিখুন..." rows="4" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary portal-btn">আবেদন জমা দিন</button>
                </form>
                <?php endif; ?>
            </div>
        </section>
    </main>

    
<?php get_footer(); ?>
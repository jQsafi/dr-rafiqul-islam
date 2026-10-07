<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/bnp_logo.svg" type="image/svg+xml">
    <!-- Meta Tags -->
    <meta name="description" content="গাজীপুর-৩ আসনের সংসদ সদস্য ডা: এস. এম. রফিকুল ইসলাম বাচ্চুর অফিশিয়াল ওয়েবসাইট। রাজনৈতিক জীবন, উন্নয়নমূলক প্রকল্পসমূহ এবং জনগণের জন্য সরাসরি যোগাযোগ পোর্টাল।">
    <meta name="keywords" content="ডা: এস. এম. রফিকুল ইসলাম বাচ্চু, সংসদ সদস্য, গাজীপুর-৩, বিএনপি, বাংলাদেশ জাতীয়তাবাদী দল, বায়োগ্রাফি, উন্নয়ন প্রকল্প, গাজীপুর রাজনীতি, Dr. S. M. Rafiqul Islam Bachchu, MP Gazipur-3">
    <meta name="author" content="ডা: এস. এম. রফিকুল ইসলাম বাচ্চু">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="ডা: এস. এম. রফিকুল ইসলাম বাচ্চু | এমপি, গাজীপুর-৩">
    <meta property="og:description" content="ডা: এস. এম. রফিকুল ইসলাম বাচ্চু - সংসদ সদস্য, গাজীপুর-৩ এর অফিশিয়াল বায়োগ্রাফি।">
    <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/assets/politician_portrait.jpg">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress-container">
        <div class="scroll-progress-bar" id="progressBar"></div>
    </div>

    <!-- Background Elements -->
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>
    <div class="bg-watermark"></div>

    <!-- Navigation -->
    <nav class="navbar glass-effect">
        <div class="nav-container">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="nav-logo"><img src="<?php echo get_template_directory_uri(); ?>/assets/bnp_logo.svg" alt="BNP Monogram"></a>
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class'     => 'nav-links',
                'container'      => false,
                'fallback_cb'    => 'pb_default_menu',
            ));
            ?>
            <div class="hamburger" aria-label="Toggle Navigation Menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    
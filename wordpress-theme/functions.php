<?php
function pb_scripts() {
    wp_enqueue_style('leaflet', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', array(), '1.9.4');
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0');
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap', array(), null);
    wp_enqueue_style('pb-style', get_stylesheet_uri(), array(), '1.0.0');
    
    wp_enqueue_script('leaflet-js', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', array(), '1.9.4', true);
    wp_enqueue_script('pb-script', get_template_directory_uri() . '/script.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'pb_scripts');

function pb_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'political-biography')
    ));
}
add_action('after_setup_theme', 'pb_setup');

// Fallback menu callback for default navigation
function pb_default_menu() {
    $home = esc_url(home_url('/'));
    echo '<ul class="nav-links">
        <li><a href="' . $home . '#about">পরিচিতি</a></li>
        <li><a href="' . $home . '#election-results">নির্বাচনী ফলাফল</a></li>
        <li><a href="' . $home . '#career">রাজনৈতিক জীবন</a></li>
        <li><a href="' . $home . '#projects">উন্নয়নমূলক কর্মকাণ্ড</a></li>
        <li><a href="' . $home . '#videos">ভিডিও গ্যালারি</a></li>
        <li><a href="' . $home . '#news">নিউজ ও আপডেট</a></li>
        <li><a href="' . $home . '#map-section">প্রজেক্ট ম্যাপ</a></li>
        <li><a href="' . $home . '#contact">যোগাযোগ</a></li>
    </ul>';
}

// Register Customizer
function pb_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('pb_hero_section', array(
        'title' => __('Hero Section', 'political-biography'),
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('pb_hero_title', array(
        'default' => 'ডা: এস. এম. <br><span class="highlight">রফিকুল ইসলাম</span> বাচ্চু',
        'sanitize_callback' => 'wp_kses_post'
    ));
    $wp_customize->add_control('pb_hero_title', array(
        'label' => __('Hero Title', 'political-biography'),
        'section' => 'pb_hero_section',
        'type' => 'textarea'
    ));

    $wp_customize->add_setting('pb_hero_subtitle', array(
        'default' => 'বাংলাদেশ জাতীয়তাবাদী দলের (বিএনপি) একজন নিবেদিতপ্রাণ নেতা এবং গাজীপুরের মানুষের সেবক।',
        'sanitize_callback' => 'sanitize_text_field'
    ));
    $wp_customize->add_control('pb_hero_subtitle', array(
        'label' => __('Hero Subtitle', 'political-biography'),
        'section' => 'pb_hero_section',
        'type' => 'text'
    ));

    // Contact Form Section
    $wp_customize->add_section('pb_contact_section', array(
        'title' => __('Contact Form', 'political-biography'),
        'priority' => 35,
    ));
    $wp_customize->add_setting('pb_contact_shortcode', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post'
    ));
    $wp_customize->add_control('pb_contact_shortcode', array(
        'label' => __('Contact Form Shortcode', 'political-biography'),
        'description' => __('Paste your Contact Form 7 or WPForms shortcode here.', 'political-biography'),
        'section' => 'pb_contact_section',
        'type' => 'text'
    ));

    // Social Media Links
    $wp_customize->add_section('pb_social_section', array(
        'title' => __('Social Media Links', 'political-biography'),
        'priority' => 40,
    ));
    $social_platforms = array(
        'pb_facebook_url' => array('label' => __('Facebook URL', 'political-biography'), 'default' => 'https://www.facebook.com/Dr.Bachchu'),
        'pb_twitter_url'  => array('label' => __('Twitter (X) URL', 'political-biography'), 'default' => '#'),
        'pb_youtube_url'  => array('label' => __('YouTube URL', 'political-biography'), 'default' => '#'),
        'pb_whatsapp_url' => array('label' => __('WhatsApp Link / Number', 'political-biography'), 'default' => '#'),
    );
    foreach ($social_platforms as $id => $info) {
        $wp_customize->add_setting($id, array(
            'default' => $info['default'],
            'sanitize_callback' => 'esc_url_raw'
        ));
        $wp_customize->add_control($id, array(
            'label' => $info['label'],
            'section' => 'pb_social_section',
            'type' => 'url'
        ));
    }

    // Footer Settings
    $wp_customize->add_section('pb_footer_section', array(
        'title' => __('Footer Settings', 'political-biography'),
        'priority' => 45,
    ));
    $wp_customize->add_setting('pb_footer_copyright', array(
        'default' => '© ২০২৬ ডা: এস. এম. রফিকুল ইসলাম বাচ্চু। সর্বস্বত্ব সংরক্ষিত।',
        'sanitize_callback' => 'wp_kses_post'
    ));
    $wp_customize->add_control('pb_footer_copyright', array(
        'label' => __('Copyright Text', 'political-biography'),
        'section' => 'pb_footer_section',
        'type' => 'text'
    ));
}
add_action('customize_register', 'pb_customize_register');

// Register Custom Post Types
function pb_custom_post_types() {
    register_post_type('projects', array(
        'labels' => array(
            'name' => __('Projects', 'political-biography'),
            'singular_name' => __('Project', 'political-biography')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'menu_icon' => 'dashicons-hammer',
    ));
    
    register_post_type('videos', array(
        'labels' => array(
            'name' => __('Videos', 'political-biography'),
            'singular_name' => __('Video', 'political-biography')
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-video-alt3',
    ));
    
    register_post_type('timeline', array(
        'labels' => array(
            'name' => __('Timeline', 'political-biography'),
            'singular_name' => __('Timeline Event', 'political-biography')
        ),
        'public' => true,
        'has_archive' => false,
        'supports' => array('title', 'editor', 'excerpt'),
        'menu_icon' => 'dashicons-clock',
    ));
    
    register_taxonomy('project_category', 'projects', array(
        'labels' => array(
            'name' => __('Project Categories', 'political-biography'),
        ),
        'hierarchical' => true,
        'public' => true,
    ));
}
add_action('init', 'pb_custom_post_types');
?>
<!-- Back to Top Button -->
    <button id="backToTopBtn" class="back-to-top" title="Go to top">
        <i class="fas fa-arrow-up"></i>
    </button>

    <footer class="glass-effect">
        <div class="footer-content">
            <p><?php echo wp_kses_post(get_theme_mod('pb_footer_copyright', '© ২০২৬ ডা: এস. এম. রফিকুল ইসলাম বাচ্চু। সর্বস্বত্ব সংরক্ষিত।')); ?></p>
            <div class="footer-social">
                <a href="<?php echo esc_url(get_theme_mod('pb_facebook_url', 'https://www.facebook.com/Dr.Bachchu')); ?>" target="_blank" title="Facebook" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="<?php echo esc_url(get_theme_mod('pb_twitter_url', '#')); ?>" target="_blank" title="Twitter" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                <a href="<?php echo esc_url(get_theme_mod('pb_youtube_url', '#')); ?>" target="_blank" title="YouTube" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                <a href="<?php echo esc_url(get_theme_mod('pb_whatsapp_url', '#')); ?>" target="_blank" title="WhatsApp" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            </div>
        </div>
    </footer>

    <!-- Leaflet Map JS -->
    
    <!-- Standard Scripts -->
    
    <?php wp_footer(); ?>
</body>

</html>
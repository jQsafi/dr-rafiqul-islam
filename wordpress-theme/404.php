<?php
get_header();
?>

<main class="site-main section-offset" style="min-height: 70vh; display: flex; align-items: center; justify-content: center; padding: 120px 1.5rem 60px;">
    <div class="error-404-box glass-effect" style="max-width: 600px; width: 100%; text-align: center; padding: 3.5rem 2rem; border-radius: 20px; box-shadow: var(--glass-shadow);">
        <div style="font-size: 5rem; font-weight: 800; color: var(--primary); line-height: 1; margin-bottom: 1rem;">৪০৪</div>
        <h1 style="font-size: 1.8rem; color: var(--text-main); margin-bottom: 1rem;">পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1>
        <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.05rem; line-height: 1.6;">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত বা মুছে ফেলা হতে পারে। অনুগ্রহ করে হোমপেজে ফিরে যান।
        </p>
        <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary" style="padding: 0.8rem 2rem; font-size: 1rem; display: inline-flex; align-items: center; gap: 0.5rem;">
            <i class="fas fa-home"></i> হোমপেজে ফিরে যান
        </a>
    </div>
</main>

<?php
get_footer();
?>

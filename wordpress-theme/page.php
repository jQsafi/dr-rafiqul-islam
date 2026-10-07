<?php
get_header();
?>

<main class="site-main section-offset" style="max-width: 900px; margin: 120px auto 60px; padding: 0 1.5rem;">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="single-page-card glass-effect" style="padding: 2.5rem; border-radius: 20px; box-shadow: var(--glass-shadow);">
            <header class="single-page-header" style="margin-bottom: 1.5rem;">
                <h1 style="font-size: 2.2rem; color: var(--text-main); line-height: 1.4; margin-bottom: 1rem;"><?php the_title(); ?></h1>
                <div class="divider" style="width: 60px; height: 3px; background: var(--primary); border-radius: 2px;"></div>
            </header>

            <div class="single-page-content" style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.8;">
                <?php the_content(); ?>
            </div>
        </article>
    <?php endwhile; endif; ?>
</main>

<?php
get_footer();
?>

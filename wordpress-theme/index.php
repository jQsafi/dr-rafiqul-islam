<?php
get_header();
?>

<main class="site-main section-offset" style="max-width: 900px; margin: 120px auto 60px; padding: 0 1.5rem;">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="single-post-card glass-effect" style="padding: 2.5rem; border-radius: 20px; box-shadow: var(--glass-shadow); margin-bottom: 2rem;">
            <header style="margin-bottom: 1.5rem;">
                <h2 style="font-size: 1.8rem; color: var(--text-main); margin-bottom: 0.8rem;">
                    <a href="<?php the_permalink(); ?>" style="color: inherit; text-decoration: none;"><?php the_title(); ?></a>
                </h2>
                <div class="divider" style="width: 50px; height: 3px; background: var(--primary); border-radius: 2px;"></div>
            </header>
            <div style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.8;">
                <?php the_excerpt(); ?>
            </div>
            <div style="margin-top: 1.5rem;">
                <a href="<?php the_permalink(); ?>" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.9rem;">আরও পড়ুন →</a>
            </div>
        </article>
    <?php endwhile; endif; ?>
</main>

<?php
get_footer();
?>
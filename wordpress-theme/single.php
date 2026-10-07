<?php
get_header();
?>

<main class="site-main section-offset" style="max-width: 900px; margin: 120px auto 60px; padding: 0 1.5rem;">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <article class="single-post-card glass-effect" style="padding: 2.5rem; border-radius: 20px; box-shadow: var(--glass-shadow);">
            <?php if (has_post_thumbnail()) : ?>
                <div class="single-post-thumbnail" style="margin-bottom: 2rem; border-radius: 12px; overflow: hidden; max-height: 450px;">
                    <?php the_post_thumbnail('full', array('style' => 'width: 100%; height: auto; object-fit: cover; display: block;')); ?>
                </div>
            <?php endif; ?>

            <header class="single-post-header" style="margin-bottom: 1.5rem;">
                <div class="post-meta" style="color: var(--primary); font-size: 0.95rem; margin-bottom: 0.8rem; display: flex; gap: 1rem; align-items: center;">
                    <span><i class="far fa-calendar-alt"></i> <?php echo get_the_date(); ?></span>
                    <span><i class="far fa-user"></i> <?php the_author(); ?></span>
                </div>
                <h1 style="font-size: 2.2rem; color: var(--text-main); line-height: 1.4; margin-bottom: 1rem;"><?php the_title(); ?></h1>
                <div class="divider" style="width: 60px; height: 3px; background: var(--primary); border-radius: 2px;"></div>
            </header>

            <div class="single-post-content" style="color: var(--text-muted); font-size: 1.1rem; line-height: 1.9;">
                <?php the_content(); ?>
            </div>

            <footer class="single-post-footer" style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn-primary" style="padding: 0.6rem 1.5rem; font-size: 0.95rem;">
                    ← হোমপেজে ফিরে যান
                </a>
                <div class="share-links" style="display: flex; gap: 0.8rem;">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_permalink()); ?>" target="_blank" class="social-icon" title="Share on Facebook" aria-label="Share on Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/intent/tweet?url=<?php echo urlencode(get_permalink()); ?>&text=<?php echo urlencode(get_the_title()); ?>" target="_blank" class="social-icon" title="Share on Twitter" aria-label="Share on Twitter"><i class="fab fa-twitter"></i></a>
                </div>
            </footer>
        </article>
    <?php endwhile; endif; ?>
</main>

<?php
get_footer();
?>

/**
 * BLOG NAVIGATION INJECTOR
 * ========================
 * Reads the current page URL, finds it in BLOG_POSTS (defined in blog-posts.js),
 * and injects prev/next/all-posts navigation into #post-nav-top and #post-nav-bottom.
 *
 * Depends on: blog-posts.js (must be loaded first)
 */

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;

  const currentIndex = BLOG_POSTS.findIndex(post => post.url === currentPath);

  // Not a recognised post page — do nothing
  if (currentIndex === -1) return;

  // Previous = newer post (lower index); Next = older post (higher index)
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  const prevHTML = prevPost
    ? `<a href="${prevPost.url}" class="post__nav-link post__nav-link--prev">
        <span class="post__nav-label">&#8592; Previous</span>
        <span class="post__nav-title">${prevPost.title}</span>
       </a>`
    : `<span class="post__nav-spacer"></span>`;

  const nextHTML = nextPost
    ? `<a href="${nextPost.url}" class="post__nav-link post__nav-link--next">
        <span class="post__nav-label">Next &#8594;</span>
        <span class="post__nav-title">${nextPost.title}</span>
       </a>`
    : `<span class="post__nav-spacer"></span>`;

  const navHTML = `
    ${prevHTML}
    <a href="/blog/" class="btn post__nav-home">All Posts</a>
    ${nextHTML}
  `;

  const topNav = document.getElementById("post-nav-top");
  const bottomNav = document.getElementById("post-nav-bottom");

  if (topNav) topNav.innerHTML = navHTML;
  if (bottomNav) bottomNav.innerHTML = navHTML;
});
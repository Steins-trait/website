/**
 * BLOG POST REGISTRY
 * ==================
 * This is the single source of truth for all blog posts.
 * 
 * TO ADD A NEW POST:
 *   1. Create your HTML file at /blog/posts/postN.html
 *   2. Add a new entry at the TOP of this array, newest posts first
 *   3. Prev/next navigation updates automatically across all posts
 *
 * Order: newest post first (index 0), oldest post last.
 * "Next" navigates toward older posts; "Previous" navigates toward newer posts.
 */

const BLOG_POSTS = [
    {
    title: "Two Designs for a Spine Surgery Challenge",
    url: "/blog/posts/post4.html",
    date: "March 30, 2026",
    tag: "Medical Device Design"
    },
    {
    title: "How I Designed a Custom PEKK Implant",
    url: "/blog/posts/post1.html",
    date: "March 10, 2025",
    tag: "Research"
    },
    {
    title: "Lessons from Collaborative Robotics",
    url: "/blog/posts/post2.html",
    date: "July 5, 2023",
    tag: "Engineering"
    },
    {
    title: "Building a Reflectivity Fixture from Scratch",
    url: "/blog/posts/post3.html",
    date: "February 28, 2021",
    tag: "Engineering"
    },
];
function Blogs(p) {
    console.log('array of blogs', p)
    return p.blogs.map((blog) => {
        return <h1 key={blog.id}>{blog.title} User: {blog.user} Body: {blog.body} {blog.picture} {blog.date}</h1>
    })
}

export default Blogs
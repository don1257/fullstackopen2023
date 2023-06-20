const blogsRouter = require('express').Router()
const Blog = require("../models/blog");
const Comment = require("../models/comment");


const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

// blogsRouter.get('/blogs', async (request, response) => {
//     Blog
//         .find({})
//         .populate('user')
//         .then(blogs => {
//             response.json(blogs)
//         })
// })

// blogsRouter.get("/", async (request, response) => {
//     // const blogs = await Blog.find({}).populate("user");
//     // const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
//     const blogs = await Blog.find({}).populate("user");
//     response.json(blogs);
// });

// blogsRouter.get('/', async (request, response) => {
//     const blogs = await Blog.find({}).populate('comments', { content: 1 });
//     response.json(blogs.map(blog => blog.toJSON()));
// });

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({});
    console.log('Blogs without comments:', blogs);
    const populatedBlogs = await Blog.populate(blogs, { path: 'comments', select: 'content' });
    response.json(populatedBlogs.map(blog => blog.toJSON()));
});

// May need to fix this later
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog.token = getTokenFrom(request)

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.username) {
        return response.status(401).json({ error: 'token invalid' })
    }

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

blogsRouter.delete('/:id', (request, response, next) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
    const body = request.body

    const note = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id);
        if (!blog) {
            return response.status(404).json({ error: 'blog not found' });
        }

        const comment = new Comment({
            content: request.body.content,
            blog: blog._id
        });

        const savedComment = await comment.save();
        blog.comments = blog.comments.concat(savedComment._id);
        await blog.save();

        response.status(201).json(savedComment);
    } catch (error) {
        next(error);
    }
});

module.exports = blogsRouter

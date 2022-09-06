import React, { useState } from "react"


const IndividualBlog = (props) => {
    const blog = props.blog
    //const [blogObject, setBlogObject] = useState(blog)
    const [newComment, setNewComment] = useState('')

    const handleCommentChange = (event) => {
        setNewComment(event.target.value)
        console.log(newComment)
    }

    const addComment = () => {
        const updatedBlog = ({
            ...blog,
            comments: blog.comments.concat([newComment])
        })
        props.updateBlog(updatedBlog)
        //setBlogObject(updatedBlog)
    }

    return (
        <div>
            <h3><strong>{blog.title} by {blog.author}</strong></h3>
            <p><strong>URL</strong>: {blog.url}</p>
            <p><strong>Likes</strong>: {blog.likes}</p>
            <p><strong>Added by</strong> {blog.user.username}</p>
            <form onSubmit={addComment}>
                <div>
                    Comment: <input id='comment' value={newComment}
                        onChange={handleCommentChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}


export default IndividualBlog
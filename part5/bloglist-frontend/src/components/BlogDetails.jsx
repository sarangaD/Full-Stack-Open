import React from 'react'
import blogService from '../services/blogs'
import { useState, useEffect } from 'react'

const BlogDetails = ({ blogDetails }) => {
    const [count, setLikes] = useState(0)
    const [userName, setUsername] = useState(0)

    useEffect(() => {
        setLikes(blogDetails.likes)
    }, [blogDetails])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            setUsername(username)
        }
    }, [])

    const buttonStyle = {
        color: 'red',
    }

    const handleLike = () => {
        const updatedBlog = {
            title: blogDetails.title,
            author: blogDetails.author,
            likes: count + 1,
            url: blogDetails.url
        }

        blogService
            .update(blogDetails.id, updatedBlog)
            .then(returnedBlog => {
                setLikes(returnedBlog.likes)
            })
    }

    return (
        <div>
            <p>{blogDetails.title}</p>
            <p><a href={blogDetails.url}>{blogDetails.url}</a></p>
            <p>like {count} <button onClick={handleLike}>like</button></p>
            <p>{blogDetails.author}</p>
            <p ><button style={buttonStyle} onClick={handleLike}>delete</button></p>
        </div>
    )
}

export default BlogDetails
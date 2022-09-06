/* eslint-disable */
import React from "react";
import {Link} from 'react-router-dom'


const Profile = (props) => {
    const user = props.user

    return (
        <div>
            Blogs Linked by {user.username}
            <ul>
                {user.blogs.map(blog => {
                    return (<li>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                    </li>
                    )
                })}
            </ul>
        </div >
    )
}

export default Profile
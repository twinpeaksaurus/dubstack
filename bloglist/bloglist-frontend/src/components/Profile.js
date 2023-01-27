/* eslint-disable */
import React from "react";
import {Link} from 'react-router-dom'


const Profile = (props) => {
    const user = props.user

    return (
        <div>
            Posts by {user.name}
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
            Categories:

            <br />
            Description:
        </div >
    )
}

export default Profile
/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'
//import PropTypes from 'prop-types'

const User = (props) => {
    const user = props.user
    //const displayMessage = `${user.username}:         ${user.blogs.length}`
    return (
        <div>
            <p><Link to={`/users/${user.id}`}>
                {user.name}'s Blog
            </Link>
                : {'         '} {user.blogs.length}</p>
        </div>
    )
}

export default User
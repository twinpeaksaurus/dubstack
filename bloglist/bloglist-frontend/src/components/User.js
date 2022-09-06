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
                {user.username}
            </Link>
                : {'         '} {user.blogs.length}</p>
        </div>
    )
}


/* DRAFT OF LINKS AND REACT ROUTING

<Link to {`/users/${user.id}`}>
{user.username}
</Link>

*/
export default User
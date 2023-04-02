import React from 'react'
import './Logo.css'
import {Link} from 'react-router-dom'

export default props => 
<aside className="logo">
    <Link to="/home" className="logo">
        <img  alt="Logo" />
    </Link>
</aside>
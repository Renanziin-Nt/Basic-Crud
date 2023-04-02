import React from 'react'
import './Header'
import './Header.css'

export default props => 
<header className="header d-none d-sm-flex flex-colomn">
    <h1 className="mt-3">
        <i className={`fa fa-${props.icon}`}></i>{props.title}
    </h1>
    <p className="mt-9 lead text-muted">{props.subtitle}</p>
</header>
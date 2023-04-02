import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

import Logo from '../components/templates/Logo'
import Nav from '../components/templates/Nav'
import Footer from '../components/templates/Footer'
import Main from '../components/templates/Main'

export default props =>
<BrowserRouter>
<div className="app">
    <Logo></Logo>
    <Nav></Nav>
    <Main></Main>
    <Routes></Routes>
    <Footer></Footer>
</div>
</BrowserRouter>
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/footer'

const Layout = ({children}) => {
  return (
    <div>
        <Navbar/>
        <div >
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Layout
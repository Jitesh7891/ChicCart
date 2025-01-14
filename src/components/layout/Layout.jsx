import React from 'react'
import Navbar from '../navbar/Navbar'
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
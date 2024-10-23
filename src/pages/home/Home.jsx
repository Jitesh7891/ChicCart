
import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'

const Home = (props) => {
  const context=useContext(MyContext)
  console.log(context);
  
  return (
        <div>
            <HeroSection/>
            <Filter/>
        </div>
  )
}

export default Home
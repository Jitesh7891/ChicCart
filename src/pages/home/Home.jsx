
import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext'
import HeroSection from '../../components/heroSection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productcard/ProductCard'
import Testimonial from '../../components/testinomial/Testinomial'

const Home = (props) => {  
  
  const context=useContext(MyContext)
  
  return (
        <Layout>
            <HeroSection/>
            <Filter/>
            <ProductCard/>
            <Testimonial/>
        </Layout>
  )
}

export default Home

import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import MyContext from '../../context/data/MyContext'

const Home = (props) => {
  const context=useContext(MyContext)
  console.log(context);
  
  return (
        <div>
            Home
        </div>
  )
}

export default Home
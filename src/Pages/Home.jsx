import React from 'react'
import Features from '../Components/Features'
import Trending from '../Components/Trending'
import CoinsArray from '../Components/CoinsArray'
import Instructions from '../Components/Instructions'

const Home = () => {
  return (
    <>
       <Features/>
       <Instructions />
      <Trending/>
       <CoinsArray/> 
      
    </>
  )
}

export default Home

import React from 'react'
import Random10 from './Random10'
import SearchRecipes from './SearchRecipes'
import SlideShow from './SlideShow'
import Footer from './Footer'

function Home() {
  return (
    <div>
     

     {/* <SlideShow/> */}
     <div className='mb-4'></div>
        {/* <hr /> */}
        <SearchRecipes/>
        <hr />

        <h2 className='mt-5 mb-5'>Confuse Find Here</h2>
        <Random10/>
    </div>
  )
}

export default Home
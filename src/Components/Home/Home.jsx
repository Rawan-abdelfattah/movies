import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Mediaitem from '../Mediaitem/Mediaitem'

export default function Home() {
  const [movie, setMovie] = useState([])
  const [tv, seTtv] = useState([])
  const [person, setPerson] = useState([])

  async function getTrending(mediaitem,callback){
    let { data }=await axios.get(`https://api.themoviedb.org/3/trending/${mediaitem}/week?api_key=5f84ccbcc40586ca7b8b12d3d57d7528`)
    callback(data.results)
    console.log(data.results);

  }
  useEffect(() => {
    getTrending('movie' , setMovie)
    getTrending('tv' , seTtv)
    getTrending('person' , setPerson)
  }, [])
  
  return (
    <>
    <div className="container pt-4 ">
      <div className="row py-4 ">
        <div className="col-md-4 col-12 d-flex align-items-center w-25 ">
          <div>
                      <h2 className='text-white s-before'><em>Trending</em> </h2>
          <h2 className='text-white'><em>Movies</em></h2>
          <h2 className='text-white'><em>Right Now</em></h2>
          <h6 className='text-secondary lg-after'>Top Trending Movies by Week</h6>
          </div>

        </div>
              {movie.map((item ,index)=><Mediaitem item ={item}/>)}

      </div>
    </div>

    <div className="container pt-4 ">
      <div className="row py-4 ">
        <div className="col-md-4 col-12 d-flex align-items-center   w-25">
          <div>
                      <h2 className='text-white s-before'><em>Trending</em> </h2>
          <h2 className='text-white'><em>TV</em></h2>
          <h2 className='text-white'><em>Right Now</em></h2>
          <h6 className='text-secondary lg-after'>Top Trending Movies by Week</h6>
          </div>

        </div>
              {tv.map((item ,index)=><Mediaitem item ={item}/>)}

      </div>
    </div>

    <div className="container pt-4 ">
      <div className="row py-4 ">
        <div className="col-md-4 col-12 d-flex align-items-center w-25 ">
          <div>
                      <h2 className='text-white s-before'><em>Trending</em> </h2>
          <h2 className='text-white'><em>Movies</em></h2>
          <h2 className='text-white'><em>Right Now</em></h2>
          <h6 className='text-secondary lg-after'>Top Trending Movies by Week</h6>
          </div>

        </div>
              {person.map((item ,index)=><Mediaitem item ={item}/>)}

      </div>
    </div>
    </>
  )
}

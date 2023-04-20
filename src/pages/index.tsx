import Head from "next/head"
import Image from "next/image"
// import React from "react"
import { weatherType, weatherData } from "@/libs/weatherType"
import { unsplashType } from "@/libs/unsplashType"
import { FaSearch } from "react-icons/fa"
import { toast } from "react-hot-toast"

import { useEffect, useState } from "react"

const styles = {
  searchContainer: 'flex justify-center w-full mt-4 my-2 h-12 items-center',
  searchInput: 'flex-1 max-w-[50ch] h-full bg-white ml-10 text-center rounded-lg outline-none border-4 border-black',
  searchBtn: 'flex items-center justify-center w-12 h-full text-2xl text-black font-semibold active:scale-90  duration-200',
  // bgImg: 'max-w-[30ch] mx-auto justify-center items-center rounded-lg shadow-md',
  bodyContainer: 'flex flex-col',
  weatherContainer: 'flex flex-col ml-10 max-w-[20ch] h-full',
  weatherTitle: 'text-4xl mt-4 font-bold border-4 text-center p-2 rounded-lg border-black ',
  weatherContent: 'first:mt-4 text-xl font-semibold',
  // weatherContainer: 'flex flex-col ml-10 max-w-[20ch] h-full mt-4',
  gradientColor:'hover:scale-110  hover:cursor-pointer hover:bg-gradient-to-br  hover:from-zinc-400 hover:to-sky-200 transform-color duration-500',

}

export default function Home({ data }: weatherData) {

  //weather data
  const [weatherData, setweatherData] = useState<weatherType>(data)
  const [search, setSearch] = useState(weatherData.name)
  const [loading, setLoading] = useState(false)


  //unplash picture data 
  const [unsplash, setUnsplash] = useState<unsplashType>()

  const handleSearchClick = async () => {
    setLoading(true);
    if (!weatherData.name && !loading) {
      setLoading(false);
      return;
    }
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
    try {
      const res = await fetch(weatherUrl);
      const data = await res.json() as weatherType;
      //To convert Kelvin temperature to Celsius, you can use the following formula: Celsius = Kelvin - 273.15
      const celsiusTemperature = Number((data.main.temp - 273.15).toFixed(2))
      const celsiusFeelsLike = Number((data.main.feels_like - 273.15).toFixed(2))
      const celsiusMax = Number((data.main.temp_max - 273.15).toFixed(2))
      const celsiusMin = Number((data.main.temp_min - 273.15).toFixed(2))
      data.main.temp = celsiusTemperature
      data.main.feels_like = celsiusFeelsLike
      data.main.temp_max = celsiusMax
      data.main.temp_min = celsiusMin

      console.log(data)
      setweatherData(data)

    } catch (error) {
      console.error(error);
      toast.error('City not found.', { duration: 2000, position: 'bottom-center' })
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleSearchClick()
      }
    })
  }, [])


//jump to the page of the city
  const handleCityClick = async () => {

    window.open(`https://unsplash.com/s/photos/${weatherData.name}`, '_blank')
  }


 


  // const getUnsplashData = async () => {
  //   // setLoading(true);
  //   const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`

  //   try {
  //     const res = await fetch(unsplashUrl)
  //     const data = await res.json() as unsplashType

  //     if (data.results.length === 0) {
  //       return
  //     }

  //     console.log('unsplash')
  //     console.log(data)
  //     setUnsplash(data)

  //   } catch (error) {
  //     console.error(error)
  //   } finally {
  //     // setLoading(false)
  //   }

  // }


  return (
    <div>
      <Head>
        <meta name="description" content="A simple project for weather." />
        <title>Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.searchContainer}>
        <input className={styles.searchInput} type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className={styles.searchBtn} title="search" type="button" onClick={handleSearchClick}  >
          <FaSearch />
        </button>
      </div>

      <div className={styles.bodyContainer} >
        {/* temperature */}
        <div className={styles.weatherContainer} >
          <button type="button" className={`${styles.weatherTitle}${styles.gradientColor}`} onClick={handleCityClick}>{weatherData.name}</button>
          <p className={styles.weatherContent}>Temprature: {weatherData.main.temp}°C</p>
          <p className={styles.weatherContent}>Feels like: {weatherData.main.feels_like}°C</p>
          <p className={styles.weatherContent}>Max: {weatherData.main.temp_max}°C</p>
          <p className={styles.weatherContent}>Min: {weatherData.main.temp_min}°C</p>
          <p className={styles.weatherContent}>Humidity: {weatherData.main.humidity}%</p>
        </div>
        {/* weather */}
        <div className={styles.weatherContainer}>
          <h1 className={styles.weatherTitle}>Weather</h1>
          <p className={styles.weatherContent}>{weatherData.weather[0].main}</p>
          <p className={styles.weatherContent}>{weatherData.weather[0].description}</p>
        </div>
        {/* wind */}
        <div className={styles.weatherContainer}>
          <h1 className={styles.weatherTitle}>Wind</h1>
          <p className={styles.weatherContent}>Speed: {weatherData.wind.speed}m/s</p>
          <p className={styles.weatherContent}>Deg: {weatherData.wind.deg}°</p>
          <p className={styles.weatherContent}>gust: {weatherData.wind.gust}meter/sec</p>
        </div>
      </div>


    </div>
  )
}


// api



// default data
// export async function getServerSideProps() {

//   const defaultCity = 'Tokyo'
//   const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`

//   const res = await fetch(weatherUrl)
//   const data = await res.json() as weatherType
//   console.log(data)

//   return {
//     props: { data }
//   }

// }


export async function getServerSideProps() {

  const defaultCity = 'Tokyo'
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`

  const res = await fetch(weatherUrl)
  const data = await res.json() as weatherType
  const celsiusTemperature = Number((data.main.temp - 273.15).toFixed(2))
  const celsiusFeelsLike = Number((data.main.feels_like - 273.15).toFixed(2))
  const celsiusMax = Number((data.main.temp_max - 273.15).toFixed(2))
  const celsiusMin = Number((data.main.temp_min - 273.15).toFixed(2))
  data.main.temp = celsiusTemperature
  data.main.feels_like = celsiusFeelsLike
  data.main.temp_max = celsiusMax
  data.main.temp_min = celsiusMin
  console.log(data)

  return {
    props: { data }
  }


}
import React, { useState, useEffect } from 'react'
import './style.css'
import UserWeather from './userWeather';

const Temp = () => {
    const [inputData, setInputData] = useState('Pune');
    const [userWeather, setUserWeather] = useState({});
    
    const fetchData = async ()=>{
       try {
           const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputData}&units=metric&appid=6d171cecb906adb987c32a4161a64c11`;
           let res = await fetch(url);
           let data = await res.json();
           const {temp, humidity, pressure} = data.main;
           const {main: type} = data.weather[0];
           const {name} = data;
           const {country, sunset} = data.sys;
           const {speed} = data.wind;

           const userInputTempInfo = {
               temp,
               humidity,
               pressure,
               type,
               name,
               country,
               sunset,
               speed
           }
           console.log(userInputTempInfo);
           setUserWeather(userInputTempInfo);
           
       } catch (error) {
           console.log(error)
       }
    }
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
           <div className='wrap'>
              <div className='search'>
                 <input type='search' placeholder='search...' autoFocus id='search' className='searchTerm' 
                 value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
                 <button className='searchButton' type='button' onClick={fetchData}>Search</button>
              </div>
           </div> 
           <UserWeather userWeather={userWeather}/>
           
        </>
    )
}

export default Temp

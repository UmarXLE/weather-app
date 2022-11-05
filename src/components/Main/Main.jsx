import React ,{useState , useEffect} from 'react';
import styles from './main.module.scss'
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { style } from '@mui/system';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Main = () => {
    const [ cityName , setCityName ] = useState('')
    const [ weatherData , setWeatherData ] = useState({})
    const [ info , setInfo ] = useState(false)


    const URL = `https://weatherapi-com.p.rapidapi.com/current.json`

    const getWeather = ( cityName ) => {  
    return axios.get(URL , {
        params:{q:cityName },
        headers: {
            'X-RapidAPI-Key': '2ab817f192msh0b72df4eda4d031p126756jsnd506c384a88c',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
          }
    })
}


    const getCityWeather = ( e ) => {
        e.preventDefault()
        getWeather(cityName)
            .then(res => {
                setWeatherData(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
}



    return (
        <div className={styles.mainWrapper}>
<form onSubmit={getCityWeather} >
                <h2 className={styles.title}>Weather App</h2>
                <TextField  
                id="outlined-basic" 
                // color="white"
                label="Outlined" 
                variant="outlined" 
                type="text"
                // color='succes'
                value={  cityName }
                onChange={e => setCityName( e.target.value )} 
                />
                <Button 
                variant="outlined" 
                href="#outlined-buttons"
                color="info"
            
                >
                     Узнать
                </Button>
            </form>


            <div  className={styles.cityInfo}>
                <p>Город : {weatherData.location?.name} </p>
                <p>Страна : {weatherData.location?.country}  </p>
                <p>Градусы : {weatherData.current?.temp_c}  </p>
                <div className="weatherStatus">
                    <p>погода : {weatherData.current?.condition.text}</p>
                    <img src={weatherData.current?.condition.icon} alt="" />
                </div>
            </div>
           
           

            {/*  */}

        </div>
    );
};

export default Main;
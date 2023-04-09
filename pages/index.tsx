import React, { useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";
import Image from "next/legacy/image";
import Weather from "@/components/Weather";
import Head from "next/head";
import IWeatherData from "@/types/IWeatherData";
import Spinner from "@/components/Spinner";

const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<IWeatherData>({} as IWeatherData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;

  const getWeather = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.get(url).then((res) => {
        //console.log(res.data);
        setWeather(res.data);
        setLoading(false);
        setCity("");
        setError("");
      });
      
    } catch (err) {
      //console.log(err);
      setError("Something went wrong / City Not Found...");
      setLoading(false);
    }
  };
  //console.log(error);
    return (
      <div>
        <Head>
          <title>Weather - Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* BackgroundImage */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
        <Image
          src="https://images.unsplash.com/photo-1572204292164-b35ba943fca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80"
          className="object-cover"
          layout="fill"
        />

        {/* Search City */}
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
          <form
            onSubmit={getWeather}
            className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <div>
              <input
                className="bg-transparent border-none text-white focus:outline-none text-2xl"
                placeholder="Search City"
                type="text"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                value={city}
              />
            </div>
            <button type="submit">
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        {
          loading &&(
            <div className="w-[100vw] flex justify-center mt-5">
              <Spinner />
            </div>

          ) 
        }
        {
          error && (
            <div className="w-[100vw] flex justify-center mt-5 relative">
              <p className="text-xl p-3 rounded-md font-semibold bg-black text-red-500 opacity-75">{error}</p>
            </div>
          )
        }
        {/* Display Weather Data  */}
        {weather.main && <Weather data={weather} />}
      </div>
    );
  }

export default Home;

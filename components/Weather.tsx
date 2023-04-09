import Image from "next/legacy/image";
import React, { useState } from "react";
import { TbLetterK, TbTemperatureCelsius } from "react-icons/tb";

interface IProps {
  data: {
    name: string;
    main: {
      feels_like: number;
      temp: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
  };
}

const Weather = ({ data }: IProps) => {
  const { temp, feels_like } = data.main;

  const [temperature, setTemperature] = useState<Number>(temp);
  const [feelsLike, setFeelsLike] = useState<Number>(feels_like);

  const celsius = temp - 273.15;
  const celsiusFeelsLike = feels_like - 273.15;
  const kelvin = temp;
  const kelvinFeelsLike = feels_like;

  const handleChange = () => {
    if (temperature == celsius) {
      setTemperature(kelvin);
      setFeelsLike(kelvinFeelsLike);
    } else {
      setTemperature(celsius);
      setFeelsLike(celsiusFeelsLike);
    }
  };

  // setCelsius(fahrenheit);
  // console.log(celsius);

  console.log(data);
  return (
    <div className="relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10">
      {/* Top */}
      <div className="relative flex justify-between pt-12">
        <div className="flex flex-col items-center">
          <Image
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt="/"
            width="100"
            height="100"
          />
          <p className="text-2xl">{data.weather[0].main}</p>
        </div>
        <p className="text-9xl">
          {temperature.toFixed(0)}
          <button onClick={handleChange}>
            {temperature == celsius ? (
              <TbTemperatureCelsius size={120} />
            ) : (
              <div className="flex px-0 py-0">
                <p className=" ml-[-10px]">&#176;</p>
                <TbLetterK className="ml-[-20px] mt-4" size={100} />
              </div>
            )}
          </button>
        </p>
      </div>
      {/* Bottom */}

      <div className="bg-black/50 relative p-8 rounded-md">
        <p className="text-2xl text-center pb-6">Weather in {data.name}</p>
        <div className="flex justify-between text-center">
          <div>
            <p className="font-bold text-2xl">{feelsLike.toFixed(0)}&#176;</p>
            <p className="text-xl">Feels Like</p>
          </div>
          <div>
            <p className="font-bold text-2xl">{data.main.humidity}%</p>
            <p className="text-xl">Humidity</p>
          </div>
          <div>
            <p className="font-bold text-2xl">
              {data.wind.speed.toFixed(0)} MPH
            </p>
            <p className="text-xl">Winds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;

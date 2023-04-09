



export default interface IWeatherData {
  name: string;
    main: {
      temp: number;
      feels_like: number;
      cod?: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    }
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
}
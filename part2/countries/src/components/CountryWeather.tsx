import { Country } from "../types";

interface CountryWeatherProps {
  country: Country;
}

export default function CountryWeather({ country }: CountryWeatherProps) {
  const getUrl = () => {
    const [lat, lng] = country.capitalInfo.latlng;
    return `${import.meta.env.VITE_WEATHER_URL}/~${lat},${lng}.png?M&0&Q`;
  };

  return (
    <div>
      <h3>Weather in {country.capital[0]}</h3>
      <div
        style={{
          backgroundColor: "black",
          padding: "1em",
          width: "fit-content",
        }}
      >
        <img src={getUrl()} alt="" />
      </div>
    </div>
  );
}

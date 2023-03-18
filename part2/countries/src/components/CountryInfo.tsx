import type { Country } from "../types";

interface CountryInfoProps {
  country: Country;
}

export default function CountryInfo({ country }: CountryInfoProps) {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <ul>
        {country.capital.map((capital) => (
          <li key={capital}>capital {capital}</li>
        ))}
        <li>area {country.area}</li>
      </ul>
      <h4>languages:</h4>
      <ul>
        {Object.entries(country.languages).map((language) => (
          <li key={language[0]}>{language[1]}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`${country.name.common} flag`}
        style={{ width: "200px" }}
      />
    </div>
  );
}

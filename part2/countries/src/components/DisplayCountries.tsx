import { useEffect, useState } from "react";
import type { Country } from "../types";
import CountryInfo from "./CountryInfo";
import CountryWeather from "./CountryWeather";

interface DisplayCountriesProps {
  countries: Country[];
}

export function DisplayCountries({ countries }: DisplayCountriesProps) {
  const [show, setShow] = useState<Country>();

  useEffect(() => {
    setShow(undefined);
  }, [countries]);

  if (countries.length === 1) {
    return (
      <div>
        <CountryInfo country={countries[0]} />
        <CountryWeather country={countries[0]} />
      </div>
    );
  }

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  return (
    <div>
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>
            {country.name.common}{" "}
            <button type="button" onClick={() => setShow(country)}>
              show
            </button>
          </li>
        ))}
      </ul>
      {show ? <CountryInfo country={show} /> : <></>}
    </div>
  );
}

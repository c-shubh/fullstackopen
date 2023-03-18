import { useEffect, useState } from "react";
import type { Country } from "../types";
import CountryInfo from "./CountryInfo";

interface DisplayCountriesProps {
  countries: Country[];
}

export function DisplayCountries({ countries }: DisplayCountriesProps) {
  const [show, setShow] = useState<Country>();

  useEffect(() => {
    setShow(undefined);
  }, [countries]);

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
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

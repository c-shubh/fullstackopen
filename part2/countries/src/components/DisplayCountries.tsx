import type { Country } from "../types";
import CountryInfo from "./CountryInfo";

interface DisplayCountriesProps {
  countries: Country[];
}

export function DisplayCountries({ countries }: DisplayCountriesProps) {
  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }

  if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
}

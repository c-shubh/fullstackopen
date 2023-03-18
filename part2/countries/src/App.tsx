import { ChangeEvent, useEffect, useState } from "react";
import { DisplayCountries } from "./components/DisplayCountries";
import Loading from "./components/Loading";
import type { Country } from "./types";

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Country[]>([]);
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/all`)
      .then((res) => res.json())
      .then((jsonData) => {
        setCountriesData(jsonData);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchText(text);

    if (countriesData) {
      const res = countriesData.filter((country: Country) => {
        const commonName: string = country.name.common;
        return commonName.toLowerCase().includes(text.toLowerCase());
      });
      setSearchResults(res);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="search-input">find countries</label>{" "}
        <input
          type="text"
          name="search-input"
          id="search-input"
          value={searchText}
          onChange={handleSearch}
          autoFocus
        />
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <DisplayCountries countries={searchResults} />
        )}
      </div>
    </div>
  );
}

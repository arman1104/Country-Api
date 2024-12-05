import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null); // For API data
  const [country, setCountry] = useState("india"); // For user input
  const [error, setError] = useState(""); // For error messages

  // Fetch API based on country name
  const fetchApi = (countryName) => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData[0]);
        setError(""); // Clear error on success
      })
      .catch(() => {
        setData(null); // Reset data if the country is not found
        setError("Country not found. Please check the name.");
      });
  };

  // Fetch data when the component loads or country changes
  useEffect(() => {
    fetchApi(country);
  }, [country]);

  // Handle input change
  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={country}
        onChange={handleChange}
        placeholder="Enter country name"
      />

      {error && <p className="error">{error}</p>}

      {data ? (
        <div className="container">
          <img src={data.flags.png} alt={`${data.name.common} flag`} />
          <h1>
            {data.name.common}{" "}
            <span style={{ color: "orangered" }}>({data.capital})</span>
          </h1>
          <h3>{data.region}</h3>
          <div className="para-item-container">
            <p>
              👫 <span>{data.population.toLocaleString()} people</span>
            </p>
            <p>
              🗣 <span>{Object.values(data.languages).join(", ")}</span>
            </p>
            <p>
              💰 <span>{Object.values(data.currencies)[0].name}</span>
            </p>
          </div>
        </div>
      ) : (
        !error && <p className="loading">Loading...</p>
      )}
    </>
  );
}

export default App;

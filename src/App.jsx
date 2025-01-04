import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import "./App.css";

function App() {
  const [data, setData] = useState(null); // For API data
  const [country, setCountry] = useState(""); // For user input
  const [error, setError] = useState(""); // For error messages

  const handleChange = (event) => {
    // setCountry(event.target.value);
    const userInput = event.target.value;
    setCountry(userInput);

    // If the input is cleared, clear the data and show a message
    if (userInput.trim() === "") {
      setError("Please enter a country name");
      setData(null); // Clear the displayed data
    } else {
      setError(""); // Clear error if the input is not empty
    }
  };

  const fetchApi = (countryName) => {
    const trimmedName = countryName.trim(); // Remove leading and trailing spaces

    if (trimmedName === "") {
      setError("Please enter a country name");
      setData(null); // Clear any previous data
      return; // Stop further execution
    }

    fetch(`https://restcountries.com/v3.1/name/${trimmedName}?fullText=true`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData[0]); // Update data
        setError(""); // Clear error on success
      })
      .catch(() => {
        setData(null); // Clear data if not found
        setError("Country not found. Please check the name.");
      });
  };

  // Fetch data when the component loads or country changes
  useEffect(() => {
    // fetchApi("India");
    fetchApi("");
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="input-container">
          <input
            type="text"
            value={country}
            onChange={handleChange}
            placeholder="Enter country name"
          />
          <Search className="search-icon" onClick={() => fetchApi(country)} />
        </div>

        {error && <p className="error">{error}</p>}

        {data ? (
          <div className="container">
            <img src={data.flags.png} alt={`${data.name.common} flag`} />
            <h1>
              {data.name.common}{" "}
              <span className="capital">({data.capital})</span>
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
      </div>
    </>
  );
}

export default App;

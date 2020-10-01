import React, { useState } from "react";
import {
  GoogleMap,
  DistanceMatrixService,
  LoadScript,
} from "@react-google-maps/api";
import Styles from "./zipform.module.scss";
const mykey = process.env.development.GOOGLE_API_KEY;
console.log(mykey);
const Zips = () => {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("driving");
  const [origin, setOrigin] = useState("24138");
  const [destination, setDestination] = useState("90210");
  const API_KEY = process.env.GOOGLE_API_KEY;
  let finalDestinations = 24138;
  let finalOrigins = 90210;

  const handleClick = (e) => {
    e.preventDefault();
    finalOrigins = origin;
    finalDestinations = destination;
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id == "origin") {
      setOrigin(e.target.value);
    }
    if (e.target.id == "destination") {
      setDestination(e.target.value);
    }
    // `set${e.target.id}`(e.target.value);
  };

  const containerStyle = {
    width: "400px",
    height: "400px",
    margin: "0 auto",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  return (
    <div>
      <section className={Styles.myForm}>
        <h1>Zip code to zip code(s) driving distance(s)</h1>
        <div className={Styles.flex}>
          <div className={Styles.origin}>
            <label>Origin Zip</label>
            <br />
            <input
              id="origin"
              className="formControl"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className={Styles.origin}>
            <label htmlFor="DESTINATION">Destination Zip</label>
            <br />
            <input
              id="destination"
              className="formControl"
              type="text"
              onChange={handleChange}
            />
          </div>
          <button className={Styles.button} type="submit" onClick={handleClick}>
            Check Distance
          </button>
        </div>
      </section>

      <div className="mapCon">
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <DistanceMatrixService
              options={{
                destinations: [{ finalDestinations }],
                origins: [{ finalOrigins }],
                travelMode: "DRIVING",
              }}
              callback={(response) => {
                console.log(response);
              }}
            />
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Zips;

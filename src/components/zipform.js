import React, { useState } from "react";
import {
  GoogleMap,
  DistanceMatrixService,
  LoadScript,
} from "@react-google-maps/api";
import Styles from "./zipform.module.scss";

const mapStyles = require("./GoogleMapStyles.json");

const mykey = process.env.REACT_APP_KEY;
const Zips = () => {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("driving");
  const [origin, setOrigin] = useState("24138");
  const [dest, setDest] = useState("90210");
  //const API_KEY = process.env.GOOGLE_API_KEY;
  let finalDest = "24138";
  let finalOrigin = "22003, 20120";

  const handleClick = (e) => {
    e.preventDefault();
    finalOrigin = origin;
    finalDest = dest;
  };

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id == "origin") {
      setOrigin(e.target.value);
    }
    if (e.target.id == "dest") {
      setDest(e.target.value);
    }
    // `set${e.target.id}`(e.target.value);
  };

  const containerStyle = {
    width: "100%",
    height: "500px",
    margin: "0 auto",
    elementType: "geometry",
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
            <label>Destination Zip</label>
            <br />
            <input
              id="dest"
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
        <LoadScript googleMapsApiKey={mykey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            defaultOptions={{
              styles: mapStyles,
            }}
          >
            {/* Child components, such as markers, info windows, etc. */}

            <DistanceMatrixService
              options={{
                destinations: [finalDest],
                origins: [finalOrigin],
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

import React, { useState } from "react";
import {
  GoogleMap,
  DistanceMatrixService,
  LoadScript,
} from "@react-google-maps/api";
import Styles from "./zipform.module.scss";

const Zips = () => {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("driving");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const API_KEY = process.env.GOOGLE_API_KEY;

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
            <label htmlFor="ORIGIN">Origin Zip</label>
            <br />
            <input
              id="ORIGIN"
              className="formControl"
              type="text"
              useRef={origin}
            />
          </div>
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
            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Zips;

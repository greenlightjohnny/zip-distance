import React, { useState } from "react";
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import Styles from "./zipform.module.scss";

const zips = () => {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("driving");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  return (
    <div>
      <section className={Styles.myForm}>
        <h1>Ayyyy</h1>
      </section>

      <div className="map-container">
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          options={options}
        >
          <DistanceMatrixService
            options={{
              destinations: this.state.destination,
              origins: this.state.origin,
              travelMode: this.state.travelMode,
            }}
            callback={this.distanceCallback}
          />
        </GoogleMap>
      </div>
    </div>
  );
};

export default zips;

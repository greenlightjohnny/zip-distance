import React, { useEffect } from "react";

import {
  GoogleMap,
  DistanceMatrixService,
  LoadScript,
} from "@react-google-maps/api";

const LoadMaps = (props) => {
  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const mapContainerStyle = {
    height: "50vh",
    width: "100%",
  };

  return (
    <section className="map">
      <div className="map-container">
        <LoadScript googleMapsApiKey="AIzaSyCfo56YNbOeY5A_rLLPSHjNaZR_SzbdNvQ">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
            //mapTypeId="a8f4c120392db471"
          >
            {/* Child components, such as markers, info windows, etc. */}
            {zipsFill2 ? distMat : null}

            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    </section>
  );
};

export default LoadMaps;

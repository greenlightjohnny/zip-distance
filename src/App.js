import React, { useState, useEffect, useRef } from "react";

import {
  GoogleMap,
  DistanceMatrixService,
  LoadScript,
} from "@react-google-maps/api";
import Styles from "./components/zipform.module.scss";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
//import LoadMaps from "./components/loadmap"

//const mapStyles = require("./GoogleMapStyles.json");\
//import Yack from "./GoogleMapStyles.json";
//console.log(mapStyles);
const center = {
  lat: -3.745,
  lng: -38.523,
};
const mapContainerStyle = {
  height: "50vh",
  width: "100%",
};

const App = () => {
  const [map, setMap] = useState(null);
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("driving");
  const [origin, setOrigin] = useState("24138");
  const [dest, setDest] = useState("90210");
  const [renderMap, setRenderMap] = useState(false);
  const [shouldWe, setShouldWe] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [rData, setRData] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [change, setChange] = useState(false);
  const [control, setControl] = useState(false);
  //const API_KEY = process.env.GOOGLE_API_KEY;
  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);
  const mykey = process.env.REACT_APP_KEY;
  const initialRender = useRef(true);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Clicked");
    console.log(rData);
    setControl(true);
  };
  ////////////////////////
  //////////////////////////
  const distanceCallback = (response) => {
    console.log("distcallbackcalled");
    console.log("distcall res", response);

    if (response !== null) {
      if (
        response.destinationAddresses[0] !== "" &&
        response.originAddresses[0] !== ""
      ) {
        console.log("res was okkkk");
        setRData(response.originAddresses);
      } else {
        console.log("response: error? ", response);
      }
    }
    setControl(false);
  };
  let loadMe = false;
  //console.log(initialRender.current);
  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //   } else {
  //     console.log("yeppp");
  //     loadMe = true;
  //     setShouldWe(true);
  //     setChange(true);
  //   }

  //   console.log(loadMe);
  // }, [renderMap]);

  const dataArray = (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: 400, width: 600, margin: `0 auto` }}
    >
      <AgGridReact rowData={rowData}>
        <AgGridColumn field="make" sortable={true}></AgGridColumn>
        <AgGridColumn field="model" sortable={true}></AgGridColumn>
        <AgGridColumn field="price" sortable={true}></AgGridColumn>
      </AgGridReact>
    </div>
  );

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id === "origin") {
      setOrigin(e.target.value);
    }
    if (e.target.id === "dest") {
      setDest(e.target.value);
    }
    // `set${e.target.id}`(e.target.value);
  };

  return (
    <>
      <section className={Styles.myForm}>
        <h1>Zip code to zip code(s) driving distance(s)</h1>
        <div className={Styles.flex}>
          <div className={Styles.origina}>
            <label>Origin Zip</label>
            <br />
            <input
              id="origin"
              className="formControl"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className={Styles.origina}>
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
      <section className={Styles.results}>{dataArray}</section>
      <div className="map">
        <div className="map-container">
          <LoadScript googleMapsApiKey="AIzaSyCfo56YNbOeY5A_rLLPSHjNaZR_SzbdNvQ">
            <GoogleMap
              id="map"
              mapContainerStyle={mapContainerStyle}
              zoom={14}
              center={center}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {control ? (
                <DistanceMatrixService
                  options={{
                    destinations: [dest],
                    origins: [origin],
                    travelMode: "DRIVING",
                  }}
                  callback={distanceCallback}
                />
              ) : (
                console.log("sistapinot rendered")
              )}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
};

export default React.memo(App);

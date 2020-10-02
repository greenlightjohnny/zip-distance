import React, { useState } from "react";
import {
  GoogleMap,
  DistanceMatrixService,
  LoadScript,
} from "@react-google-maps/api";
import Styles from "./zipform.module.scss";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

//const mapStyles = require("./GoogleMapStyles.json");\
//import Yack from "./GoogleMapStyles.json";
//console.log(mapStyles);

const mykey = process.env.REACT_APP_KEY;
const Zips = () => {
  const [response, setResponse] = useState(null);
  const [travelMode, setTravelMode] = useState("driving");
  const [origin, setOrigin] = useState("24138");
  const [dest, setDest] = useState("90210");
  const [zipsFill, setZipsFill] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [myChart, setMyChart] = useState(null);
  //const API_KEY = process.env.GOOGLE_API_KEY;
  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);

  const handleClick = (e) => {
    e.preventDefault();
    setZipsFill(true);

    console.log("ayyy");
  };
  const handleDistanceResponse = (distData) => {
    setMyChart(
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={rowData}>
          <AgGridColumn field="make"></AgGridColumn>
          <AgGridColumn field="model"></AgGridColumn>
          <AgGridColumn field="price"></AgGridColumn>
        </AgGridReact>
      </div>
    );
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

  const center = {
    lat: -3.745,
    lng: -38.523,
  };
  const mapContainerStyle = {
    height: "50vh",
    width: "100%",
  };
  return (
    <div className="map">
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
      <section className={Styles.results}>{myChart}</section>

      <div className="map-container">
        <LoadScript googleMapsApiKey={mykey}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            //mapTypeId="a8f4c120392db471"
          >
            {/* Child components, such as markers, info windows, etc. */}
            {zipsFill ? (
              <DistanceMatrixService
                options={{
                  destinations: [dest],
                  origins: [origin],
                  travelMode: "DRIVING",
                }}
                callback={(response) => {
                  handleDistanceResponse(response);
                }}
              />
            ) : null}

            <></>
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default Zips;

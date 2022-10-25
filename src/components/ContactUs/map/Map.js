import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import style from "./Mapstyles";


const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 49.6028027,
  lng: 20.8839617,
};

function Map() {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={{ disableDefaultUI: true }}
    >
      <>
        {" "}
        <Marker position={center} label={"Around Her Beauty"} />
      </>
    </GoogleMap>
  );
}

export default Map;

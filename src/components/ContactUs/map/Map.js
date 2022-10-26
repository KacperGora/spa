import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const center = {
  lat: 49.6028027,
  lng: 20.8839617,
};

function Map() {
  return (
    <GoogleMap center={center} zoom={15} options={{ disableDefaultUI: true }}>
      <Marker position={center} label={"Around Her Beauty"} />
    </GoogleMap>
  );
}

export default Map;

import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import style from "./Mapstyles";
// import { Marker } from '@react-google-maps/api';

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
    <LoadScript googleMapsApiKey="AIzaSyDVFOtkV_zQmarBaru6SQ1qozIxAe5G66w">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{ disableDefaultUI: true , }}
      >
        <Marker position={center} label={"Around Her Beauty"} />
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;

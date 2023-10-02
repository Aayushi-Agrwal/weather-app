import { useState } from "react";

export const getLocation = () => {
  const [lat, setLat] = useState<number>();
  const [lng, setLng] = useState<number>();
  const [status, setStatus] = useState<string>("");

  if (!navigator.geolocation) {
    setStatus("Geolocation is not supported by your browser");
  } else {
    setStatus("Locating...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus("");
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      () => {
        setStatus("Unable to retrieve your location");
      }
    );
  }
};

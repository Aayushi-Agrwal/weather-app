export function getLocation() {
  const successCallback = (position: GeolocationPosition) => {
    console.log(position);
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  return navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback
  );
}

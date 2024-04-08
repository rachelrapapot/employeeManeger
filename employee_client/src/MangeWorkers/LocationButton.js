import React from 'react';

const LocationButton = () => {
  // פונקציה לקבלת המיקום הנוכחי של המשתמש
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // שליחת המיקום הנוכחי לרדיוסר
        dispatch({ type: "SetPosition", payload: { latitude, longitude } });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  };

  return (
    <button onClick={getCurrentLocation}>
      Get Current Location
    </button>
  );
};

export default LocationButton;

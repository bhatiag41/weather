import React, { useState, useEffect } from 'react';

const NewApi = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
  
      setLoading(false);
    }, []);



  return (
<div>
      {loading ? (
        <p>Fetching location...</p>
      ) : latitude && longitude ? (
        <p>
          Your current location: Latitude {latitude}, Longitude {longitude}
        </p>
      ) : (
        <p>Location not available.</p>
      )}
      {/* Your weather app components go here */}
    </div>
  );
};

export default NewApi;

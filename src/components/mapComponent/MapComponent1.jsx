import React from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Default coordinates (somewhere in the US)
const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco

const MapComponent1 = ({ coordinates }) => {
    // Google Maps API Loader
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyDLAEV6ENsy1siEIgAdnPeVwRqCh4s67vE', //Later on I will store it in secret variable
    });

    if (!isLoaded) return <div>Loading...</div>; // Show loading until map is ready

    return (
        <GoogleMap
            center={coordinates || defaultCenter} // Use passed coordinates or default US location
            zoom={20} // Adjust zoom level as needed
            mapContainerStyle={{ width: '100%', height: '400px' }} // Set map size
        >
            {/* Marker at either passed coordinates or default */}
            <Marker position={coordinates || defaultCenter} />
        </GoogleMap>
    );
};

export default MapComponent1;

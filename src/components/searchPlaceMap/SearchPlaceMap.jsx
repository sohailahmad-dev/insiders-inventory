import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const mapContainerStyle = {
    height: "400px",
    width: "800px",
};

const defaultCenter = {
    lat: 34.052235, // Default center (Los Angeles)
    lng: -118.243683,
};

// Custom marker icon (beach flag icon as in the original example)
const customMarkerIcon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const SearchPlaceMap = () => {
    const [markerPosition, setMarkerPosition] = useState(defaultCenter);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const autocompleteRef = useRef(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);

    // Handles place change from the autocomplete input
    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            const { lat, lng } = place.geometry.location;
            const newPosition = { lat: lat(), lng: lng() };

            setMarkerPosition(newPosition); // Set marker at new position
            setMapCenter(newPosition); // Update map center to the new position
            setSelectedPlace({
                name: place.name,
                lat: lat(),
                lng: lng(),
            });
        }
    };

    // Updates the marker position when dragged
    const onMarkerDragEnd = useCallback((e) => {
        const newPos = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        setMarkerPosition(newPos);
        setSelectedPlace({
            name: "Selected Position",
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    }, []);

    // Handles clicking on the map to place marker anywhere
    const onMapClick = useCallback((e) => {
        const newPos = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        };
        setMarkerPosition(newPos);
        setMapCenter(newPos); // Optionally update the center
        setSelectedPlace({
            name: "Random Selected Place",
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    }, []);

    return (
        <div>
            <LoadScript googleMapsApiKey="AIzaSyDLAEV6ENsy1siEIgAdnPeVwRqCh4s67vE" libraries={['places']}>
                {/* Autocomplete input for searching places */}
                <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceChanged}>
                    <input type="text" placeholder="Search a place" style={{ width: "300px", height: "40px", marginBottom: "10px" }} />
                </Autocomplete>

                {/* Google Map Component */}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={19} // Closer zoom level
                    onClick={onMapClick} // Enable clicking on the map to place marker
                >
                    {/* Custom Marker with beach flag icon */}
                    <Marker
                        position={markerPosition}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        icon={customMarkerIcon} // Custom icon from original example
                        title='Hello Selected'
                    />
                </GoogleMap>
            </LoadScript>

            {/* Displaying the selected place details */}
            {selectedPlace && (
                <div style={{ marginTop: "20px" }}>
                    <h4>Selected Place: {selectedPlace.name}</h4>
                    <p>Latitude: {selectedPlace.lat}</p>
                    <p>Longitude: {selectedPlace.lng}</p>
                </div>
            )}
        </div>
    );
};

export default SearchPlaceMap;
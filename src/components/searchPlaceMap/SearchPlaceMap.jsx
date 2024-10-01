import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';
import markerIcon from '../../assets/imgs/markerIcon.png'

const mapContainerStyle = {
    height: "400px",
    width: "100%",
};

const defaultCenter = {
    lat: 34.052235, // Default center (Los Angeles)
    lng: -118.243683,
};

const SearchPlaceMap = ({ onSelect }) => {
    const [markerPosition, setMarkerPosition] = useState(defaultCenter);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const autocompleteRef = useRef(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [customMarkerIcon, setCustomMarkerIcon] = useState(null);

    // Handles place change from the autocomplete input
    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place.geometry) {
            const { lat, lng } = place.geometry.location;
            const newPosition = { lat: lat(), lng: lng() };

            setMarkerPosition(newPosition); // Set marker at new position
            setMapCenter(newPosition); // Update map center to the new position
            setSelectedPlace({
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
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    }, []);

    // Set the custom marker icon after the Google Maps API is loaded
    useEffect(() => {
        if (window.google) {
            setCustomMarkerIcon({
                url: markerIcon,
                scaledSize: new window.google.maps.Size(20, 30), // Set width to 20 and height to 30
            });
        }
    }, []);

    useEffect(() => {
        if (onSelect) {
            onSelect(selectedPlace);
        }
    }, [selectedPlace, onSelect]);

    return (
        <div>
            <LoadScript
                googleMapsApiKey="AIzaSyDLAEV6ENsy1siEIgAdnPeVwRqCh4s67vE"
                libraries={['places']}
            >
                {/* Autocomplete input for searching places */}
                <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceChanged}>
                    <input
                        className='inputBox'
                        type="text"
                        placeholder="Search a place"
                        style={{ width: "100%", height: "40px", marginBottom: "10px" }}
                    />
                </Autocomplete>

                {/* Google Map Component */}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mapCenter}
                    zoom={19} // Closer zoom level
                    onClick={onMapClick} // Enable clicking on the map to place marker
                >
                    {/* Custom Marker with controlled size, only render if customMarkerIcon is available */}
                    {customMarkerIcon && (
                        <Marker
                            position={markerPosition}
                            draggable={true}
                            onDragEnd={onMarkerDragEnd}
                            icon={customMarkerIcon} // Apply custom icon with size control
                            title='Selected Marker'
                        />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default SearchPlaceMap;

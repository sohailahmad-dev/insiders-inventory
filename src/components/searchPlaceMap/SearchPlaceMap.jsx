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

// Custom marker icon (beach flag icon as in the original example)
const customMarkerIcon = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

const SearchPlaceMap = ({ onSelect }) => {
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

    useEffect(() => {
        if (onSelect) {
            onSelect(selectedPlace)
        }
    }, [selectedPlace])

    return (
        <div>
            <LoadScript
                //Later on I will store it in secret variable
                googleMapsApiKey="AIzaSyDLAEV6ENsy1siEIgAdnPeVwRqCh4s67vE"
                libraries={['places']}>
                {/* Autocomplete input for searching places */}
                <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceChanged}>
                    <input
                        className='inputBox'
                        type="text" placeholder="Search a place" style={{ width: "100%", height: "40px", marginBottom: "10px" }} />
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
                    <Marker
                        position={markerPosition}

                        // icon={customMarkerIcon} 
                        title='Hello Selected'
                    />

                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default SearchPlaceMap;

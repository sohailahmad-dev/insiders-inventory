import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../../assets/imgs/markerIcon.png';

// Custom marker icon setup
const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [20, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

// Component to recenter the map when coordinates change
const RecenterMap = ({ coords }) => {
    const map = useMap();

    useEffect(() => {
        if (coords.length > 0 && coords[0]?.lat !== undefined && coords[0]?.lng !== undefined) {
            const { lat, lng } = coords[0];
            map.setView([lat, lng], 13);
        }
    }, [coords, map]);

    return null;
};

// Main Map Component
const MapComponent = ({
    coords = [{ lat: 51.505, lng: -0.09 }], // Default coordinates
    center = [51.505, -0.09],
    width = '100%',
    height = '355px',
}) => {
    const mapRef = useRef(null);

    // Ensure map is recentered when coords change and are valid
    useEffect(() => {
        if (mapRef.current && coords.length > 0 && coords[0]?.lat !== undefined && coords[0]?.lng !== undefined) {
            const { lat, lng } = coords[0];
            mapRef.current.setView([lat, lng], 13);
        }
    }, [coords]);

    // Return null if coords are not valid to avoid passing invalid values
    if (!coords.length || coords[0]?.lat === undefined || coords[0]?.lng === undefined) {
        return null;
    }

    return (
        <MapContainer
            center={coords.length > 0 && coords[0]?.lat && coords[0]?.lng ? [coords[0].lat, coords[0].lng] : center}
            zoom={13}
            style={{ height: height, width: width, borderRadius: 20 }}
            whenCreated={(map) => (mapRef.current = map)}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* Render markers only if they have valid coordinates */}
            {coords
                .filter(marker => marker?.lat !== undefined && marker?.lng !== undefined)
                .map((marker, i) => (
                    <Marker key={i} position={[marker.lat, marker.lng]} icon={customIcon} />
                ))}
            <RecenterMap coords={coords} />
        </MapContainer>
    );
};

export default MapComponent;

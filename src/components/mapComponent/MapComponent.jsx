import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../../assets/imgs/markerIcon.png';
import sold from '../../assets/imgs/sold.png';
import pending from '../../assets/imgs/pending.png';
import withdrawn from '../../assets/imgs/withdrawn.png';
import newIconn from '../../assets/imgs/new.png';


// Custom marker icon setup
const newIcon = new L.Icon({
    iconUrl: newIconn,
    iconSize: [20, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

const soldIcon = new L.Icon({
    iconUrl: sold,
    iconSize: [20, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

const pendingIcon = new L.Icon({
    iconUrl: pending,
    iconSize: [20, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

const widthdrawnIcon = new L.Icon({
    iconUrl: withdrawn,
    iconSize: [20, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

// Component to recenter the map when coordinates change
const RecenterMap = ({ coords }) => {
    const map = useMap();

    useEffect(() => {
        if (coords.length > 0 && coords[0]?.marker?.lat !== undefined && coords[0]?.marker?.lng !== undefined) {
            const { lat, lng } = coords[0]?.marker;
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
        if (mapRef.current && coords.length > 0 && coords[0]?.marker?.lat !== undefined && coords[0]?.marker?.lng !== undefined) {
            const { lat, lng } = coords[0]?.marker;
            mapRef.current.setView([lat, lng], 13);
        }
    }, [coords]);

    // Return null if coords are not valid to avoid passing invalid values
    if (!coords.length || coords[0]?.marker?.lat === undefined || coords[0]?.marker?.lng === undefined) {
        return null;
    }

    return (
        <MapContainer
            center={coords.length > 0 && coords[0]?.marker?.lat && coords[0]?.marker?.lng ? [coords[0]?.marker.lat, coords[0]?.marker.lng] : center}
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
                .filter(e => e?.marker?.lat !== undefined && e?.marker?.lng !== undefined)
                .map((e, i) => (
                    <Marker key={i}
                        position={[e?.marker.lat, e?.marker.lng]}
                        title={e?.status}
                        icon={(e?.status === 'New') ? newIcon : (e?.status === 'Pending') ? pendingIcon : (e?.status === 'Sold') ? soldIcon : widthdrawnIcon} />
                ))}
            <RecenterMap coords={coords} />
        </MapContainer>
    );
};

export default MapComponent;

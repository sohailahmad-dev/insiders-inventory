import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '../../assets/imgs/markerIcon.png'

// Import your custom icon or image
// import customIconUrl from './path-to-your-icon.png';

const customIcon = new L.Icon({
    iconUrl: markerIcon,
    iconSize: [20, 30], // size of the icon
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -38], // point from which the popup should open relative to the iconAnchor
});

const markers = [
    { lat: 51.515, lng: -0.1 },
];




const MapComponent = ({ coords = markers }) => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '355px', width: '100%', borderRadius: 20 }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {coords.map((marker, i) => (
                <Marker key={i} position={marker} icon={customIcon}>
                    {/* <Popup>{marker.title}</Popup> */}
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;

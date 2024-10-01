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
    { id: 1, position: { lat: 51.515, lng: -0.1 }, title: 'Elegant Apartment in Central London' },
    { id: 2, position: { lat: 51.525, lng: -0.09 }, title: 'Modern Flat near Regent’s Park' },
    { id: 3, position: { lat: 51.505, lng: -0.11 }, title: 'Charming Studio in South Bank' },
    { id: 4, position: { lat: 51.495, lng: -0.08 }, title: 'Cozy Home in East London' },
    { id: 5, position: { lat: 51.535, lng: -0.12 }, title: 'Spacious House in West Kensington' },
    { id: 6, position: { lat: 51.520, lng: -0.15 }, title: 'Luxury Condo near Hyde Park' },
    { id: 7, position: { lat: 51.510, lng: -0.06 }, title: 'Riverside Apartment in Canary Wharf' },
    { id: 8, position: { lat: 51.530, lng: -0.04 }, title: 'Stylish Loft in Shoreditch' },
    { id: 9, position: { lat: 51.500, lng: -0.13 }, title: 'Penthouse in Westminster' },
    { id: 10, position: { lat: 51.540, lng: -0.1 }, title: 'Victorian House in Hampstead' },
    { id: 11, position: { lat: 51.485, lng: -0.05 }, title: 'Contemporary Flat in Greenwich' },
    { id: 12, position: { lat: 51.525, lng: -0.16 }, title: 'Family Home in Camden' },
    { id: 13, position: { lat: 51.495, lng: -0.14 }, title: 'Renovated Apartment in Chelsea' },
    { id: 14, position: { lat: 51.515, lng: -0.04 }, title: 'Townhouse in Covent Garden' },
    { id: 15, position: { lat: 51.535, lng: -0.07 }, title: 'Duplex near King’s Cross' },
    { id: 16, position: { lat: 51.505, lng: -0.18 }, title: 'Classic Home in Kensington' },
    { id: 17, position: { lat: 51.545, lng: -0.06 }, title: 'Designer Flat in Islington' },
    { id: 18, position: { lat: 51.475, lng: -0.02 }, title: 'Apartment with River Views in Deptford' },
    { id: 19, position: { lat: 51.515, lng: -0.19 }, title: 'Elegant Mansion in Notting Hill' },
    { id: 20, position: { lat: 51.525, lng: -0.05 }, title: 'High-rise Flat in The City' },
];




const MapComponent = () => {
    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '355px', width: '100%', borderRadius: 20 }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map(marker => (
                <Marker key={marker.id} position={marker.position} icon={customIcon}>
                    <Popup>{marker.title}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;

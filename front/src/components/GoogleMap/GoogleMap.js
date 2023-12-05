import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];

const defaultCenter = {
    lat: 7.2905715, 
    lng: 80.6337262,
};

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

export default function GoogleMapComponent({ addresses }) {
    const [markerPositions, setMarkerPositions] = useState([]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBHQclG6cZIpfuZ3jLgEncTs_rRScC7aUE',
        libraries,
    });

    useEffect(() => {
        const geocoder = new window.google.maps.Geocoder();

        if (isLoaded) {
            const newMarkerPositions = [];

            const processAddress = (address) => {
                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        const { lat, lng } = results[0].geometry.location;
                        newMarkerPositions.push({ lat: lat(), lng: lng() });
                        setMarkerPositions(newMarkerPositions);
                    } else {
                        console.error('Geocode was not successful for the following reason:', status);
                    }
                });
            };

            addresses.forEach(processAddress);
        }
    }, [isLoaded, addresses]);
    
    if (loadError) {
        return <div>Error loading maps</div>;
    }
    
    if (!isLoaded) {
        return <div>Loading maps</div>;
    }
    
    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={markerPositions[0] || defaultCenter}
        >
            {markerPositions.map((position, index) => (
                <Marker key={index} position={position} />
            ))}     
        </GoogleMap>
    );
    
}


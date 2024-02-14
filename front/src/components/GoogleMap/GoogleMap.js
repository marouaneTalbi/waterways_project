import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { BoatContext } from '../../contexts/boatContext';
import { EstablishmentContext } from '../../contexts/establishmentContext';
import { UserContext } from '../../contexts/userContext'; 

const libraries = ['places'];

const defaultCenter = {
    lat: 7.2905715, 
    lng: 80.6337262,
};

const mapContainerStyle = {
    width: '100%',
    height: '100%',
};

export default function GoogleMapComponent() {
    const [markerPositions, setMarkerPositions] = useState([]);
    const [selectedBoat, setSelectedBoat] = useState(null); 
    const { results, boat } = useContext(BoatContext);
    const { establishmentResults } = useContext(EstablishmentContext);
    const { userResults } = useContext(UserContext);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyD612is2fyjpnMcXuA6XAxM1lNIFxJkgU4',
        libraries,
    });

    useEffect(() => {
        const loadMarkers = (data) => {
            const geocoder = new window.google.maps.Geocoder();
            const newMarkers = [];
            data.forEach((item) => {
                geocoder.geocode({ address: item.address + ' ' + item.city }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        const { lat, lng } = results[0].geometry.location;
                        newMarkers.push({ lat: lat(), lng: lng(), item });
                        setMarkerPositions((prevMarkerPositions) => [...prevMarkerPositions, ...newMarkers]);
                    } else {
                        console.error('Geocode was not successful for the following reason:', status);
                    }
                });
            });
            setMarkerPositions(newMarkers);
        };

        if (isLoaded) {
            if (results.length > 0) {
                loadMarkers(results);
            } else if (establishmentResults) {
                loadMarkers(establishmentResults);
            } else if (userResults) {
                loadMarkers(userResults);
            } else if (boat) {
                loadMarkers([boat]);
            }
        }
    }, [isLoaded, results, establishmentResults, userResults, boat]);

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
            center={markerPositions[0] ? markerPositions[0] : defaultCenter}
        >
            {markerPositions.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker}
                    onClick={() => {
                        setSelectedBoat(marker.item); 
                    }}
                >
                    {selectedBoat && marker.item === selectedBoat && (
                        <InfoWindow onCloseClick={() => setSelectedBoat(null)} options={{ maxWidth: 320 }}>
                            <div>
                                <img alt='boat-image' src='https://coursnautique.com/wp-content/uploads/2022/02/Les-diff%C3%A9rentes-parties-dun-bateau-scaled.jpeg' className='bg-red-500 w-[280px] h-[180px] rounded-md' />
                                <h3>{selectedBoat.name} {selectedBoat.modele}</h3>
                                <p>{selectedBoat.description}</p>
                                {/* Add other boat information according to your data model */}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>
    );
    
}


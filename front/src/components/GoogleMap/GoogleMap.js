import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { BoatContext } from '../../contexts/boatContext';

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
    const [selectedBoat, setSelectedBoat] = useState(null); // Nouvel état pour suivre le bateau sélectionné
    const { results } = useContext(BoatContext);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyD612is2fyjpnMcXuA6XAxM1lNIFxJkgU4',
        libraries,
    });

    useEffect(() => {
        if (results.length > 0) {
            const loadMarkers = () => {
                const geocoder = new window.google.maps.Geocoder();
                const newMarkers = [];
                console.log('results : ', results)
                results.forEach((boat) => {
                    geocoder.geocode({ address: boat.address + ' ' + boat.city }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            console.log('ok')
                            const { lat, lng } = results[0].geometry.location;
                            newMarkers.push({ lat: lat(), lng: lng(), boat }); // Inclure l'objet bateau dans les données du marqueur
                            setMarkerPositions((prevMarkerPositions) => [...prevMarkerPositions, ...newMarkers]);
                        } else {
                            console.error('Geocode was not successful for the following reason:', status);
                        }
                    });
                });
            };

            if (isLoaded) {
                loadMarkers();
            }
        }
    }, [isLoaded, results]);

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
                        setSelectedBoat(marker.boat); // Définir le bateau sélectionné lorsqu'un marqueur est cliqué
                    }}
                >
                    {selectedBoat && marker.boat === selectedBoat && ( // Afficher l'InfoWindow seulement pour le bateau sélectionné
                        <InfoWindow onCloseClick={() => setSelectedBoat(null)} options={{ maxWidth: 320 }}>
                            <div>
                                <img alt='boat-image' src='https://coursnautique.com/wp-content/uploads/2022/02/Les-diff%C3%A9rentes-parties-dun-bateau-scaled.jpeg' className='bg-red-500 w-[280px] h-[180px] rounded-md' />
                                <h3>{selectedBoat.name} {selectedBoat.modele}</h3>
                                <p>{selectedBoat.description}</p>
                                {/* Ajoutez d'autres informations du bateau selon votre modèle de données */}
                            </div>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>
    );
    
}


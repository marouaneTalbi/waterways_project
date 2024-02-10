import React, { useState, useContext, useEffect } from 'react';
import EstablishmentProvider, { EstablishmentContext } from "../../contexts/establishmentContext";
import EstablishmentItem from '../../components/Establishment/establishmentItem';
import BoatProvider from '../../contexts/boatContext';
import SlotsProvider from '../../contexts/slotsContext';

export default function EstablishmentPage() {

    return (
        <>
            <EstablishmentProvider>
                <BoatProvider>
                    <SlotsProvider>
                        <EstablishmentItem/>
                    </SlotsProvider>
                </BoatProvider>
            </EstablishmentProvider>
        </>
    );
}
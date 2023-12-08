import React, { useState, useContext, useEffect } from 'react';
import EstablishmentProvider, { EstablishmentContext } from "../../contexts/establishmentContext";
import EstablishmentItem from '../../components/Establishment/establishmentItem';

export default function EstablishmentPage() {

    return (
        <>
            <EstablishmentProvider>
                    <EstablishmentItem/>
            </EstablishmentProvider>
        </>
    );
}
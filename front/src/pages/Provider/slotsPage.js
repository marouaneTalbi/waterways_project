import React, { useState, useContext, useEffect } from 'react';
import SlotsProvider, { SlotsContext } from "../../contexts/slotsContext";
import SlotsItem from '../../components/Slots/SlotsItem';

export default function SlotsPage() {

    return (
        <>
            <SlotsProvider>
                <SlotsItem/>
            </SlotsProvider>
        </>
    );
}
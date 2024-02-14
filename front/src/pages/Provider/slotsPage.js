import React from 'react';
import SlotsProvider from "../../contexts/slotsContext";
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
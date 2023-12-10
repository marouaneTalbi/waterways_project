import React, { useState, useContext, useEffect } from 'react';
import { EstablishmentContext } from "../../contexts/establishmentContext";
import EstablishmentInfos from './EstablishmentInfo';

export default function EstablishmentItem() {
    const { getCurrentEstablishment } = useContext(EstablishmentContext);
    const [establishment, setEstablishment] = useState({});

    useEffect(() => {
        getCurrentEstablishment().then(setEstablishment)
    }, []) 

    return (
        <div className="flex-1 ">
            <div className="col-span-12 md:col-span-8 bg-white rounded border-2 border-gray-100 p-4 relative">
                <header className="flex flex-row justify-between">
                    <div className="flex flex-col gap-2">
                        <h4 className="text-xl font-medium">Mes informations</h4>
                    </div>
                    <button className="text-base text-dark-orange underline cursor-pointer" >MODIFIER</button>
                </header>
                <div className="flex flex-wrap py-6 gap-20 gap-y-10">
                    <EstablishmentInfos establishment={establishment} />
                </div>  
            </div>
        </div>
    );
}
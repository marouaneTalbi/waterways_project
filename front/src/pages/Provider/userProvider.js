import React, {useEffect, useState} from "react";
import Boats from "../../components/Boat/boats";
import Establishments from "../../components/Establishment/establishments";
import EstablishmentProvider from "../../contexts/establishmentContext";

export default function UserProvider() {

    return (
        <div className="flex-1 ">
            <div className="">
                <EstablishmentProvider>
                    <Establishments/>
                </EstablishmentProvider>
            </div>
            <div className="">
                <Boats/>
            </div>
        </div>
    );
}
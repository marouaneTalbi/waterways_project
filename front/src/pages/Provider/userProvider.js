import React, {useEffect, useState} from "react";
import Boats from "../../components/Boat/boats";
import Establishments from "../../components/Establishment/establishments";

export default function UserProvider() {

    return (
        <div className="flex-1 ">
            <div className="">
                <Boats/>
            </div>
            <div className="">
                <Establishments/>
            </div>
        </div>
    );
}
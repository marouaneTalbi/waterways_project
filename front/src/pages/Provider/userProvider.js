import React, {useEffect, useState} from "react";
import axios from "axios";
import sendRequest from "../../services/axiosRequestFunction";
import GenericModal from '../../components/GenericModal/GenericModal';
import {Button, Label, TextInput} from "flowbite-react";
import {getUserRole} from "../../services/axiosRequestFunction";
import Boats from "../Components/Boat/boats";
import Establishments from "../Components/Establishment/establishments";

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
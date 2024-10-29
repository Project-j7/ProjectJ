import React from "react";
import {useServerUser} from "../../contextStore/serverUserContext"
import { useNavigate } from "react-router-dom"

export default function Admin(){
    const navigate = useNavigate();
    const serverUser = useServerUser();

    if(serverUser?.role !== "ADMIN"){
        return(
            <div>
                <h1>You are not authorized to view this page</h1>
            </div>
        )
    }

    return(
        <div>
            <h1>WELCOME ADMIN</h1>
        </div>
    ) 
}
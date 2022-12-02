import React from 'react';
import {customGetOnePromise, customPostPromiseEditionToBook} from "../metier/LivreService";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {customGetAllPromiseEditionByLivre} from "../metier/EditionService";
import {customPostPromiseRegistration} from "../metier/AuthService";
import swal from "sweetalert";
import {customGetOnePromiseCommande, customPostPromiseCommande} from "../metier/CommandeService";
import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from "bootstrap/js/src/modal";
import {Modal} from "react-bootstrap";
import NavbarAdmin from "../components/NavbarAdmin";
import isAdmin from "../hoc/IsAdmin";

function CommandeInfo() {
    const [commande, setCommande] = useState({})
    const params = useParams();

    useEffect(()=>{
        getCommande()
        console.log(commande)
    },[])
    const getCommande = async () => {
        setCommande(await customGetOnePromiseCommande(params.id));
    }


    return (
        <div>
            <NavbarAdmin/>
                <h1>{commande.livre.title}</h1>
                <h1>{commande.user.name}</h1>

        </div>
    );
}

export default isAdmin(CommandeInfo);
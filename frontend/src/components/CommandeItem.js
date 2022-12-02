import React from 'react';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {customDeletePromise, customGetOnePromise} from "../metier/LivreService";
import {customDeletePromiseCommande, customPostPromiseCommande} from "../metier/CommandeService";
import swal from "sweetalert";

function CommandeItem({commande, counterFetch, setCounterFetch}) {
    const navigate = useNavigate();
    const [livre, setLivre] = useState({})
    const fetchBook = async () => {
        let fetchedLivre = (await customGetOnePromise(commande.livreId))
        setLivre(fetchedLivre[0])
        console.log(livre)
    }
    useEffect(()=>{
        fetchBook()
    },[])

    const handleDelete = async (id) => {

        if(await customDeletePromiseCommande(id)){
            await swal("Good job!", "You clicked the button!", "success")
            setCounterFetch(counterFetch+1)
            setCounterFetch(counterFetch+1)
        }
        else {
            await swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
        }
    }

    return (

        <>
            <tr>
                <td>{livre.title}</td>
                <td>{commande.createdAt}</td>
                <td>
                    <button className={'btn btn-danger'} style={{marginLeft: '1vw'}} onClick={()=>handleDelete(commande.id)}>Annuler la commande</button>
                </td>
            </tr>
        </>

    )
}

export default CommandeItem;
import React, {useEffect, useState} from 'react'
import {useNavigate } from "react-router-dom";
import {customDeletePromise} from "../metier/LivreService";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Livre.css'
import {customPostPromiseCommande} from "../metier/CommandeService";
import swal from "sweetalert";
function Livre({livre, counterFetch, setCounterFetch}) {
    const [image, setImage] =useState("")
    const navigate = useNavigate();


    useEffect(()=>{
        setImage('http://localhost:8012/images/'+livre?.couverture)
        console.log("image", image)
    })
    const handleDelete = async (id) => {
        await customDeletePromise(id)
        setCounterFetch(counterFetch+1)
    }
    const showInfo = () => {
        navigate('/info/'+livre.id)
    }
    const handleCommander = async () => {
        if(!localStorage.getItem("token")){
            navigate('/login')
        }
        else {
            if(await customPostPromiseCommande({livreId: livre.id})){
                await swal("Good job!", "You clicked the button!", "success")
                navigate('/')
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
    }
  return (

        <div className="card mt-3" style={{width: "20vw", marginLeft: '1vw'}}>
            <img style={{cursor: 'pointer', height: '20vh'}} onClick={showInfo} src={image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">Titre: {livre.title}</h5>
                    <h6 className="card-title">Prix : {livre.prix}$</h6>
                    <p className="card-text">{livre.description}</p>
                    {livre.commander===true ? <button className="btn btn-warning" disabled>indisponible</button> :
                        <button onClick={handleCommander} className="btn btn-primary">Commander</button> }
                </div>
        </div>
  )
}

export default Livre

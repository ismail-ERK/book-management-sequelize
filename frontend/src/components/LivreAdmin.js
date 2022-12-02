import React, {useEffect, useState} from 'react'
import {useNavigate } from "react-router-dom";
import {customDeletePromise} from "../metier/LivreService";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Livre.css'
import {customPostPromiseCommande} from "../metier/CommandeService";
import swal from "sweetalert";
function LivreAdmin({livre, counterFetch, setCounterFetch}) {
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
        navigate('/info/admin/'+livre.id)
    }

  return (

      <>
          <tr>
              <td><img style={{cursor: 'pointer', height: '10vh',width: '10vh', borderRadius: '50%'}} onClick={showInfo} src={image} className="card-img-top" alt="..."/></td>
              <td>{livre.title}</td>
              <td>{livre.prix}</td>
              <td>
                  <button className={'btn btn-warning'} onClick={()=>navigate("/update/"+livre.id)}>Modifier</button>
                  <button className={'btn btn-danger'} style={{marginLeft: '1vw'}} onClick={()=>handleDelete(livre.id)}>Supprimer</button>
              </td>
          </tr>
      </>

  )
}

export default LivreAdmin

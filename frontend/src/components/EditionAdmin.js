import React, {useEffect, useState} from 'react'
import {useNavigate } from "react-router-dom";
import {customDeletePromise} from "../metier/LivreService";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Livre.css'
import {customDeletePromiseEdition} from "../metier/EditionService";
function EditionAdmin({edition,fetchCount,setFetchcout}) {
    const navigate = useNavigate();



    const handleDelete = async (id) => {
        await customDeletePromiseEdition(id)
        setFetchcout(fetchCount+1)
    }


  return (

      <>
          <tr>
              <td>{edition.id}</td>
              <td>{edition.maison_edition}</td>
              <td>{edition.date_edition}</td>
              <td>
                  <button className={'btn btn-warning'} onClick={()=>navigate("/update/edition/"+edition.id)}>Modifier</button>
                  <button className={'btn btn-danger'} style={{marginLeft: '1vw'}} onClick={()=>handleDelete(edition.id)}>Supprimer</button>
              </td>
          </tr>
      </>

  )
}

export default EditionAdmin

import React, {useEffect, useState} from 'react'
import {useNavigate } from "react-router-dom";
import {customDeletePromise} from "../metier/LivreService";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Livre.css'
import {customDeletePromiseEdition} from "../metier/EditionService";
import {customDeletePromiseGenre} from "../metier/GenreService";
function GenreAdmin({genre,fetchCount,setFetchcout}) {
    const navigate = useNavigate();



    const handleDelete = async (id) => {
        await customDeletePromiseGenre(id)
        setFetchcout(fetchCount+1)
    }


  return (

      <>
          <tr>
              <td>{genre.id}</td>
              <td>{genre.name}</td>
              <td>
                  <button className={'btn btn-warning'} onClick={()=>navigate("/update/genre/"+genre.id)}>Modifier</button>
                  <button className={'btn btn-danger'} style={{marginLeft: '1vw'}} onClick={()=>handleDelete(genre.id)}>Supprimer</button>
              </td>
          </tr>
      </>

  )
}

export default GenreAdmin

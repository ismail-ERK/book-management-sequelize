import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import {customDeletePromise} from "../metier/LivreService";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Livre.css'
import {customDeletePromiseEdition} from "../metier/EditionService";
import {
    customDeletePromiseCommande,
    customGetOnePromiseCommande,
    customPostPromiseCommande
} from "../metier/CommandeService";
import {Modal} from "react-bootstrap";
import swal from "sweetalert";
function EditionAdmin({commande,fetchCount,setFetchcout}) {
    const navigate = useNavigate();
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);


    const handleDelete = async (id) => {
        await customDeletePromiseCommande(id)
        if(await customDeletePromiseCommande(id)){
            await swal("Good job!", "You clicked the button!", "success")
            setFetchcout(fetchCount+1)
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
    const [myCommande, setMyCommande] = useState({user:{name:''},livre: {title:''}})
    const params = useParams();

    useEffect(()=>{
        getCommande()
        console.log(commande)
    },[])
    const getCommande = async () => {
        setMyCommande(await customGetOnePromiseCommande(commande.id));
    }


  return (

      <>
          <Modal show={showAdd} onHide={handleCloseAdd}>
              <Modal.Header closeButton>
                  <Modal.Title>Commande infos</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                      <div>
                          <h3 style={{display: 'flex'}}>User : <p style={{color : 'gray', marginLeft: '3vw'}}>{myCommande.user.name}</p></h3>
                          <h3 style={{display: 'flex'}}>Livre : <p style={{color : 'gray', marginLeft: '3vw'}}>{myCommande.livre.title}</p></h3>
                      </div>


              </Modal.Body>
          </Modal>
          <tr>
              <td>{commande.id}</td>
              <td>{commande.userId}</td>
              <td>{commande.livreId}</td>
              <td>
                  <button className={'btn btn-info'} onClick={()=>handleShowAdd()}>Info</button>
                  <button className={'btn btn-danger'} style={{marginLeft: '1vw'}} onClick={()=>handleDelete(commande.id)}>Supprimer</button>
              </td>
          </tr>
      </>

  )
}

export default EditionAdmin

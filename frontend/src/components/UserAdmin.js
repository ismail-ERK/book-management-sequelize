import React, {useEffect, useState} from 'react'
import {useNavigate } from "react-router-dom";
import {customDeletePromise} from "../metier/LivreService";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Livre.css'
import {customDeletePromiseEdition} from "../metier/EditionService";
import {customDeletePromiseGenre} from "../metier/GenreService";
import {customDeletePromiseUsers, customPutPromiseUsers} from "../metier/UsersService";
import {Modal} from "react-bootstrap";
function UserAdmin({user,fetchCount,setFetchcout}) {
    const navigate = useNavigate();
    const [showAdd, setShowAdd] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({...user})
    const handleCloseUpdate = () => setShowAdd(false);
    const handleShowUpdate = () => setShowAdd(true);


    const handleDelete = async (id) => {
        await customDeletePromiseUsers(id)
        setFetchcout(fetchCount+1)
    }

    const handleUpdadeChanges = e => {
        switch (e.target.name){
            case 'name':
                setUpdatedUser({...updatedUser, name: e.target.value})
                break;
            case 'email':
                setUpdatedUser({...updatedUser, email: e.target.value})
                break;
        }
    }

    const updateUser = async () =>{
        await customPutPromiseUsers(user.id, updatedUser)
    }

    const handleUpdadeSubmit = e =>{
        e.preventDefault();
        updateUser();
        setFetchcout(fetchCount+1)
        handleCloseUpdate()
    }

  return (

      <>
          <Modal show={showAdd} onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                  <Modal.Title>Commande infos</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                  <form onSubmit={handleUpdadeSubmit}>
                      <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Name</label>
                          <input type="text" name={"name"} className="form-control" id="exampleInputEmail1"
                                 onChange={handleUpdadeChanges}
                                 value={updatedUser.name}
                          />
                      </div>
                      <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Email</label>
                          <input type="email" name={"email"} className="form-control" id="exampleInputPassword1"
                                 onChange={handleUpdadeChanges}
                                 value={updatedUser.email}/>
                      </div>

                      <button type="submit" className="btn btn-warning mt-3">Update</button>
                  </form>

              </Modal.Body>
          </Modal>
          <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                  <button className={'btn btn-warning'} onClick={()=>handleShowUpdate()}>Modifier</button>
                  <button className={'btn btn-danger'} style={{marginLeft: '1vw'}} onClick={()=>handleDelete(user.id)}>Supprimer</button>
              </td>
          </tr>
      </>

  )
}

export default UserAdmin

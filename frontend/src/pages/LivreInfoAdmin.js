import React from 'react';
import {customGetOnePromise, customPostPromiseEditionToBook} from "../metier/LivreService";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {customGetAllPromiseEditionByLivre} from "../metier/EditionService";
import {customPostPromiseRegistration} from "../metier/AuthService";
import swal from "sweetalert";
import {customPostPromiseCommande} from "../metier/CommandeService";
import "bootstrap/dist/css/bootstrap.min.css";
// import Modal from "bootstrap/js/src/modal";
import {Modal} from "react-bootstrap";
import NavbarAdmin from "../components/NavbarAdmin";
import isAdmin from "../hoc/IsAdmin";

function LivreInfo() {
    const [livre, setLivre] = useState({})
    const [editions, setEditions] = useState([])
    const [counterFetch, setCounterFetch] = useState(0)
    const [showAdd, setShowAdd] = useState(false);
    const [image, setImage] =useState("")
    const [edition, setEdition] = useState({})

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const navigate = useNavigate()
    const params = useParams();

    useEffect(()=>{
        getBook()
        getBookEditions()
        setImage('http://localhost:8012/images/'+livre.couverture)

    },[counterFetch])
    const getBook = async () => {
        let res = await customGetOnePromise(params.id);
        setLivre(res[0])
        console.log(livre)
    }
    const getBookEditions = async () => {
        let res = await customGetAllPromiseEditionByLivre(params.id);
        setEditions(res)
        console.log(livre)
    }
    const handleChangesEdition = (e) => {
        switch (e.target.name){

            case "maison_edition":
                setEdition({...edition, maison_edition: e.target.value})
                break;
            case "date_edition":
                setEdition({...edition, date_edition: e.target.value})
                break;

        }

    }
    const addEditionModel = () => {
        handleShowAdd()
    }
    const addEditionToBook = async () => {
        await customPostPromiseEditionToBook(livre.id, edition)
    }
    const addEditionSubmit = (e) => {
        e.preventDefault()
        addEditionToBook();
        handleCloseAdd()
        setCounterFetch(counterFetch+1)
        setCounterFetch(counterFetch+1)
    }
    return (
        <div>
            <NavbarAdmin/>
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter edition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={addEditionSubmit}>
                        <label>Maison d'edition: </label>
                        <input className="form-control" onChange={handleChangesEdition} name={"maison_edition"}/>
                        <label>Date d'edition: </label>
                        <input className="form-control" onChange={handleChangesEdition} name={'date_edition'} type={'date'}/>
                        <button type={"submit"} className={"btn btn-success mt-2"}>ajouter edition</button>
                    </form>

                </Modal.Body>
            </Modal>
            <div style={{marginLeft: '80vw', marginTop: '5vh'}}>
                <button className={'btn btn-success'} onClick={addEditionModel}>Ajouter Edition</button>
            </div>
            <div>
                <center><img src={'http://localhost:8012/images/'+livre?.couverture} height={'300'} width={'300'}/></center>
            </div>

            <div style={{textAlign: 'center'}}>
                <h3>Title: {livre.title}</h3>
                <h3>Description: {livre.description}</h3>
                <h3>Price: {livre.prix}</h3>
            </div>
            <div className={'container'}>
                <h2>Editions</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Maison edition</th>
                        <th scope="col">Date edition</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        editions?.map(edition => (
                            <tr>
                                <th scope="row">{edition.maison_edition}</th>
                                <td>{edition.date_edition}</td>
                            </tr>
                        ))
                    }


                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default isAdmin(LivreInfo);
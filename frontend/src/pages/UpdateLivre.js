import React, {useEffect, useState} from 'react'
import {customGetOnePromise, customPostPromise, customPutPromise} from "../metier/LivreService";
import {useNavigate, useParams} from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import isAdmin from "../hoc/IsAdmin";

function UpdateLivre() {
    const [livre, setLivre] = useState({})
    const [counterFetch, setCounterFetch] = useState(0)
    const params = useParams();
    const navigate = useNavigate();

    const handleUpdateChanges = (e) => {
        switch (e.target.name){
            case "title":
                setLivre({...livre, title: e.target.value})
                break;
            case "description":
                setLivre({...livre, description: e.target.value})
                break;
            case "prix":
                setLivre({...livre, prix: e.target.value})
                break;
            case "couverture":
                setLivre({...livre, couverture: e.target.files[0].name})
                console.log(livre.couverture)
                break;
        }
    }
    useEffect(()=>{
        getBook()

    },[counterFetch])

    const handleSubmit = (e) => {
        e.preventDefault();
        createLivre()
        getBook()
        setCounterFetch(counterFetch+1)
        navigate("/admin")
    }
    const createLivre = async () => {
        await customPutPromise(params.id, livre);
    }
    const getBook = async () => {
        let res = await customGetOnePromise(params.id);
        setLivre(res[0])
        console.log(livre)
    }
    return (
        <div>
            <NavbarAdmin/>
        <div className={"container"} style={{marginTop: '10vh'}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Title</label>
                    <input name={"title"} className={"form-control"} value={livre?.title} onChange={handleUpdateChanges} placeholder={"title"}/><br/>

                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Description</label>
                    <input name={"description"} className={"form-control"} value={livre?.description} onChange={handleUpdateChanges} placeholder={"description"}/><br/>

                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Prix</label>
                    <input name={"prix"} type={"number"} className={"form-control"} value={livre?.prix} onChange={handleUpdateChanges} placeholder={"prix"}/><br/>

                </div>

                <input className={"btn btn-warning col col-6"} value={"Modifier"}  type={"submit"}/>
            </form>
        </div>
        </div>
    )
}

export default isAdmin(UpdateLivre)
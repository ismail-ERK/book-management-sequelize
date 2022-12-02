import React, {useEffect, useState} from 'react'
import {customGetOnePromise, customPostPromise, customPutPromise} from "../metier/LivreService";
import {useNavigate, useParams} from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import {customGetOnePromiseEdition, customPutPromiseEdition} from "../metier/EditionService";
import {customGetOnePromiseGenre, customPutPromiseGenre} from "../metier/GenreService";
import isAdmin from "../hoc/IsAdmin";

function UpdateGenre() {
    const [genre, setGenre] = useState({})
    const [counterFetch, setCounterFetch] = useState(0)
    const params = useParams();
    const navigate = useNavigate();

    const handleUpdateChanges = (e) => {
        switch (e.target.name){
            case "name":
                setGenre({...genre, name: e.target.value})
                break;


        }
    }
    useEffect(()=>{
        getGenre()
    },[counterFetch])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateGenre()
        setCounterFetch(counterFetch+1)
        navigate("/admin/genres")
    }
    const updateGenre = async () => {
        await customPutPromiseGenre(params.id, genre);
    }
    const getGenre = async () => {
        let res = await customGetOnePromiseGenre(params.id);
        setGenre(res[0])
    }
    return (
        <div>
            <NavbarAdmin/>

        <div className={"container"} style={{marginTop: '10vh'}}>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input name={"name"} className={"form-control"} value={genre?.name} onChange={handleUpdateChanges} placeholder={"genre"}/><br/>

                </div>



                <input className={"btn btn-warning col col-6"} value={"Modifier"}  type={"submit"}/>
            </form>
        </div>
        </div>
    )
}

export default isAdmin(UpdateGenre)
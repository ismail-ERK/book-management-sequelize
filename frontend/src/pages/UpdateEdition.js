import React, {useEffect, useState} from 'react'
import {customGetOnePromise, customPostPromise, customPutPromise} from "../metier/LivreService";
import {useNavigate, useParams} from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import {customGetOnePromiseEdition, customPutPromiseEdition} from "../metier/EditionService";
import isAdmin from "../hoc/IsAdmin";

function UpdateEdition() {
    const [edition, setEdition] = useState({})
    const [counterFetch, setCounterFetch] = useState(0)
    const params = useParams();
    const navigate = useNavigate();

    const handleUpdateChanges = (e) => {
        switch (e.target.name){
            case "maison_edition":
                setEdition({...edition, maison_edition: e.target.value})
                break;
            case "date_edition":
                setEdition({...edition, date_edition: e.target.value})
                break;

        }
    }
    useEffect(()=>{
        getBook()
    },[counterFetch])

    const handleSubmit = (e) => {
        e.preventDefault();
        updateEdition()
        setCounterFetch(counterFetch+1)
        navigate("/admin/editions")
    }
    const updateEdition = async () => {
        await customPutPromiseEdition(params.id, edition);
    }
    const getBook = async () => {
        let res = await customGetOnePromiseEdition(params.id);
        setEdition(res[0])
    }
    return (
        <div>
            <NavbarAdmin/>

        <div className={"container"} style={{marginTop: '10vh'}}>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="exampleInputEmail1">Maison edition</label>
                    <input name={"maison_edition"} className={"form-control"} value={edition?.maison_edition} onChange={handleUpdateChanges} placeholder={"title"}/><br/>

                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Date Edition</label>
                    <input name={"date_edition"} className={"form-control"} value={edition?.date_edition} onChange={handleUpdateChanges} type={'date'}/><br/>

                </div>


                <input className={"btn btn-warning col col-6"} value={"Modifier"}  type={"submit"}/>
            </form>
        </div>
        </div>
    )
}

export default isAdmin(UpdateEdition)
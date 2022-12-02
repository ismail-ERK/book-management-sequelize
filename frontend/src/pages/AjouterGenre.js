import React, {useState} from 'react';
import {customPostPromiseGenre} from "../metier/GenreService";
import {useNavigate} from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";
import isAdmin from "../hoc/IsAdmin";

function AjouterGenre(props) {
    const [genre, setGenre] = useState('')
    const navigate = useNavigate();

    const ajouter = async () => {
        await customPostPromiseGenre({name: genre})
    }
    const handleChanges = e =>{
        setGenre(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        ajouter();
        navigate('/admin/genres')
    }
    return (
        <div>
            <NavbarAdmin/>
            <form onSubmit={handleSubmit} className={"container"} style={{width : '50%', marginTop : '5vh'}}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input name={"title"} className={"form-control"} onChange={handleChanges} placeholder={"title"}/><br/>


                </div>
                <input className={"btn btn-success col col-6"} value={"Ajouter"}  type={"submit"}/>
            </form>
        </div>
    );
}

export default isAdmin(AjouterGenre);
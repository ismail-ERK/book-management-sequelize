import React, {useState} from 'react'
import {customGetAllPromise, customPostPromise} from "../metier/LivreService";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {customGetAllPromiseGenre} from "../metier/GenreService";
import NavbarAdmin from "../components/NavbarAdmin";
import isAdmin from "../hoc/IsAdmin";

function AjouterLivre() {
    const [livre, setLivre] = useState({})
    const [edition, setEdition] = useState({})
    const [genre, setGenre] = useState({})
    const [genres, setGenres] = useState([])
    const navigate = useNavigate();
    const fetchAllGenres = async () => {
        setGenres(await customGetAllPromiseGenre());
    }
    useEffect(()=>{
        fetchAllGenres();
    }, [])
    const handleChanges = (e) => {
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
            case "maison_edition":
                setLivre({...livre, maison_edition: e.target.value})
                break;
            case "date_edition":
                setLivre({...livre, date_edition: e.target.value})
                break;
            case "genre":
                setLivre({...livre, genreName: e.target.value})
                break;
            case "couverture":
                setLivre({...livre, couverture: e.target.files[0]})
                console.log(livre.couverture)
                break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createLivre()
        navigate("/admin")
    }
    const createLivre = async () => {
        const formData = new FormData();
        formData.append("title", livre.title);
        formData.append("description", livre.description);
        formData.append("prix", livre.prix);
        formData.append("date_edition", livre.date_edition);
        formData.append("maison_edition", livre.maison_edition);
        formData.append("genreName", livre.genreName);
        formData.append("couverture", livre.couverture);
        await customPostPromise(formData);
    }
    return (
        <div>
            <NavbarAdmin/>

        <div className={"container"} style={{marginTop: '10vh', marginRight:'10vw', marginLeft:'10vw', width: '70%'}}>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Title</label>
                    <input name={"title"} className={"form-control"} onChange={handleChanges} placeholder={"title"}/><br/>


                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Description</label>
                    <input name={"description"} className={"form-control"} onChange={handleChanges} placeholder={"description"}/><br/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Price</label>
                    <input name={"prix"} className={"form-control"} type={"number"} onChange={handleChanges} placeholder={"prix"}/><br/>
                </div>
                <select onChange={handleChanges} name={'genre'}>
                    {
                        genres?.map(genre=>(
                            <option value={genre.name}>{genre.name}</option>

                        ))
                    }
                    <option value={"all"}>------</option>
                </select>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Couverture</label>
                    <input name={"couverture"} className={"form-control"} type={"file"} onChange={handleChanges} placeholder={"couverture"}/><br/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Maison d'edition</label>
                    <input name={"maison_edition"} className={"form-control"} onChange={handleChanges} placeholder={"Maison d'edition"}/><br/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Date edition</label>
                    <input name={"date_edition"} type={'date'} className={"form-control"} onChange={handleChanges} placeholder={"Date edition"}/><br/>
                </div>
                <input className={"btn btn-success col col-6"} value={"Ajouter"}  type={"submit"}/>
            </form>
        </div>
        </div>

    )
}

export default isAdmin(AjouterLivre)
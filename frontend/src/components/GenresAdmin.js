import React, {useEffect, useState} from 'react';
import {customGetAllPromiseEdition} from "../metier/EditionService";
import LivreAdmin from "./LivreAdmin";
import EditionAdmin from "./EditionAdmin";
import NavbarAdmin from "./NavbarAdmin";
import GenreAdmin from "./GenreAdmin";
import {customGetAllPromiseGenre} from "../metier/GenreService";
import {Link} from "react-router-dom";
import Footer from "./Footer";

function GenresAdmin(props) {

    const [genres, setGenres] = useState([])
    const [fetchCount, setFetchcout] = useState(0)

    const fetchAllGenres = async () => {
        setGenres(await customGetAllPromiseGenre())
    }

    useEffect(()=>{
        fetchAllGenres();
    },[fetchCount])
    return (
        <div>
            <NavbarAdmin/>
            <div className={'container'} style={{display: 'flex', flexWrap: 'wrap', marginTop: '3vh'}}>
                <Link to={'/ajouter_genre'} className={'btn btn-success'} style={{marginLeft: '70vw'}}>Ajouter Genre</Link>

                <table className="table" style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>


                    {
                        genres?.map(genre=>(
                            <GenreAdmin genre={genre} fetchCount={fetchCount} setFetchcout={setFetchcout} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <Footer/>

        </div>
    );
}

export default GenresAdmin;

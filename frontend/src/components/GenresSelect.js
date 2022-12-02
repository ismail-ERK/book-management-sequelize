import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {customGetAllPromiseGenre} from "../metier/GenreService";
function GenresSelect({setChosenGenre}) {
    const [genres,setGenres] = useState([])
    const fetchAllGenres = async () => {
        setGenres(await customGetAllPromiseGenre());
    }
    useEffect(()=>{
        fetchAllGenres();
    },[])

    const handleGenreChanges = e => {
        setChosenGenre(e.target.value)
        console.log(e.target.value)
    }
    return (
        <div className={"container mt-4"} style={{width: '20vw'}}>
            Genres : <select className="form-select" onChange={handleGenreChanges}>
                {
                    genres?.map(genre=>(
                        <option value={genre.id}>{genre.name}</option>
                    ))
                }
                <option selected value={"all"}>-----</option>
            </select>
        </div>
    );
}

export default GenresSelect;
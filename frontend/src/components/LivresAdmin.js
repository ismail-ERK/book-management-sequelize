import React, {useEffect, useState} from 'react';
import {customGetAllPromise} from "../metier/LivreService";
import Livre from "./Livre";
import {customGetPromiseCommande} from "../metier/CommandeService";
import LivreAdmin from "./LivreAdmin";
import {Link} from "react-router-dom";

function Livres({chosenGenre}) {
    const [livres, setLivres] = useState([])
    const [counterFetch, setCounterFetch] = useState(0)
    const [myBooks, setMyBooks] = useState([])
    const [commandes, setCommandes] = useState([])


    const fetchAllLivres = async () => {
        setLivres(await customGetAllPromise());
        setMyBooks(await customGetAllPromise());


    }

    useEffect(()=>{
        setMyBooks(livres.filter(livre => livre.genreId==chosenGenre))
        if(chosenGenre==='all'){
            setMyBooks(livres)
        }
    },[chosenGenre])
    useEffect(()=>{
        fetchAllLivres();
    }, [counterFetch])

    return (
        <div className={'container'} style={{display: 'flex', flexWrap: 'wrap'}}>
            <Link to={'/ajouter_livre'} className={'btn btn-success'} style={{marginLeft: '70vw'}}>Ajouter livre</Link>
            <table className="table" style={{textAlign: 'center'}}>
                <thead>
                <tr>
                    <th scope="col">Book</th>
                    <th scope="col">Titre</th>
                    <th scope="col">Prix</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>


                {
                    myBooks?.map(livre=>(
                        <LivreAdmin livre={livre} counterFetch={counterFetch} setCounterFetch={setCounterFetch} />
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default Livres;
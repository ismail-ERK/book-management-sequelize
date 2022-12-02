import React, {useEffect, useState} from 'react';
import {customGetAllPromise} from "../metier/LivreService";
import Livre from "./Livre";
import {customGetPromiseCommande} from "../metier/CommandeService";

function Livres({chosenGenre, chosenSort, chosenSearch}) {
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
        setMyBooks(livres.filter(livre => livre.title.includes(chosenSearch)))
    },[chosenSearch])
    const ordonnerLivres = () => {
        if(chosenSort==1){
            console.log('incre')
            setMyBooks(myBooks.sort((a, b) => parseFloat(b.prix) - parseFloat(a.prix)))
        }
        if(chosenSort==-1){
            console.log('decre')
            setMyBooks(myBooks.sort((a, b) => parseFloat(b.prix) - parseFloat(a.prix)).reverse())
        }
    }
    useEffect(()=>{
        ordonnerLivres()
        ordonnerLivres()

    },[chosenSort])
    useEffect(()=>{
        ordonnerLivres()

    },[])
    useEffect(()=>{
        fetchAllLivres();
        ordonnerLivres()

    }, [counterFetch])

    return (
        <div className={'container'} style={{display: 'flex', flexWrap: 'wrap', marginTop:'8vh'}}>

            {

                myBooks?.map(livre=>(
                    <Livre livre={livre} counterFetch={counterFetch} setCounterFetch={setCounterFetch} />
                ))
            }
        </div>
    );
}

export default Livres;
import React, {useEffect, useState} from 'react';
import {customGetAllPromiseEdition} from "../metier/EditionService";
import LivreAdmin from "./LivreAdmin";
import EditionAdmin from "./EditionAdmin";
import NavbarAdmin from "./NavbarAdmin";
import {customGetPromiseCommande} from "../metier/CommandeService";
import CommandeAdmin from "./CommandeAdmin";
import Footer from "./Footer";

function CommandesAdmin(props) {

    const [commandes, setCommandes] = useState([])
    const [fetchCount, setFetchcout] = useState(0)

    const fetchAllEditions = async () => {
        setCommandes(await customGetPromiseCommande())
    }

    useEffect(()=>{
        fetchAllEditions();
    },[fetchCount])
    return (
        <div>
            <NavbarAdmin/>
            <div className={'container'} style={{display: 'flex', flexWrap: 'wrap', marginTop: '3vh'}}>

                <table className="table" style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User id</th>
                        <th scope="col">Livre id</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>


                    {
                        commandes?.map(commande=>(
                            <CommandeAdmin commande={commande} fetchCount={fetchCount} setFetchcout={setFetchcout} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    );
}

export default CommandesAdmin;

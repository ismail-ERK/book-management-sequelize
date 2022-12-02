import React, {useEffect, useState} from 'react';
import {customGetAllPromiseEdition} from "../metier/EditionService";
import LivreAdmin from "./LivreAdmin";
import EditionAdmin from "./EditionAdmin";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";

function EditionsAdmin(props) {

    const [editions, setEditions] = useState([])
    const [fetchCount, setFetchcout] = useState(0)

    const fetchAllEditions = async () => {
        setEditions(await customGetAllPromiseEdition())
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
                        <th scope="col">Maison Edition</th>
                        <th scope="col">Date Editions</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>


                    {
                        editions?.map(edition=>(
                            <EditionAdmin edition={edition} fetchCount={fetchCount} setFetchcout={setFetchcout} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <Footer/>

        </div>
    );
}

export default EditionsAdmin;

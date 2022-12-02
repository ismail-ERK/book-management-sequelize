import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {customPostPromiseEditionToBook} from "../metier/LivreService";
import isAdmin from "../hoc/IsAdmin";

function AjouterEdition(props) {
    const [edition, setEdition] = useState()
    const {id} = useParams();
    const navigate = useNavigate();

    const handleChanges = (e) => {
            switch (e.target.name){

                case "maison_edition":
                    setEdition({...edition, maison_edition: e.target.value})
                    break;
                case "date_edition":
                    setEdition({...edition, date_edition: e.target.value})
                    break;

            }

    }
    const addEditionToBook = async () => {
        await customPostPromiseEditionToBook(id, edition)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addEditionToBook();
        navigate('/info/'+id)
    }
    return (
        <div>
            <form onSubmit={handleSubmit    }>
                <input onChange={handleChanges} name={'maison_edition'}/>
                <input onChange={handleChanges} name={'date_edition'} type={'date'}/>
                <input type={'submit'}/>
            </form>

        </div>
    );
}

export default isAdmin(AjouterEdition);
import React, {useEffect, useState} from 'react';
import {customGetAllPromiseEdition} from "../metier/EditionService";
import LivreAdmin from "./LivreAdmin";
import EditionAdmin from "./EditionAdmin";
import NavbarAdmin from "./NavbarAdmin";
import GenreAdmin from "./GenreAdmin";
import {customGetAllPromiseGenre} from "../metier/GenreService";
import {Link} from "react-router-dom";
import {customGetAllPromiseUsers} from "../metier/UsersService";
import UserAdmin from "./UserAdmin";
import Footer from "./Footer";

function UsersAdmin(props) {

    const [users, setUsers] = useState([])
    const [fetchCount, setFetchcout] = useState(0)

    const fetchAllUsers = async () => {
        setUsers(await customGetAllPromiseUsers())
    }

    useEffect(()=>{
        fetchAllUsers();
    },[fetchCount])
    return (
        <div>
            <NavbarAdmin/>
            <div className={'container'} style={{display: 'flex', flexWrap: 'wrap', marginTop: '5vh'}}>

                <table className="table" style={{textAlign: 'center'}}>
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>


                    {
                        users?.map(user=>(
                            <UserAdmin user={user} fetchCount={fetchCount} setFetchcout={setFetchcout} />
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    );
}

export default UsersAdmin;

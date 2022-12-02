import React from 'react';
import {customGetOnePromise} from "../metier/LivreService";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {customGetAllPromiseEditionByLivre} from "../metier/EditionService";
import {customPostPromiseRegistration} from "../metier/AuthService";
import swal from "sweetalert";
import {customPostPromiseCommande} from "../metier/CommandeService";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function LivreInfo() {
    const [livre, setLivre] = useState({})
    const [editions, setEditions] = useState([])
    const [counterFetch, setCounterFetch] = useState(0)
    const [image, setImage] =useState("")
    const navigate = useNavigate()
    const params = useParams();

    useEffect(()=>{
        getBook()
        getBookEditions()
        setImage('http://localhost:8012/images/'+livre.couverture)

    },[counterFetch])
    const getBook = async () => {
        let res = await customGetOnePromise(params.id);
        setLivre(res[0])
        console.log(livre)
    }
    const getBookEditions = async () => {
        let res = await customGetAllPromiseEditionByLivre(params.id);
        setEditions(res)
        console.log(livre)
    }
    const handleCommander = async () => {
        if(!localStorage.getItem("token")){
           navigate('/login')
        }
        else {
            if(await customPostPromiseCommande({livreId: livre.id})){
                await swal("Good job!", "You clicked the button!", "success")
                navigate('/')
            }
            else {
                await swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this imaginary file!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
            }
        }
    }
    return (
        <div>
            <Navbar/>
            <div style={{marginLeft: '80vw', marginTop: '5vh'}}>
                {livre.commander ? <button className={'btn btn-info'} disabled>Indisponible</button> :
                    <button className={'btn btn-success'} onClick={handleCommander}>Commander</button>}
            </div>
            <div>
                <center><img src={'http://localhost:8012/images/'+livre?.couverture} height={'300'} width={'300'}/></center>
            </div>

            <div style={{textAlign: 'center'}}>
                <h3>Title: {livre.title}</h3>
                <h3>Description: {livre.description}</h3>
                <h3>Price: {livre.prix}</h3>
            </div>
            <div className={'container'}>
                <h2>Editions</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Maison edition</th>
                        <th scope="col">Date edition</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        editions?.map(edition => (
                            <tr>
                                <th scope="row">{edition.maison_edition}</th>
                                <td>{edition.date_edition}</td>
                            </tr>
                        ))
                    }


                    </tbody>
                </table>
            </div>
            <Footer/>
        </div>
    );
}

export default LivreInfo;
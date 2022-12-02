import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    customGetOnePromiseUsers,
    customGetOnePromiseUsersCommandes,
    customPutPromiseUsers, customPutPromiseUsersPhoto
} from "../../metier/UsersService";
import {getPrincipalId} from "../../metier/AuthService";
import './Profile.css'
import Navbar from "../../components/Navbar";
import LivreAdmin from "../../components/LivreAdmin";
import CommandeItem from "../../components/CommandeItem";
import {Modal} from "react-bootstrap";
import {customDeletePromiseCommande} from "../../metier/CommandeService";
import swal from "sweetalert";
import {VARIABLE_ENVIRONEMENT} from "../../consts/Consts";
import Footer from "../../components/Footer";
function Profile(props) {
    const [user, setUser] = useState({})
    const [updatedUser, setUpdatedUser] = useState({...user})
    const [commandes, setCommandes] = useState([])
    const [counterFetch, setCounterFetch] = useState(0)
    const [showAdd, setShowAdd] = useState(false);
    const [photo, setPhoto] = useState();


    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const getUser = async () => {
        let users = (await customGetOnePromiseUsers(getPrincipalId()))
        setUser(users[0])
        setUpdatedUser(users[0])
        console.log("user",user)
    }
    const getCommandes = async () => {
        setCommandes(await customGetOnePromiseUsersCommandes(getPrincipalId()))
    }
    useEffect(()=>{
        getUser();
        getCommandes();
    },[counterFetch])
    useEffect(()=>{
        console.log(commandes)
        console.log(commandes)
        console.log(user)
    })
    const handleUpdadeSubmit = async (e) => {
        e.preventDefault()
        if(await customPutPromiseUsers(user.id, updatedUser)){
            await swal("Good job!", "You clicked the button!", "success")
            handleCloseAdd()
            setCounterFetch(counterFetch+1)
            setCounterFetch(counterFetch+1)
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
    const handleUpdadeChanges = (e) => {
            switch (e.target.name){
                case 'name':
                    setUpdatedUser({...updatedUser, name: e.target.value})
                    break;
                case 'email':
                    setUpdatedUser({...updatedUser, email: e.target.value})
                    break;
                case "photo":
                    setPhoto(e.target.files[0])
                    break;
            }
    }


    const updatePhoto = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("photo", photo);
        console.log(formData)
        await customPutPromiseUsersPhoto(user.id,formData)
        setCounterFetch(counterFetch+1)
        setCounterFetch(counterFetch+1)
    }
    return (
        <div>
            <Navbar/>
        <section className="bg-light">
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier Utilisateur</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={handleUpdadeSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Name</label>
                            <input type="text" name={"name"} className="form-control" id="exampleInputEmail1"
                                   onChange={handleUpdadeChanges}
                                   value={updatedUser.name}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Email</label>
                            <input type="email" name={"email"} className="form-control" id="exampleInputPassword1"
                                   onChange={handleUpdadeChanges}
                                   value={updatedUser.email}/>
                        </div>

                        <button type="submit" className="btn btn-warning mt-3">Update</button>
                    </form>

                </Modal.Body>
            </Modal>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <div className="card card-style1 border-0">
                            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                <div className="row align-items-center">
                                    <div className="col-lg-3 mb-4 mb-lg-0" style={{display: 'flex', flexDirection: 'column'}}>
                                        <img height={'300'} width={'240'} src={VARIABLE_ENVIRONEMENT.HOST+":"+VARIABLE_ENVIRONEMENT.PORT+"/images/users/"+user.photo} alt="..."/>
                                       <form onSubmit={updatePhoto}>
                                           <input type={"file"} className={'form-control mt-2'} onChange={handleUpdadeChanges} name={"photo"}/>
                                           <input type={'submit'} className={'btn btn-outline-info mt-2'} onClick={updatePhoto} value={'Update Image'}/>
                                       </form>

                                    </div>

                                    <div className="col-lg-4 px-xl-10">
                                        <div
                                            className="bg-secondary d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                            <h3 className="h4 text-white mb-0">{user?.name}</h3>
                                        </div>
                                        <ul className="list-unstyled mb-1-9">

                                            <li className="mb-2 mb-xl-3 display-28"><span
                                                className="display-26 text-secondary me-2 font-weight-600">Email:</span> {user?.email}
                                            </li>

                                        </ul>

                                    </div>
                                    <button className="col-lg-2 px-xl-10 btn btn-outline-warning" onClick={()=>handleShowAdd()}>Modifier</button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-12 mb-4 mb-sm-5">
                                <div className="mb-4 mb-sm-5">
                                    <span className="section-title text-primary mb-3 mb-sm-4">Mes commandes</span>

                                    <table className="table" style={{textAlign: 'center'}}>
                                        <thead>
                                        <tr>
                                            <th scope="col">Book</th>
                                            <th scope="col">Date de commande</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>


                                        {
                                            commandes?.map(commande=>(
                                                <CommandeItem commande={commande} counterFetch={counterFetch} setCounterFetch={counterFetch} />
                                            ))
                                        }
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            <Footer/>
        </div>

    );
}

export default Profile;
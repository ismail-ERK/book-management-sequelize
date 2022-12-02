import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Home from "../pages/Home";
import LivreInfo from "../pages/LivreInfo";
import HomeAdmin from "../pages/HomeAdmin";
import UpdateLivre from "../pages/UpdateLivre";
import LivreInfoAdmin from "../pages/LivreInfoAdmin";
import AjouterEdition from "../pages/AjouterEdition";
import UpdateEdition from "../pages/UpdateEdition";
import EditionsAdmin from "../components/EditionsAdmin";
import UpdateGenre from "../pages/UpdateGenre";
import GenresAdmin from "../components/GenresAdmin";
import AjouterLivre from "../pages/AjouterLivre";
import AjouterGenre from "../pages/AjouterGenre";
import CommandesAdmin from "../components/CommandesAdmin";
import CommandeInfo from "../pages/CommandeInfoAdmin";
import UsersAdmin from "../components/UsersAdmin";
import Profile from "../pages/profile/Profile";

function RoutingSystem(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login />}/>
                    <Route exact path="/profile" element={<Profile />}/>
                    <Route exact path="/ajouter_genre" element={<AjouterGenre />}/>
                    <Route exact path="/" element={<Home />}/>
                    <Route exact path="/admin" element={<HomeAdmin />}/>
                    {/*<Route exact path="/" element={<HomeUser />}/>*/}
                    <Route exact path="/ajouter_livre" element={<AjouterLivre />}/>
                    <Route exact path="/info/:id" element={<LivreInfo />}/>
                    <Route exact path="/info/admin/:id" element={<LivreInfoAdmin />}/>
                    <Route exact path="/update/:id" element={<UpdateLivre />}/>
                    <Route exact path="/update/edition/:id" element={<UpdateEdition />}/>
                    <Route exact path="/update/genre/:id" element={<UpdateGenre />}/>
                    <Route exact path="/ajouter_edition/:id" element={<AjouterEdition />}/>
                    <Route exact path="/register" element={<Register />}/>
                    <Route exact path="/admin/editions" element={<EditionsAdmin />}/>
                    <Route exact path="/admin/genres" element={<GenresAdmin />}/>
                    <Route exact path="/admin/commandes" element={<CommandesAdmin />}/>
                    <Route exact path="/admin/users" element={<UsersAdmin />}/>
                    <Route exact path="/admin/commande/info/:id" element={<CommandeInfo />}/>
                    <Route exact path="*" element={<NotFound />}/>


                </Routes>
            </BrowserRouter>

        </div>
    );
}

export default RoutingSystem;
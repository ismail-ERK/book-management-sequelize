import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import GenresSelect from "../components/GenresSelect";
import Livres from "../components/Livres";
import NavbarAdmin from "../components/NavbarAdmin";
import LivresAdmin from "../components/LivresAdmin";
import isAdmin from "../hoc/IsAdmin";
import Footer from "../components/Footer";

function HomeAdmin() {
    const [chosenGenre,setChosenGenre] = useState(1)
    return (
        <div>
            <NavbarAdmin/>
            <GenresSelect setChosenGenre={setChosenGenre}/>
            <LivresAdmin chosenGenre={chosenGenre}/>
            <Footer/>
        </div>
    );
}

export default isAdmin(HomeAdmin);
import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import GenresSelect from "../components/GenresSelect";
import Livres from "../components/Livres";
import Filtre from "../components/Filtre";
import Footer from "../components/Footer";

function Home() {
    const [chosenGenre,setChosenGenre] = useState(1)
    const [chosenSort,setChosenSort] = useState(0)
    const [chosenSearch, setChosenSearch] = useState('')
    return (
        <div>
            <Navbar/>
            <Filtre setChosenGenre={setChosenGenre} chosenSort={chosenSort} setChosenSort={setChosenSort}
                    chosenSearch={chosenSearch} setChosenSearch={setChosenSearch}/>
            <Livres chosenGenre={chosenGenre} chosenSort={chosenSort} chosenSearch={chosenSearch}/>
            <Footer/>
        </div>
    );
}

export default Home;
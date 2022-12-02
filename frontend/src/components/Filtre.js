import React, {useRef} from 'react';
import GenresSelect from "./GenresSelect";
import SortList from "./filtre/SortList";
import {Modal} from "react-bootstrap";
import {useState} from "react";
import logo from '../asset/filter.jpg'
import refreshLogo from '../asset/refresh.png'
import Search from "./filtre/Search";

function Filtre({setChosenGenre, chosenSort, setChosenSort, chosenSearch, setChosenSearch}) {
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    return (
        <div style={{display: 'flex'}}>
            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Filtre:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GenresSelect setChosenGenre={setChosenGenre} />
                    <SortList chosenSort={chosenSort} setChosenSort={setChosenSort} />
                    <Search chosenSearch={chosenSearch} setChosenSearch={setChosenSearch} />

                </Modal.Body>
            </Modal>

            <button  onClick={handleShowAdd} style={{cursor: 'pointer',all: 'unset', height: '6vh', position: "absolute", right: '10vw', top: '8vh'}}>
                <img src={logo} style={{height: '100%', width: '100%'}}/>
            </button>
        </div>
    );
}

export default Filtre;
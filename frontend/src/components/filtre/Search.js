import React, {useEffect, useRef} from 'react';

function Search({chosenSearch, setChosenSearch}) {
    const handleSearch = e => {
        setChosenSearch(e.target.value)
    }

    return (
        <div className={"container mt-4"} style={{width: '20vw'}}>
            Search : <input type={"text"} onChange={handleSearch} className={"form-control"}/>
        </div>
    );
}

export default Search;

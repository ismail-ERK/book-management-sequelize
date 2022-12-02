import React from 'react';

function SortList({chosenSort, setChosenSort}) {
    const handleSortChange = e => {
        setChosenSort(e.target.value)
    }
    return (
        <div className={"container mt-4"} style={{width: '20vw'}}>
            Sort : <select className="form-select" onChange={handleSortChange}>
            <option value={1}>Moins chere</option>
            <option value={-1}>Plus chere</option>
            </select>
        </div>
    );
}

export default SortList;

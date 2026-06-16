function FilterInput({filterTerm, onFilterChange}) {
    
    return (
        <div className="filterInput-container">
            <label htmlFor='filterInput' className="filterInput-label">Search Todos:</label>
            <input 
               className="filterInput-input"
               type="text" 
               name="" 
               id='filterInput' 
               value={filterTerm} 
               onChange={(e) => onFilterChange(e.target.value)}
               placeholder='Search by title...'
               />
        </div>
    )
}

export default FilterInput;

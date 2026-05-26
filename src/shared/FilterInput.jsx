function FilterInput({filterTerm, onFilterChange}) {
    
    return (
        <div>
            <label htmlFor='filterInput'>Search Todos:</label>
            <input 
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

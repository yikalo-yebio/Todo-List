
function SortBy({sortBy, sortDirection, onSortByChange, onSortDirectionChange}) {
    
    return (
        <div className="sort-container">
           <div className="sortBy-container">
               <label htmlFor="sort-by" className="sortBy-label">Sort by</label>
               <select name="" id="sort-by" className="sortBy-select" value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
                      <option value="createdDate">Creation Date</option>
                      <option value="title">Title</option>
               </select>
           </div>
           <div className="sortOrder-container">
              <label htmlFor="sort-order" className="sortOrder-label">Order</label>
             <select name="" id="sort-order"  className="sortOrder-select" value={sortDirection} onChange={(e) => onSortDirectionChange(e.target.value)}>
                     <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
             </select>
           </div>
        </div>
    )
}

export default SortBy;

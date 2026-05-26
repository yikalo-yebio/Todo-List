
function SortBy({sortBy, sortDirection, onSortByChange, onSortDirectionChange}) {
    
    return (
        <>
          <label htmlFor="sort-by">Sort by</label>
          <select name="" id="sort-by" value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
            <option value="creationDate">Creation Date</option>
            <option value="title">Title</option>
          </select>

          <label htmlFor="sort-order">Order</label>
          <select name="" id="sort-order" value={sortDirection} onChange={(e) => onSortDirectionChange(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </>
    )
}

export default SortBy;

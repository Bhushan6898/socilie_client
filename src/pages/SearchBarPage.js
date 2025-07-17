import React from 'react';

function SearchBarPage() {
  return (
    <div className="container py-4">
      <h2>Search</h2>
      <input className="form-control mb-3" type="search" placeholder="Search users, posts..." />
      {/* Add search results here */}
    </div>
  );
}

export default SearchBarPage;

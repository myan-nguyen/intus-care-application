import React from 'react';

interface SortFilterProps {
  sortOrder: 'asc' | 'desc';
  sortBy: 'name' | 'codeCount';
  onSortChange: (order: 'asc' | 'desc') => void;
  onSortByChange: (criteria: 'name' | 'codeCount') => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ sortBy, sortOrder, onSortChange, onSortByChange }) => {
  return (
    <div className="sort-filter-container">
      {/* Sort Alphabetically Button*/}
        <button
          className="alphabetical-sort"
          onClick={() => onSortByChange(sortBy === 'codeCount' ? 'name' : 'codeCount')}
        >
          Sort by {sortBy === 'codeCount' ? 'Name' : 'ICD Code Count'}
        </button>

      <select onChange={(e) => onSortByChange(e.target.value as 'name' | 'codeCount')}>
        <option value="codeCount">Sort by ICD Code Count</option>
        <option value="name">Sort by Name</option>
      </select>
      <button onClick={() => onSortChange(sortOrder === 'desc' ? 'asc' : 'desc')}>
        Sort {sortOrder === 'desc' ? 'Ascending' : 'Descending'}
      </button>
    </div>
  );
};

export default SortFilter;
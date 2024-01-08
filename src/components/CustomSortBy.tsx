import React from 'react';
import {useSortBy, UseSortByProps,} from 'react-instantsearch';

function SortBy(props: UseSortByProps) {
    const {currentRefinement, options, refine} = useSortBy(props);

    return (
        <select
            onChange={(event) => refine(event.target.value)}
            value={currentRefinement}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SortBy
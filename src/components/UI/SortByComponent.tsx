import React, {memo, useEffect} from "react";
import {useSortBy} from "react-instantsearch";

const SortByComponent = () => {

    const props = {
        items: [
            {
                label: 'Sort By',
                value: 'prod_boats',
            },
            {
                label: 'Recently Added',
                value: 'prod_boats_latest',
            },
            {
                label: 'Price: Low to High',
                value: 'prod_boats_price_asc',
            },
            {
                label: 'Price: High to Low',
                value: 'prod_boats_price_desc',
            }
        ]
    }
    const {currentRefinement, options, refine} = useSortBy(props);

    useEffect(() => {
        if ('MM_SORT_BY_PRICE' in window) {
            refine('prod_boats_price_asc')
        }
    }, []);

    return (
        <select
            onChange={(event) => refine(event.target.value)}
            value={currentRefinement}
            className={"bg-white py-3.5 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 pr-4"}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );


}

export default memo(SortByComponent)
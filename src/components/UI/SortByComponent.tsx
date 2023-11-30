import React, {memo} from "react";
import {SortBy} from "react-instantsearch";

const SortByComponent = () => <SortBy
    className="container-option"
    items={[
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
    ]}
/>

export default memo(SortByComponent)
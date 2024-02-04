import React from 'react';
import {useRefinementList, UseRefinementListProps, useSortBy} from 'react-instantsearch';

const CustomSwitch = (props: UseRefinementListProps) => {

    const {
        items,
        refine,
    } = useRefinementList(props);
    const sortByProps = {
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

    const {currentRefinement, refine: sortByRefine} = useSortBy(sortByProps);


    return (
        <div className={"-mx-3 px-3 py-3 pt-6"}>
            <div className={"-mx-3 mb-3 px-3"}>
                <fieldset className={"switch-bar switch-bar-sm switch-bar-block w-full"}>
                    <legend className="sr-only">Vehicle Condition</legend>
                    {items.map((item) => (
                        <label key={item.value} className="form-radio-control w-full">
                            <input
                                onChange={() => {
                                    if (item.value.toLowerCase() === 'used' &&
                                        currentRefinement !== 'prod_boats_price_asc'
                                    ) {
                                        sortByRefine('prod_boats_price_asc')
                                    }
                                    refine(item.value)
                                }}
                                className="form-radio-control-input custom-control-input" type="checkbox"
                                checked={item.isRefined}/>
                            <div className="w-full switch switch-radio">{item.value}</div>
                        </label>
                    ))}

                </fieldset>
            </div>
        </div>
    );
}

export default CustomSwitch
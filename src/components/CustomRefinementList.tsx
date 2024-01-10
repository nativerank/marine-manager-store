import React, {useEffect} from 'react';
import {useRefinementList, UseRefinementListProps} from 'react-instantsearch';
import Check from "./Icons/Check";
import classNames from "classnames";
import {RefinementListItem} from "instantsearch.js/es/connectors/refinement-list/connectRefinementList";
import {mergeArrays} from "../utils";

const CustomRefinementList = (props: UseRefinementListProps & { cacheRefinements?: string }) => {

    const {
        items,
        refine,
        canToggleShowMore,
        isShowingMore,
        toggleShowMore,
    } = useRefinementList(props);

    useEffect(() => {
        // if (props.cacheRefinements && !('REFINEMENT_CACHE' in window)) {
        //     (window as any).REFINEMENT_CACHE = {}
        // }


        if (props.cacheRefinements && items.length && 'REFINEMENT_CACHE' in window && props.cacheRefinements in (window as any).REFINEMENT_CACHE && (window as any).REFINEMENT_CACHE[props.cacheRefinements].length === 0) {
            (window as any).REFINEMENT_CACHE[props.cacheRefinements] = items
        } else {
            // (window as any).REFINEMENT_CACHE[props.attribute] = []
        }
    }, [items]);


    return (
        <>

            <ul>
                {mergeArrays((window as any).REFINEMENT_CACHE?.[props.attribute], items).map((item: RefinementListItem | any) => (
                    <li key={item.label} className={"flex mt-3"}>

                        <div
                            className="field-container-challenger w-full">
                            <label
                                className="custom-control form-check-label ">
                                <input
                                    className="custom-control-input custom-control-input-checkbox"
                                    aria-label={`${item.label}: ${item.count} results`}
                                    type="checkbox"
                                    checked={item.isRefined}
                                    onChange={() => refine(item.value)}
                                />
                                <div className="indicator-wrapper">
                                    <div
                                        className={classNames(
                                            `custom-control-indicator custom-control-indicator-checkbox mr-2`,
                                            {
                                                'bg-blue-900 border-transparent': item.isRefined,
                                                'bg-white': !item.isRefined
                                            }
                                        )}
                                    >
                                        {<Check aria-hidden={true} className={classNames("fill-white", {
                                            'opacity-0': !item.isRefined,
                                            'opacity-100': item.isRefined
                                        })}/>}
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="">
                                        <div className="flex justify-between">
                                            <div>{item.label}</div>
                                            <div
                                                className="mx-2">{item.count}
                                            </div>
                                            <span className="sr-only">results</span></div>
                                    </div>
                                </div>
                            </label></div>
                    </li>

                ))}
            </ul>
            {props.showMore && <button onClick={toggleShowMore} disabled={!canToggleShowMore}>
                {isShowingMore ? 'Show less' : 'Show more'}
            </button>}
        </>
    );
}

export default CustomRefinementList
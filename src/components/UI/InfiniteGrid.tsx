import {useInfiniteHits} from "react-instantsearch";
import React, {useRef} from "react";
import ColHit from "./ColHit";


type HitType = any | {
    image: string;
    name: string;
    categories: string[];
    description: string;
    price: number;
};


function InfiniteGrid(props: any) {

    const {hits, isLastPage, showMore, sendEvent} = useInfiniteHits(props);
    const sentinelRef = useRef(null);


    return (
        <div>
            <div className="ais-InfiniteList">
                <div data-uk-grid className="grid gap-4 grid-cols-12">
                    {hits.map((hit: any) => (
                        <div ref={sentinelRef} key={hit.objectID} className="col-span-12 md:col-span-6 lg:col-span-4">
                            <ColHit
                                hit={hit} sendEvent={sendEvent}/>
                        </div>
                    ))}
                </div>
            </div>
            {!isLastPage && <div style={{textAlign: 'center', paddingTop: 30}}>
                <a style={{
                    background: '#1d45f9',
                    color: '#fff',
                    padding: '0 20px',
                    lineHeight: '36px',
                    display: 'inline-block',
                    cursor: 'pointer'
                }}
                   onClick={() => showMore()}
                >
                    Show More
                </a>
            </div>}
        </div>
    );

}

export default InfiniteGrid

import {useInfiniteHits} from "react-instantsearch";
import React, {memo, useRef} from "react";
import Hit from "./Hit";

const InfiniteHits = (props: any) => {

    const {hits, isLastPage, showMore, sendEvent} = useInfiniteHits(props);
    const sentinelRef = useRef(null);


    return (
        <div>
            <div className="ais-InfiniteHits">
                <ul className="uk-grid uk-child-width-1-1" data-uk-grid>
                    {hits.map((hit: any) => (
                        <li ref={sentinelRef} key={hit.objectID} className="ais-InfiniteHits-item">
                            <Hit hit={hit} sendEvent={sendEvent} onSelectBoatSpecs={props.onSelectBoatSpecs}/>
                        </li>
                    ))}
                </ul>
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

export default memo(InfiniteHits)
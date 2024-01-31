import {useInfiniteHits} from "react-instantsearch";
import React, {memo, useRef} from "react";
import Hit from "./Hit";

const InfiniteList = (props: any) => {

    const {hits, isLastPage, showMore, sendEvent} = useInfiniteHits(props);
    const sentinelRef = useRef(null);


    return (
        <div>
            <div className="ais-InfiniteHits">
                <ul>
                    {hits.map((hit: any) => (
                        <li ref={sentinelRef} key={hit.objectID} className="ais-InfiniteHits-item">
                            <Hit hit={hit} sendEvent={sendEvent} link={"/"}/>
                        </li>
                    ))}
                </ul>
            </div>
            {!isLastPage && <div style={{textAlign: 'center', paddingTop: 30}}>
                <a style={{
                    padding: '0 20px',
                    lineHeight: '36px',
                    display: 'inline-block',
                    cursor: 'pointer'
                }}
                   className={"bg-[var(--mm-cta-show-more-bg)] hover:bg-[var(--mm-cta-show-more-bg-hover)] text-[var(--mm-cta-show-more-text)]"}
                   onClick={() => showMore()}
                >
                    Show More
                </a>
            </div>}
        </div>
    );

}

export default memo(InfiniteList)

import {Highlight, useInfiniteHits} from "react-instantsearch";
import React, {useMemo, useRef} from "react";
import {formatNumber} from "../../utils";
import {BOAT_PLACEHOLDER_IMAGE} from "./Hit";
import {SendEventForHits} from "instantsearch.js/es/lib/utils";


type HitType = any | {
    image: string;
    name: string;
    categories: string[];
    description: string;
    price: number;
};

function Hit({hit, sendEvent}: { hit: HitType, sendEvent: SendEventForHits }) {

    const link = useMemo(() => {
        return `${(window as any).MM_DOMAIN}/${hit.usage.toLowerCase()}${(window as any).MM_USAGE_SLUG}/${hit.manufacturer.slug}/${hit.slug}`
    }, [hit])

    return (
        <div>
            <a onClick={() => sendEvent('click', hit, 'Boat Clicked')}
               href={`${(window as any).MM_DOMAIN}/${hit.usage.toLowerCase()}${(window as any).MM_USAGE_SLUG}/${hit.manufacturer.slug}/${hit.slug}`}
               className={"uk-card uk-card-default  uk-card-small uk-link-reset uk-display-block"}>
                <div className="uk-grid uk-child-width-expand@m uk-grid-collapse" data-uk-grid>
                    <div className={"uk-width-1-1@m"}>
                        <header className="uk-width-1-1">
                            <a href={link} className={"uk-link-reset"}
                               onClick={() => sendEvent('click', hit, 'Boat Clicked')}>
                                <div className={"uk-grid uk-grid-collapse uk-child-width-1-2 uk-child-width-1-1@m"}>
                                    <div>
                                        <div className="uk-cover-container" style={{
                                            borderBottom: '1px solid #fcfcfc',
                                            minHeight: '100%'
                                        }}>
                                            <canvas height={210} className={"uk-visible@m"}/>
                                            <canvas height={120} className={"uk-hidden@m"}/>
                                            <img
                                                // style={{height: 120, objectFit: "cover", borderBottom: '1px solid #fcfcfc'}}
                                                src={hit.images && Array.isArray(hit.images) && hit.images.length > 0 ? (
                                                    (hit.images[0] as string).includes('cdn.nativerank.com') ? `${hit.images[0]}/tr:w-400` : hit.images[0]

                                                ) : BOAT_PLACEHOLDER_IMAGE} loading={"lazy"} alt={hit.name}
                                                data-uk-cover={true}
                                            />

                                        </div>
                                    </div>
                                    {hit.images && Array.isArray(hit.images) && hit.images.length > 2 &&
                                        <div className={"uk-width-1-4 uk-width-1-2@m"}>
                                            <img style={{
                                                height: 80, objectFit: "cover"
                                            }}
                                                 src={(hit.images[1] as string).includes('cdn.nativerank.com') ? `${hit.images[1]}/tr:w-175` : hit.images[1]}
                                                 loading={"lazy"} alt={hit.name}
                                                 className="hit-image"/>
                                        </div>}
                                    {hit.images && hit.images.length > 2 &&
                                        <div className={"uk-width-1-4 uk-width-1-2@m uk-position-relative"} style={{
                                            borderLeft: '1px solid #fcfcfc'
                                        }}>
                                            <img
                                                style={{height: 80, objectFit: "cover", display: 'block'}}
                                                src={(hit.images[2] as string).includes('cdn.nativerank.com') ? `${hit.images[2]}/tr:w-175` : hit.images[2]}
                                                loading={"lazy"} alt={hit.name}
                                                className="hit-image"/>
                                            
                                        </div>}


                                </div>
                                {hit.status && <span className={"uk-position-absolute status-ribbon"}>
                            {hit.status}
                        </span>}
                            </a>
                        </header>
                    </div>
                    <div className={"uk-position-relative"}>
                        <div className="uk-card-body uk-card-small el-content ">
                            <div className={"el-header"}>
                                <div style={{
                                    "textTransform": "uppercase",
                                    "background": "#f2f2f2",
                                    "padding": "0.0625rem 0.5125rem",
                                    "marginTop": "0.3125rem!important",
                                    "marginBottom": "0",
                                    "color": "#29abe2",
                                    fontWeight: 600,
                                    "fontSize": ".90rem",
                                    "lineHeight": "1.5",
                                    display: 'inline-block'
                                }}>
                                    {hit.usage}
                                </div>
                                <div style={{
                                    "textTransform": "uppercase",
                                    "background": "#f2f2f2",
                                    "padding": "0.0625rem 0.5125rem",
                                    "marginTop": "0.3125rem!important",
                                    "marginBottom": "0",
                                    "color": "#29abe2",
                                    fontWeight: 600,
                                    "fontSize": ".90rem",
                                    "lineHeight": "1.5",
                                    display: 'inline-block',
                                    marginLeft: 8
                                }}>
                                    {hit.location.city}, {hit.location.state}
                                </div>
                                <a href={link} onClick={() => sendEvent('click', hit, 'Boat Clicked')}>
                                    <h3 className={"el-title uk-h4 uk-margin-top"}>
                                        <Highlight attribute="name" highlightedTagName="mark" hit={hit}/>
                                    </h3>
                                </a>
                            </div>
                            {hit.stock_number && <p className="hit-category">Stock #: <b>{hit.stock_number}</b></p>}

                            <div className={'hit-content'}>

                                <div className={"el-price-header"}>
                                    {!hit.price || hit.price === 0 || hit.status.toLowerCase() === 'call for price'
                                        ?
                                        <div>
                                            Call For Price
                                        </div>
                                        :
                                        <>
                                            <span className="hit-em">$</span>{' '}
                                            <strong>{formatNumber(hit.price)}</strong>{' '}
                                        </>}
                                </div>


                            </div>


                        </div>
                    </div>
                </div>


            </a>


        </div>
    );
}


function InfiniteGrid(props: any) {

    const {hits, isLastPage, showMore, sendEvent} = useInfiniteHits(props);
    const sentinelRef = useRef(null);


    return (
        <div>
            <div className="ais-InfiniteHits">
                <div data-uk-grid className="uk-grid uk-child-width-1-3@s">
                    {hits.map((hit: any) => (
                        <div ref={sentinelRef} key={hit.objectID} className="ais-InfiniteHits-item">
                            <Hit hit={hit} sendEvent={sendEvent}/>
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

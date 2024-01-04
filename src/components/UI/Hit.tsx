import React, {memo, useMemo, useState} from "react";
import {Highlight} from "react-instantsearch";
import {formatNumber, getCDNImage} from "../../utils";
import {SendEventForHits} from "instantsearch.js/es/lib/utils";

type HitType = any | {
    image: string;
    name: string;
    categories: string[];
    description: string;
    price: number;
    rating: string;
};
export const BOAT_PLACEHOLDER_IMAGE = 'https://cdn.nativerank.com/image_coming_soon_HSUNu2mUx.jpg?tr=w-325'

const Hit = memo(({hit, onSelectBoatSpecs, sendEvent}: {
    hit: HitType, onSelectBoatSpecs: (specs: any) => void,
    sendEvent: SendEventForHits
}) => {

    const [viewingAttributes, setViewingAttributes] = useState(false)
    const [viewDetailsTab, setViewDetailsTab] = useState(false);
    const link = useMemo(() => {
        return `${(window as any).MM_DOMAIN}/${hit.usage.toLowerCase()}${(window as any).MM_USAGE_SLUG}/${hit.manufacturer.slug}/${hit.slug}`
    }, [hit])

    return (
        <div className={"uk-position-relative"}>
            <div className="hit arrow-button-upper-relative-cint  uk-card uk-card-default el-card">
                {/*<a href={link} onClick={() => sendEvent('click', hit, 'Boat Clicked')}*/}
                {/*   className={"uk-position-absolute"} data-layout={"desktop"} style={{*/}
                {/*    top: 0,*/}
                {/*    left: 0,*/}
                {/*    right: 0,*/}
                {/*    bottom: 0,*/}
                {/*    zIndex: 99*/}
                {/*}}></a>*/}
                <div className="uk-grid uk-child-width-expand@m uk-grid-collapse" data-uk-grid>
                    <div className={"uk-width-1-3@m"}>
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
                                                    getCDNImage(hit.images[0] as string) ? `${getCDNImage(hit.images[0])}/tr:w-400` : hit.images[0]

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
                                                 src={getCDNImage(hit.images[1] as string) ? `${getCDNImage(hit.images[1])}/tr:w-400` : hit.images[1]}
                                                 loading={"lazy"} alt={hit.name}
                                                 className="hit-image"/>
                                        </div>}
                                    {hit.images && hit.images.length > 2 &&
                                        <div className={"uk-width-1-4 uk-width-1-2@m uk-position-relative"} style={{
                                            borderLeft: '1px solid #fcfcfc'
                                        }}>
                                            <img
                                                style={{height: 80, objectFit: "cover", display: 'block'}}
                                                src={getCDNImage(hit.images[2] as string) ? `${getCDNImage(hit.images[2])}/tr:w-400` : hit.images[2]}
                                                loading={"lazy"} alt={hit.name}
                                                className="hit-image"/>
                                            <div style={{
                                                position: 'absolute',
                                                zIndex: 9,
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'rgba(0,0,0,0.7)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    fill="#fff"
                                                    version="1.1"
                                                    viewBox="0 0 487 487"
                                                    xmlSpace="preserve"
                                                >
                                                    <path
                                                        d="M308.1 277.95c0 35.7-28.9 64.6-64.6 64.6s-64.6-28.9-64.6-64.6 28.9-64.6 64.6-64.6 64.6 28.9 64.6 64.6zm132.2-161.9c25.8 0 46.7 20.9 46.7 46.7v226.2c0 27.5-22.3 49.8-49.8 49.8H49.8c-27.5 0-49.8-22.3-49.8-49.8v-226.2c0-25.8 20.9-46.7 46.7-46.7h93.4l4.4-18.6c6.7-28.8 32.4-49.2 62-49.2h74.1c29.6 0 55.3 20.4 62 49.2l4.3 18.6h93.4zm-342.9 67.4c0-12.9-10.5-23.4-23.4-23.4-13 0-23.5 10.5-23.5 23.4s10.5 23.4 23.4 23.4c13 .1 23.5-10.4 23.5-23.4zm261.3 94.5c0-63.6-51.6-115.2-115.2-115.2s-115.2 51.6-115.2 115.2 51.6 115.2 115.2 115.2 115.2-51.6 115.2-115.2z"></path>
                                                </svg>
                                                <span style={{
                                                    color: '#fff',
                                                    fontSize: 20,
                                                    fontWeight: 700,
                                                    paddingLeft: 8
                                                }}>{hit.images.length}</span>
                                            </div>
                                        </div>}


                                </div>
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
                                    <h3 className={"el-title"}>
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
                                {/*<div className="hit-description">*/}
                                {/*    {[...hit.attributes].splice(0, 2).map((attr: any) => (*/}
                                {/*        <span key={attr.id}*/}
                                {/*              className={"el-meta uk-display-block"}>{attr.name}: {attr.value}</span>*/}
                                {/*    ))}*/}

                                {/*</div>*/}

                            </div>
                            {viewingAttributes && <footer className={"uk-margin-top"}>
                                Attributes
                                <hr className={"uk-margin-remove-bottom"}/>
                                {hit.attributes.map((attr: any) => (
                                    <span key={attr.id} className={"el-meta"}>{attr.name}: {attr.value}</span>
                                ))}
                            </footer>}


                            <canvas height={32} className={"uk-visible@m"}/>
                            <canvas height={12} className={"uk-hidden@m"}/>
                            <div className={"uk-position-absolute uk-position-bottom-right mm-actions"} style={{
                                zIndex: 99999,
                                bottom: '20px',
                                right: '20px'
                            }}>
                                <button onClick={() => {
                                    window.dispatchEvent(new CustomEvent('check_availability', {
                                        detail: {
                                            ...hit,
                                            link
                                        }
                                    }))
                                }}
                                        className={"uk-button uk-button-primary"}

                                >
                                    Check Availability
                                </button>


                                <a
                                    href={link} onClick={() => sendEvent('click', hit, 'Boat Clicked')}
                                    //      onClick={
                                    //         () => {
                                    //         if ((window as any).UIkit) {
                                    //             if (!hit.attributes || hit.attributes.length < 1) {
                                    //             return
                                    //         }
                                    //         onSelectBoatSpecs({...hit, link} as any);
                                    //         }
                                    // }}
                                    // onClick={() => setViewDetailsTab(!viewDetailsTab)}
                                    // data-uk-toggle={'#specs-modal'}
                                    className={"uk-button uk-button-link show-details uk-margin-left"}
                                >
                                        <span
                                            data-uk-icon={"icon: eye"}/> {'View boat'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className={viewDetailsTab ? "specifications-container" : "specifications-container-hidden"}>
                    <div className="uk-modal-body" data-uk-overflow-auto>
                        <div className={"uk-grid uk-child-width-1-2@s uk-grid-row-small"}
                             data-uk-grid>
                            {hit?.attributes && hit.attributes.map((attr: any) =>
                                <div key={attr.name}>
                                    <div className="uk-panel">
                                        <div
                                            className="spec uk-grid uk-child-width-expand uk-space-between"
                                            data-uk-grid>
                                        <span
                                            className={"label uk-width-auto"}>{attr.name}</span>
                                            <span
                                                className={"value uk-text-bold uk-text-right"}>{attr.value}</span>
                                        </div>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="arrow-button" onClick={() => setViewDetailsTab(!viewDetailsTab)}>

                <a uk-icon={viewDetailsTab ? "triangle-up" : "triangle-down"}></a>
            </div>

        </div>

    );
})

export default Hit

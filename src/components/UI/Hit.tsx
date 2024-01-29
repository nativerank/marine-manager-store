import React, {memo, useEffect, useMemo, useRef, useState} from "react";
import {Highlight} from "react-instantsearch";
import {convertHtmlToString, getCDNImage} from "../../utils";
import {SendEventForHits} from "instantsearch.js/es/lib/utils";
import Slider from "../Image/Slider";
import Price from "../Price/Price";
import PrimarySpecs from "../Specs/PrimarySpecs";
import MessageCheckIcon from "../Icons/MessageCheckIcon";
import IconNarrowRight from "../Icons/IconNarrowRight";
import DownArrow from "../Icons/DownArrow";
import AllSpecs from "../Specs/AllSpecs";
import classNames from "classnames";

type HitType = any | {
    image: string;
    name: string;
    categories: string[];
    description: string;
    price: number;
    rating: string;
};
export const BOAT_PLACEHOLDER_IMAGE = 'https://cdn.nativerank.com/image_coming_soon_HSUNu2mUx.jpg?tr=w-325'


const Hit = memo(({hit, sendEvent}: {
    hit: HitType,
    sendEvent: SendEventForHits
}) => {

    const descString = convertHtmlToString(hit.description ?? '', 140);
    const [viewDetailsTab, setViewDetailsTab] = useState(false);
    const [height, setHeight] = useState(0);
    const link = useMemo(() => {
        return `${(window as any).MM_DOMAIN}/${hit.usage.toLowerCase()}${(window as any).MM_USAGE_SLUG}/${hit.manufacturer.slug}/${hit.slug}`
    }, [hit])

    const thumbImages = useMemo(() => {
        if (hit.images && Array.isArray(hit.images) && hit.images.length > 0) {

            return hit.images.map((image: string) => {

                return getCDNImage({
                    url: image,
                    transform: 'w-800,h-614'
                }).replace(' ', '%20')

            })
        }
        return false
    }, [hit.images])

    const atLeastOneImageExists = useMemo(() => {
        return thumbImages
    }, [thumbImages])

    const moreThanOneImageExists = useMemo(() => {
        return thumbImages?.length > 1
    }, [thumbImages])
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (viewDetailsTab && ref.current) setHeight(ref.current?.getBoundingClientRect().height);
        else setHeight(0);

    }, [viewDetailsTab]);

    return (
        <div
            className={classNames(
                "hit relative mx-auto my-10 flex w-full gap-4 flex-wrap " +
                "justify-between rounded-xl border px-4 py-4 bg-gradient-to-b from-white",
                {
                    'via-[var(--mm-featured-card-gradient-via-50)] to-[var(--mm-featured-card-gradient-to-100)] featured border-[var(--mm-featured-bg)]': hit.featured,
                    'via-gray-50 via-75% to-gray-100': !hit.featured,
                })}>

            <div className={"basis-full lg:flex-none relative"}>
                <div className={"w-full lg:w-72"}>
                    {atLeastOneImageExists ? <Slider images={thumbImages.slice(0, 5)}/> :
                        <img src={BOAT_PLACEHOLDER_IMAGE} loading={"lazy"} className={"h-44 w-72 object-cover"}
                             alt={""}/>}
                </div>

                {hit.featured ?
                    <div
                        className={"absolute -left-6 bottom-full lg:-bottom-4 bg-[var(--mm-featured-bg)] text-[var(--mm-featured-text)] px-2 py-1 uppercase text-sm tracking-wider shadow"}>
                        Featured
                    </div> : ''}
            </div>
            <div className={"w-full basis-full lg:flex-1"}>
                <div className="">
                    <div className={"flex pb-1.5 divide-x lg:divide-x-0 gap-x-2 lg:gap-x-1 items-center"}>
                        <div className={"flex-1 "}>
                            <div
                                className={"bg-[var(--mm-usage-badge-bg)] text-[var(--mm-usage-badge-text)] inline-block px-2 uppercase text-sm shadow-[var(--mm-usage-badge-shadow)] shadow-sm rounded"}>
                                {hit.usage}
                            </div>
                            {hit.featured ? <div
                                className={"bg-[var(--mm-featured-bg)] ml-2 text-[var(--mm-featured-text)] inline-block px-2 uppercase text-sm  rounded"}>
                                Featured
                            </div> : ''}
                            <a href={link} className={"text-[#333] hover:text-[var(--mm-title-link-hover)]"}
                               onClick={() => sendEvent('click', hit, 'Boat Clicked')}>
                                <h2 className={"font-bold lg:font-black text-md lg:text-2xl"}>
                                    <Highlight attribute="name" highlightedTagName="mark" hit={hit}/>
                                </h2>

                            </a>
                        </div>
                        <div className={"pl-4 lg:pl-0"}>
                            <Price hit={hit} usage={hit.usage} featured={hit.featured} price={hit.price}
                                   status={hit.status}/>
                        </div>
                    </div>
                    <div className={"border-b relative"}>
                    </div>

                    <div className={'hit-content'}>
                        <div className={"pb-2"}>
                            <PrimarySpecs
                                boat_attributes={hit.attributes}
                                status={hit.status}
                                location={`${hit.location.city}, ${hit.location.state}`}
                                manufacturer={hit.manufacturer.name}
                                year={hit.year}
                                stock_number={hit.stock_number}
                            />
                        </div>
                        <div className={"border-b relative"}>
                        </div>
                        <div className={"pt-4 flex gap-4 flex-wrap"}>
                            <div className={"basis-full lg:flex-1"}>
                                {
                                    descString.length ?
                                        <p className="text-sm">{descString}<a href={link}
                                                                              className={"font-bold"}
                                                                              onClick={() => sendEvent('click', hit, 'Boat Clicked')}> READ
                                            MORE</a>
                                        </p>
                                        :
                                        <p className={"hit-description-p"}>
                                            Checkout
                                            the {hit.name} by {hit.location.dealer.name} at {hit.location.city}, {hit.location.state} location...<a
                                            href={link}
                                            className={"font-bold"}
                                            onClick={() => sendEvent('click', hit, 'Boat Clicked')}> READ
                                            MORE</a>
                                        </p>
                                }
                            </div>
                            <div className={"w-full lg:w-48 pb-4 lg:pb-0"}>
                                <button
                                    className={"justify-center text-center flex items-center gap-2 w-full text-[var(--mm-cta-check-availability-text)] bg-[var(--mm-cta-check-availability-bg)] hover:bg-[var(--mm-cta-check-availability-bg-hover)] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 me-2 mb-2 focus:outline-none"}
                                    onClick={() => {
                                        window.dispatchEvent(new CustomEvent('check_availability', {
                                            detail: {
                                                ...hit,
                                                link
                                            }
                                        }))
                                    }}
                                >
                                    <MessageCheckIcon/> Check Availability
                                </button>
                                <a
                                    href={link} onClick={() => sendEvent('click', hit, 'Vehicle Clicked')}
                                    className={"group flex items-center justify-between w-full text-[var(--mm-cta-view-boat-text)] bg-[var(--mm-cta-view-boat-bg)] hover:bg-[var(--mm-cta-view-boat-bg-hover)] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none text-center"}
                                >
                                    View Boat <IconNarrowRight
                                    className={"block transition-transform group-hover:translate-x-1 ease-in-out"}/>
                                </a>
                            </div>
                        </div>

                    </div>


                </div>


                <button
                    className={classNames("left-1/2 " +
                        "w-36 py-2 flex justify-center items-center gap-1 absolute bottom-0 translate-y-1 -translate-x-1/2 z-10 hover:before:bg-gray-200 before:absolute before:inset-y-0 before:w-[calc(100%-30px)] before:border before:border-r-0 before:-left-[3px] before:-skew-x-[40deg] before:bg-white " +
                        "after:absolute after:inset-y-0 hover:after:bg-gray-200 after:bg-white after:w-[calc(100%-30px)] after:border after:-right-[3px] after:border-l-0 after:skew-x-[40deg]",
                        {
                            'after:border-[var(--mm-featured-bg)] before:border-[var(--mm-featured-bg)]': hit.featured,
                            'after:border-gray-200 before:border-[var(--mm-featured-bg)] before:border-gray-200': !hit.featured,
                        })}
                    onClick={() => setViewDetailsTab(!viewDetailsTab)}>
                        <span
                            className={classNames("relative z-20 flex items-center gap-1", {
                                'text-[var(--mm-featured-bg)]': hit.featured
                            })}>{viewDetailsTab ? 'Close' : 'Quick Look'}
                            <DownArrow
                                className={classNames(`duration-150`, {
                                    'rotate-180': viewDetailsTab,
                                    'text-[var(--mm-featured-bg)]': hit.featured
                                })}/></span>
                </button>
            </div>


            <div

                className={`basis-full overflow-hidden ease-in-out duration-500`}
                style={{
                    height
                }}
            >
                <div ref={ref} className={"pb-10"}>
                    <div className={"border-t"}></div>
                    {hit?.attributes?.length ? <AllSpecs specs={hit.attributes}/> :
                        <PrimarySpecs status={hit.status}
                                      boat_attributes={hit.attributes}
                                      location={hit.location.name}
                                      manufacturer={hit.manufacturer.name}
                                      stock_number={hit.stock_number}
                                      year={hit.year}/>}
                </div>
            </div>

        </div>

    );
})

export default Hit

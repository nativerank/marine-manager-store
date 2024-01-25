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

type HitType = any | {
    image: string;
    name: string;
    categories: string[];
    description: string;
    price: number;
    rating: string;
};
export const BOAT_PLACEHOLDER_IMAGE = 'https://cdn.nativerank.com/image_coming_soon_HSUNu2mUx.jpg?tr=w-325'


const ColHit = memo(({hit, sendEvent}: {
    hit: HitType,
    sendEvent: SendEventForHits
}) => {

    const descString = convertHtmlToString(hit.description, 140);
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
            className="hit relative mx-auto my-10 flex w-full gap-4 flex-wrap  justify-between rounded-xl border px-4 py-4
            bg-gradient-to-b from-white via-gray-50 via-75% to-gray-100">

            <div className={"basis-full lg:flex-none"}>
                <div className={"w-full lg:w-64"}>
                    {atLeastOneImageExists ? <Slider images={thumbImages.slice(0, 5)}/> :
                        <img src={BOAT_PLACEHOLDER_IMAGE} loading={"lazy"} className={"h-44 w-72 object-cover"}
                             alt={""}/>}
                </div>
            </div>
            <div className={"w-full basis-full lg:flex-1"}>
                <div className="">
                    <div className={"mb-2 border-b pb-2"}>

                        <a href={link} className={"text-[#333] hover:text-amber-600"}
                           onClick={() => sendEvent('click', hit, 'Boat Clicked')}>
                            <h2 className={"font-bold lg:font-bold "}>
                                <Highlight attribute="name" highlightedTagName="mark" hit={hit}/>
                            </h2>
                        </a>
                    </div>
                    <div className={"flex pb-1.5 divide-x gap-x-2 lg:gap-x-1 items-center"}>
                        <div className={"flex-none w-20"}>
                            <div
                                className={"bg-amber-600 text-amber-50 inline-block px-2 uppercase text-sm shadow-amber-500 shadow-sm rounded"}>
                                {hit.usage}
                            </div>
                        </div>
                        <div className={"flex-1"}>
                            <Price hit={hit} price={hit.price} status={hit.status}/>
                        </div>
                    </div>
                    <div className={"border-b relative"}>
                    </div>

                    <div className={'hit-content'}>
                        <div className={"pb-2"}>
                            <PrimarySpecs
                                compact
                                status={hit.status}
                                location={`${hit.location.city}, ${hit.location.state}`}
                                manufacturer={hit.manufacturer.name}
                                year={hit.year}
                            />
                        </div>
                        <div className={"border-b relative"}>
                        </div>
                        <div className={"pt-4 flex gap-4 flex-wrap"}>
                            <div className={"basis-full lg:flex-1 hidden"}>
                                {
                                    descString.length ?
                                        <p className="text-sm">{descString}<strong> READ
                                            MORE</strong>
                                        </p>
                                        :
                                        <p className={"hit-description-p"}>
                                            Checkout
                                            the {hit.name} by {hit.location.dealer.name} at {hit.location.city}, {hit.location.state} location... <strong> READ
                                            MORE </strong>
                                        </p>
                                }
                            </div>
                            <div className={"w-full pb-4"}>
                                <button
                                    className={"justify-center text-center flex items-center gap-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3.5 me-2 mb-2 focus:outline-none"}
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
                                    href={link} onClick={() => sendEvent('click', hit, 'Boat Clicked')}
                                    className={"group flex items-center justify-between w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none text-center"}
                                >
                                    View Boat <IconNarrowRight
                                    className={"block transition-transform group-hover:translate-x-1 ease-in-out"}/>
                                </a>
                            </div>
                        </div>

                    </div>


                </div>


                <button
                    className={"left-1/2 " +
                        "w-36 py-2 flex justify-center items-center gap-1 absolute bottom-0 translate-y-1 -translate-x-1/2 z-10 hover:before:bg-gray-200 before:absolute before:inset-y-0 before:w-[calc(100%-30px)] before:border before:border-gray-200 before:border-r-0 before:-left-[3px] before:-skew-x-[40deg] before:bg-white " +
                        "after:absolute after:inset-y-0 hover:after:bg-gray-200 after:bg-white after:w-[calc(100%-30px)] after:border after:border-gray-200 after:-right-[3px] after:border-l-0 after:skew-x-[40deg]"}
                    onClick={() => setViewDetailsTab(!viewDetailsTab)}>
                        <span
                            className={"relative z-20 flex items-center gap-1"}>{viewDetailsTab ? 'Close' : 'Quick Look'}
                            <DownArrow
                                className={`${viewDetailsTab && 'rotate-180'} duration-150`}/></span>
                </button>
            </div>


            <div

                className={`basis-full overflow-hidden ease-in-out duration-500`}
                style={{
                    height
                }}
            >
                <div ref={ref}>
                    <div className={" border-t"}></div>
                    {hit?.attributes.length ? <AllSpecs specs={hit.attributes}/> :
                        <PrimarySpecs status={hit.status} location={hit.location.name}
                                      manufacturer={hit.manufacturer.name}
                                      year={hit.year}/>}
                    <div className={"border-t pt-4 mt-4 pb-8"}>
                        {
                            descString.length ?
                                <p className="text-sm">{convertHtmlToString(hit.description, 300)}<strong> READ
                                    MORE</strong>
                                </p>
                                :
                                <p className={"hit-description-p"}>
                                    Checkout
                                    the {hit.name} by {hit.location.dealer.name} at {hit.location.city}, {hit.location.state} location... <strong> READ
                                    MORE </strong>
                                </p>
                        }
                    </div>
                </div>

            </div>

        </div>

    );
})

export default ColHit

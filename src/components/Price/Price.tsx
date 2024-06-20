import React, {FC, useMemo} from "react";
import {calculateMonthlyPayment, formatNumber} from "../../utils";
import DollarRoundedIcon from "../Icons/DollarRoundedIcon";
import {Hit} from "instantsearch.js";

const Price: FC<{
    price: number,
    status: string,
    hit: Hit
}> = ({price, status, hit}) => {

    const link = useMemo(() => {
        return `${(window as any).MM_DOMAIN}/${hit.usage.toLowerCase()}${(window as any).MM_USAGE_SLUG}/${hit.manufacturer.slug}/${hit.slug}`
    }, [hit])


    return (
        <div className={"text-right"}>
            {!price || price === 0 || status.toLowerCase() === 'call for price'
                ?
                <button
                    onClick={() => {
                        window.dispatchEvent(new CustomEvent('request_price', {
                            detail: {
                                ...hit,
                                link
                            }
                        }))
                    }}
                    className={"bg-blue-950 font-medium py-2 px-4 text-white rounded hover:bg-amber-600 text-xs lg:text-sm flex items-center gap-2 shadow-blue-600 hover:shadow-amber-600 shadow"}>
                    <DollarRoundedIcon/> Request Price
                </button>
                : <>
                    <div className={"text-xl lg:text-2xl font-bold text-right"}>
                        {/*<span className="text-gray-500 block text-sm">Our Price: </span>{' '}*/}
                        <strong className={"font-bold"}><sup className={"text-xs -top-2"}>$</sup>{formatNumber(price)}
                        </strong>
                    </div>
                    {!("HIDE_MONTHLY_PAYMENTS" in window) && <button onClick={() => {
                        window.dispatchEvent(new CustomEvent('get_financing', {
                            detail: {
                                ...hit,
                                link
                            }
                        }))
                    }} className={"text-xs w-full block text-right text-blue-950 hover:underline"}>
                        <sup className={"text-[.5rem] -top-1"}>$</sup><span
                        className={"font-bold"}>{formatNumber(calculateMonthlyPayment({
                        APR: .08,
                        amountFinanced: price - (price * 0.2),
                        term: 240
                    }))}</span>/mo.
                        <span className={"block"}>
                            get financing
                        </span>
                    </button>}
                </>}
        </div>
    )
}

export default Price
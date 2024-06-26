import React, {FC, useMemo} from "react";
import {calculateMonthlyPayment, formatNumber} from "../../utils";
import DollarRoundedIcon from "../Icons/DollarRoundedIcon";
import classNames from "classnames";

const Price: FC<{
    price: number,
    status: string,
    usage: string,
    featured?: boolean
    hit: any
}> = ({price, status, featured, usage, hit}) => {
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
                    className={"bg-[var(--mm-cta-request-pricing-bg)] font-medium py-2 px-4 text-[var(--mm-cta-request-pricing-text)] rounded hover:bg-[var(--mm-cta-request-pricing-bg-hover)] text-xs lg:text-sm flex items-center gap-2 shadow-[var(--mm-cta-request-pricing-shadow)] hover:shadow-[var(--mm-cta-request-pricing-bg-hover)] shadow"}>
                    <DollarRoundedIcon/> Request Price
                </button>
                : <>
                    <div className={"text-xl lg:text-2xl font-bold text-right"}>
                        {/*<span className="text-gray-500 block text-sm">Our Price: </span>{' '}*/}
                        <strong className={classNames("font-bold", {
                            'text-[var(--mm-featured-bg)]': featured
                        })}><sup
                            className={"text-xs -top-2"}>$</sup>{formatNumber(price)}
                        </strong>
                    </div>
                    {!("HIDE_MONTHLY_PAYMENTS" in window) && <button onClick={() => {
                        window.dispatchEvent(new CustomEvent('get_financing', {
                            detail: {
                                ...hit,
                                link
                            }
                        }))
                    }}
                                                                     className={"text-xs block text-right text-[var(--mm-monthly-payment-link)] hover:underline"}>
                        <sup className={"text-[.5rem] -top-1"}>$</sup><span
                        className={"font-bold"}>{formatNumber(calculateMonthlyPayment({
                        APR: usage === 'New' ? .0625 : .0625,
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
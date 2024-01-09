import React, {FC} from "react";
import {calculateMonthlyPayment, formatNumber} from "../../utils";
import DollarRoundedIcon from "../Icons/DollarRoundedIcon";

const Price: FC<{
    price: number,
    status: string
}> = ({price, status}) => {
    return (
        <div className={""}>
            {!price || price === 0 || status.toLowerCase() === 'call for price'
                ?
                <a href={"#"}
                   className={"bg-blue-950 font-medium py-2 px-4 text-white rounded hover:bg-amber-600 text-xs lg:text-sm flex items-center gap-2 shadow-blue-600 hover:shadow-amber-600 shadow"}>
                    <DollarRoundedIcon/> Request Price
                </a>
                : <>
                    <div className={"text-xl lg:text-2xl font-bold text-right"}>
                        {/*<span className="text-gray-500 block text-sm">Our Price: </span>{' '}*/}
                        <strong className={"font-bold"}><sup className={"text-xs -top-2"}>$</sup>{formatNumber(price)}
                        </strong>
                    </div>
                    <a href={""} className={"text-xs block text-right text-blue-950 hover:underline"}>
                        <sup className={"text-[.5rem] -top-1"}>$</sup><span
                        className={"font-bold"}>{formatNumber(calculateMonthlyPayment({
                        APR: .08,
                        amountFinanced: price,
                        term: 70
                    }))}</span>/mo.
                        <span className={"block"}>
                            get financing
                        </span>
                    </a>
                </>}
        </div>
    )
}

export default Price
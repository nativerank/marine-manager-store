import {FC, useMemo} from "react";
import classNames from "classnames";

type Props = {
    status: string,
    location: string,
    manufacturer: string
    year: string
    compact?: boolean
    stock_number?: string
    boat_attributes: any[]
}
const SPECS: {
    label: string,
    key: keyof Props,
    hideOnMobile?: boolean,
    hideOnCompact?: boolean,
    alternateSpec?: string
}[] = [
    {
        label: 'Status',
        key: 'status',
    },
    {
        label: 'Location',
        key: 'location'
    },
    {
        label: 'Manufacturer',
        key: 'manufacturer',
        hideOnMobile: true,
        hideOnCompact: true,
        alternateSpec: 'Hours'
    },
    {
        label: 'Year',
        key: 'year',
        hideOnCompact: true,
        alternateSpec: 'stock_number'
    }
]
const PrimarySpecs: FC<Props> = (props) => {

    const hours = useMemo(() => {
        if (!props.boat_attributes) {
            return false
        }
        return props.boat_attributes.find((attr) => {
            return ['Hours', 'Engine Hours'].includes(attr.name)
        })?.value ?? false
    }, [props.boat_attributes])

    return (
        <div className={"flex divide-x mt-2"}>
            {SPECS.map(({label, key, hideOnMobile, hideOnCompact, alternateSpec}) => (
                <div key={key}
                     className={classNames(`px-4 text-xs text-center flex-auto flex flex-wrap justify-center flex-col-reverse`,
                         {
                             'hidden lg:flex': hideOnMobile,
                             'hidden lg:hidden': props.compact && hideOnCompact,
                         })}>
                    <span className={"block uppercase"}>
                        {alternateSpec === 'stock_number' && props.stock_number ? 'Stock #' : alternateSpec === 'Hours' && hours ? 'Hours' : label}

                    </span>
                    <span className={"block text-sm font-medium"}>
                        {alternateSpec === 'stock_number' && props.stock_number ? props.stock_number :
                            alternateSpec === 'Hours' && hours ? hours : props[key]}


                    </span>

                </div>
            ))}
        </div>
    )
}

export default PrimarySpecs
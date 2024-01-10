import {FC} from "react";
import classNames from "classnames";

type Props = {
    status: string,
    location: string,
    manufacturer: string
    year: string
    compact?: boolean
}
const SPECS: { label: string, key: keyof Props, hideOnMobile?: boolean, hideOnCompact?: boolean }[] = [
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
        hideOnCompact: true
    },
    {
        label: 'Year',
        key: 'year',
        hideOnCompact: true
    }
]
const PrimarySpecs: FC<Props> = (props) => {
    return (
        <div className={"flex divide-x mt-2"}>
            {SPECS.map(({label, key, hideOnMobile, hideOnCompact}) => (
                <div key={key}
                     className={classNames(`px-4 text-xs text-center flex-auto flex flex-wrap justify-center flex-col-reverse`,
                         {
                             'hidden lg:flex': hideOnMobile,
                             'hidden lg:hidden': props.compact && hideOnCompact,
                         })}>
                    <span className={"block uppercase"}>
                        {label}
                    </span>
                    <span className={"block text-sm font-medium"}>
                        {props[key]}
                    </span>

                </div>
            ))}
        </div>
    )
}

export default PrimarySpecs
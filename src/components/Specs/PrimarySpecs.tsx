import {FC} from "react";

type Props = {
    status: string,
    location: string,
    manufacturer: string
    year: string
}
const SPECS: { label: string, key: keyof Props }[] = [
    {
        label: 'Status',
        key: 'status'
    },
    {
        label: 'Location',
        key: 'location'
    },
    {
        label: 'Manufacturer',
        key: 'manufacturer'
    },
    {
        label: 'Year',
        key: 'year'
    }
]
const PrimarySpecs: FC<Props> = (props) => {
    return (
        <div className={"flex divide-x mt-2"}>
            {SPECS.map(({label, key}) => (
                <div key={key} className={"px-4 text-xs text-center flex flex-wrap justify-center flex-col-reverse"}>
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
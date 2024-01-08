import {FC} from "react";

type Props = {
    specs: { name: string, value: string }[]
}
const AllSpecs: FC<Props> = ({specs}) => {
    return (
        <div className={"flex flex-wrap divide-x mt-2 gap-y-4"}>
            {specs.map(({name, value}) => (
                <div key={name} className={"px-8 text-xs text-center flex flex-wrap justify-center flex-col-reverse"}>
                    <span className={"block uppercase"}>
                        {name}
                    </span>
                    <span className={"block text-sm font-medium"}>
                        {value}
                    </span>

                </div>
            ))}
        </div>
    )
}

export default AllSpecs
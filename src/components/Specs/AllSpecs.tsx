import {FC} from "react";

type Props = {
    specs: { name: string, value: string }[]
}
const AllSpecs: FC<Props> = ({specs}) => {
    return (
        <div className={"flex flex-wrap lg:divide-x mt-2 gap-y-4 gap-2 lg:gap-0 justify-start"}>
            {specs.map(({name, value}) => (
                <div key={name}
                     className={"flex-auto px-8 py-2  text-xs text-center flex flex-wrap justify-center flex-col-reverse bg-white lg:bg-transparent"}>
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
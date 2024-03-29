import {FC, SVGAttributes} from "react";

const Check: FC<SVGAttributes<SVGElement>> = (props) => {
    return (
        <svg viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="m378-332 363-363q9.067-9 21.533-9Q775-704 784-694.947q9 9.052 9 21.5Q793-661 784-652L399-267q-9 9-21 9t-21-9L175-449q-9-9.067-8.5-21.533Q167-483 176.053-492q9.052-9 21.5-9Q210-501 219-492l159 160Z"></path>
        </svg>
    )
}

export default Check
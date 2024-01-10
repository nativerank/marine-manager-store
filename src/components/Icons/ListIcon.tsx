import {FC, SVGAttributes} from "react";

const GridIcon: FC<SVGAttributes<SVGElement>> = (props) => {
    return (
        <svg height="24" width="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M7 8H21M7 12H21M7 16H21M3 8H3.01M3 12H3.01M3 16H3.01" stroke="currentColor" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2"/>
        </svg>

    )
}

export default GridIcon
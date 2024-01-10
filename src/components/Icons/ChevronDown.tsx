import {FC, SVGAttributes} from "react";

const ChevronDown: FC<SVGAttributes<SVGElement>> = (props) => {
    return (
        <svg height="21" width="21" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M6 9L12 15L18 9" stroke="#131A29" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </svg>
    )
}

export default ChevronDown
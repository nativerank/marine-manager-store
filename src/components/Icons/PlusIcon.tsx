import {FC, SVGAttributes} from "react";

const PlusIcon: FC<SVGAttributes<SVGElement>> = (props) => {
    return (
        <svg height="24" width="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M6 12H18M12 6V18" stroke="#131A29" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
        </svg>
    )
}

export default PlusIcon
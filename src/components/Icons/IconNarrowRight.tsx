import {FC, memo, SVGAttributes} from "react";

const BackIcon: FC<SVGAttributes<SVGElement>> = (props) => {

    return <svg height="24" width="24" fill="none" viewBox="0 0 24 24"
                {...props}
                xmlns="http://www.w3.org/2000/svg">
        <path d="M4 12H20M20 12L16 8M20 12L16 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
              strokeWidth="2"/>
    </svg>
}

export default memo(BackIcon)
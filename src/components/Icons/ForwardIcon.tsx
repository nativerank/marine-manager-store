import {memo} from "react";

const BackIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.17 29.103" width={24} height={24}
                className={""}>
        <path
            className={"fill-amber-500"}
            d="M1.23 0l16.051 9.917v8.682L-.001 7.921V.76z"
        ></path>
        <path
            className={"fill-amber-600"}
            d="M1.23 28.52l16.051-9.917V9.921L-.001 20.599v7.161z"
        ></path>
    </svg>
}

export default memo(BackIcon)
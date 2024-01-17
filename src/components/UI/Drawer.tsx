import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import FiltersSideWidget from "./FiltersSideWidget";
import {ClearFilters} from "../ClearFilters";

function useOutsideAlerter(ref: any, onClickOutside: () => void) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside()
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const Drawer = () => {

    const [expanded, setExpanded] = useState(false)
    const wrapperRef = useRef(null);

    const onClickOutside = () => {
        setExpanded(false)
    }

    useOutsideAlerter(wrapperRef, onClickOutside);


    useEffect(() => {
        if (expanded) {
            document.body.classList.add('overflow-hidden')
            return
        }

        document.body.classList.remove('overflow-hidden')


    }, [expanded])

    return (
        <>
            {expanded && <div className={"z-10 fixed inset-0 bg-black opacity-60 "}>

            </div>}
            <div id="drawer-swipe"
                 ref={wrapperRef}
                 className={classNames("lg:hidden shadow fixed z-40 w-full overflow-y-auto bg-white border-t border-gray-200 rounded-t-lg  transition-transform bottom-0 left-0 right-0", {
                     'transform-none': expanded,
                     'translate-y-full bottom-[50px]': !expanded
                 })}
                 aria-labelledby="drawer-swipe-label">
                <div className="p-4 pb-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                     onClick={() => setExpanded(prev => !prev)}
                     data-drawer-toggle="drawer-swipe">
                <span
                    className="absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-2 left-1/2 dark:bg-gray-600"></span>
                    <h5
                        className="block text-center items-center text-base   font-medium">
                        {expanded ? "Apply Filters" : "Filters"}
                    </h5>
                </div>
                <div className={"overflow-auto max-h-[60vh] pt-8"}>
                    <ClearFilters/>

                    <FiltersSideWidget/>
                </div>
            </div>
        </>
    )
}

export default Drawer
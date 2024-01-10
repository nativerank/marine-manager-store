import {FC, PropsWithChildren, useEffect, useRef, useState} from "react";
import ChevronDown from "../components/Icons/ChevronDown";
import {
    CurrentRefinementsConnectorParamsRefinement
} from "instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements";
import CloseIcon from "../components/Icons/CloseIcon";
import classNames from "classnames";

type Props = {
    title: string
    selectedItems?: any[]
    refine: (refinement: CurrentRefinementsConnectorParamsRefinement) => void;
    expanded?: boolean
    borderTop?: boolean
}
const CollapsiblePanel: FC<PropsWithChildren<Props>> = ({
                                                            children,
                                                            selectedItems,
                                                            title,
                                                            refine,
                                                            expanded: isExpanded,
                                                            borderTop
                                                        }) => {


    const [expanded, setExpanded] = useState(isExpanded ?? false)
    const [height, setHeight] = useState<null | number>(isExpanded ? null : 0)
    const ref = useRef<HTMLDivElement>(null);
    const touched = useRef(false)

    useEffect(() => {


        if (!touched.current) {

            return
        }
        if (ref.current) {
            if (expanded) setHeight(ref.current?.getBoundingClientRect().height + 2);
            else setHeight(0);
        }

    }, [expanded]);

    return (
        <div className={classNames("-mx-3", {'border-t': borderTop})}>
            <div className={"px-3"}>
                <div className={"-mx-3 px-0"}>
                    <button
                        onClick={() => {

                            if (!touched.current) touched.current = true
                            setExpanded(prev => !prev)
                        }}
                        className={"w-full flex flex-nowrap justify-between expandable-list-item-button items-center"}
                        aria-expanded={expanded}>

                        <h3 className="font-bold text-lg normal-case w-full px-3 py-3 text-left">{title}</h3>
                        <span className="ml-3 whitespace-nowrap">
                        <div className={"static"}>
                        <ChevronDown className={`my-3 mr-3 ease-in-out ${expanded && "rotate-180"}`}/>
                        </div>
                    </span>

                    </button>
                    {!expanded && selectedItems && <div className={"flex px-3 gap-2 pb-3 flex-wrap"}>
                        {selectedItems.map((refinement) => <button onClick={() => refine(refinement)}
                                                                   className={"chip chip-with-icon btn btn-chip btn-sm"}
                                                                   key={refinement.value}>
                            <span className={"chip-content"}>{refinement.value}</span>
                            <span className="chip-icon-container">
                                <CloseIcon
                                    style={{
                                        width: 20,
                                        height: 20,
                                        padding: 4.5
                                    }}
                                    className={"icon icon-fill-default icon-border-circle overflow-visible chip-icon"}/>
                            </span>
                        </button>)}
                    </div>}
                    <div className="overflow-auto ease-in-out duration-500 bg-[#fcfcfc]" style={{
                        maxHeight: height === null ? '1000px' : height
                    }}>
                        <div ref={ref} className="expandable-list-item-shadow expandable-list-item-shadow-open" style={{
                            boxShadow: 'inset 0 0.375rem 0.375rem -0.25rem hsla(0,0%,80%,.5)'
                        }}>
                            <div
                                className="flex flex-col _max-h-[50vh] overflow-y-scroll py-3 pr-1 pl-3 "
                            >
                                <div className="pb-3">
                                    {children}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default CollapsiblePanel
import React from 'react';
import {useHierarchicalMenu, UseHierarchicalMenuProps} from 'react-instantsearch';
import classNames from "classnames";
import MinusIcon from "./Icons/MinusIcon";
import PlusIcon from "./Icons/PlusIcon";
import ChevronDown from "./Icons/ChevronDown";

function CustomHierarchicalMenu(props: UseHierarchicalMenuProps) {
    const {
        items,
        refine,
        canToggleShowMore,
        toggleShowMore,
        isShowingMore,
        createURL
    } = useHierarchicalMenu(props);

    return (
        <>
            <HierarchicalList
                items={items}
                onNavigate={refine}
                createURL={createURL}
            />
            {props.showMore && (
                <div className={"border-t border-dotted"}>
                    <button
                        className={"w-full py-2 bg-gray-200"}
                        disabled={!canToggleShowMore} onClick={toggleShowMore}>
                        {isShowingMore ? <span className={"flex items-center justify-center"}>Show less <ChevronDown
                                className={"rotate-180 ml-1"}/></span> :
                            <span className={"flex items-center justify-center"}>Show more <ChevronDown
                                className={"ml-1"}/></span>}
                    </button>
                </div>
            )}
        </>
    );
}

type HierarchicalListProps = Pick<
    ReturnType<typeof useHierarchicalMenu>,
    'items' | 'createURL'
> & {
    onNavigate(value: string): void;
};

function HierarchicalList({
                              items,
                              createURL,
                              onNavigate,
                              isChild
                          }: HierarchicalListProps & { isChild?: boolean }) {
    if (items.length === 0) {
        return null;
    }

    return (
        <ul className={classNames({
            'bg-white border-t pt-1.5': isChild,
        })}>
            {items.map((item) => (
                <li key={item.value} className={classNames("py-1.5", {
                    'bg-white shadow-inner pr-2 -mr-2 pl-3 -ml-3': item.isRefined && !isChild
                })}>
                    <a
                        className={"flex field-container-challenger w-full"}
                        href={createURL(item.value)}
                        onClick={(event) => {
                            if (isModifierClick(event)) {
                                return;
                            }
                            event.preventDefault();

                            onNavigate(item.value);
                        }}
                    >
                        <div className={"custom-control form-check-label w-full"}>
                            {isChild ? <div className="indicator-wrapper">
                                <div
                                    className={classNames(
                                        `custom-control-indicator custom-control-indicator-checkbox mr-2 rounded-full`,
                                        {
                                            'bg-[var(--mm-filter-accent)] border-transparent': item.isRefined,
                                            'bg-white': !item.isRefined
                                        }
                                    )}
                                >

                                </div>
                            </div> : <div className="indicator-wrapper">
                                <div
                                    className={"custom-control-indicator custom-control-indicator-checkbox mr-2 border-none"}>
                                    {item.isRefined ? <MinusIcon/> : <PlusIcon/>}
                                </div>
                            </div>}
                            <div className={classNames("w-full", {
                                'text-[var(--mm-filter-accent)]': item.isRefined && !isChild
                            })}>
                                <div className="flex justify-between">
                                    <div>{item.label}</div>
                                    <div
                                        className="mx-2">{item.count}
                                    </div>
                                    <span className="sr-only">results</span></div>

                            </div>
                        </div>
                    </a>
                    {item.data && (
                        <HierarchicalList
                            items={item.data}
                            isChild
                            onNavigate={onNavigate}
                            createURL={createURL}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}

function isModifierClick(event: React.MouseEvent) {
    const isMiddleClick = event.button === 1;

    return Boolean(
        isMiddleClick ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
    );
}

export default CustomHierarchicalMenu
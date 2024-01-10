import React from 'react';
import classNames from "classnames";

const Panel = ({
                   children,
                   header,
                   borderTop,
               }: {
    children: React.ReactNode;
    header?: React.ReactNode;
    borderTop?: boolean;
}) => {
    return (
        <div className={classNames("-mx-3", {'border-t': borderTop})}>
            <div className={"px-3"}>
                <div className={"-mx-3 px-0"}>
                    <div className={"w-full"}>
                        <h3 className="font-bold text-lg normal-case w-full px-3 py-3 text-left">{header}</h3>
                    </div>
                    <div
                        className="flex flex-col overflow-y-scroll py-2 pt-0 pr-1 pl-3 "
                    >
                        <div className="pb-3">
                            {children}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panel

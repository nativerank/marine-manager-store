import React, {useEffect, useRef} from 'react';
import {useInstantSearch} from 'react-instantsearch';

export function ScrollTo({children}: { children: React.ReactNode }) {
    const {addMiddlewares} = useInstantSearch();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const middleware = () => {
            return {
                onStateChange() {
                    const isFiltering = document.body.classList.contains('filtering');
                    const isTyping =
                        document.activeElement?.tagName === 'INPUT' &&
                        document.activeElement?.getAttribute('type') === 'search';


                    const isShowingMore = document.activeElement?.tagName === 'BODY'

                    if (isFiltering || isTyping || isShowingMore) {
                        return;
                    }
                    containerRef.current!.scrollIntoView();
                },
            };
        };

        return addMiddlewares(middleware);
    }, [addMiddlewares]);

    return (
        <div ref={containerRef} className="ais-ScrollTo">
            {children}
        </div>
    );
}

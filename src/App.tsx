import algoliasearch from 'algoliasearch/lite';
import React, {useCallback, useRef, useState} from 'react';
import {Configure, InstantSearch, InstantSearchSSRProvider, Stats} from 'react-instantsearch';

import {ClearFiltersMobile, NoResults, NoResultsBoundary, SaveFiltersMobile,} from './components';


import './index.css'
import InfiniteGrid from "./components/UI/InfiniteGrid";
import {initialUIState} from "./settings/initialUIStatae";
import {SearchConfig} from "./settings/SearchConfig";
import InfiniteHits from "./components/UI/InfiniteList";
import SortByComponent from "./components/UI/SortByComponent";
import {ScrollTo} from "./components/ScrollTo";
import FiltersSideWidget from "./components/UI/FiltersSideWidget";
import CustomSearchBox from "./components/CustomSearchBox";
import GridIcon from "./components/Icons/GridIcon";
import ListIcon from "./components/Icons/ListIcon";
import classNames from "classnames";
import Drawer from "./components/UI/Drawer";
// import './components/Pagination.css';


const searchClient = algoliasearch(
    'WR1LHA5AEI',
    'aed708cd4183d38b9453be50384dc90b');


function App({serverState}: { serverState?: any }) {

    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef(null);
    const [gridMode, setGridMode] = useState('list');


    const openFilters = useCallback(() => {
        document.body.classList.add('filtering');
        window.scrollTo(0, 0);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('click', onClick);
    }, [])

    const closeFilters = useCallback(() => {
        document.body.classList.remove('filtering');
        containerRef.current!.scrollIntoView();
        window.removeEventListener('keyup', onKeyUp);
        window.removeEventListener('click', onClick);
    }, [])

    const onKeyUp = useCallback((event: { key: string }) => {
        if (event.key !== 'Escape') {
            return;
        }

        closeFilters();
    }, [])

    const onClick = useCallback((event: MouseEvent) => {
        if (event.target !== headerRef.current) {
            return;
        }

        closeFilters();
    }, [])


    // if (!(window as any).MM_DEALER_ID) {
    //     return <>DEALER ID IS MISSING</>
    // }


    return (
        <InstantSearchSSRProvider {...serverState}>
            <InstantSearch
                searchClient={searchClient}
                indexName={'prod_boats'}
                initialUiState={initialUIState}
                insights={{
                    insightsInitParams: {
                        anonymousUserToken: true,
                        useCookie: true
                    }
                }}
                // routing={routing}
                future={{
                    preserveSharedStateOnUnmount: true
                }}>
                <Configure {...SearchConfig}/>

                <ScrollTo>
                    <section className={"bg-white"}>
                        <main ref={containerRef} className={"py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6"}>
                            <div className={"flex gap-4"}>
                                <div className={"hidden md:block w-[302px]"}>
                                    <FiltersSideWidget/>
                                    <footer className="container-filters-footer hidden" data-layout="mobile">
                                        <div className="container-filters-footer-button-wrapper">
                                            <ClearFiltersMobile containerRef={containerRef}/>
                                        </div>
                                        <div className="container-filters-footer-button-wrapper">
                                            <SaveFiltersMobile onClick={closeFilters}/>
                                        </div>
                                    </footer>
                                </div>
                                <div className={"flex-1"}>
                                    <div>
                                        <div>
                                            <div className={"flex justify-between mx-auto gap-x-2"}>
                                                <CustomSearchBox/>
                                                <div className={"hidden lg:block"}>
                                                    <ul className="flex items">
                                                        <li>
                                                            <button onClick={() => setGridMode('grid')}
                                                                    className={classNames('block p-2 py-3 bg-gray-200 hover:bg-gray-300 ', {
                                                                        'opacity-30': gridMode === 'list'
                                                                    })}>
                                                                <GridIcon/>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button onClick={() => setGridMode('list')}
                                                                    className={classNames('block p-2 py-3 bg-gray-200 hover:bg-gray-300 ', {
                                                                        'opacity-30': gridMode === 'grid'
                                                                    })}>
                                                                <ListIcon/>
                                                            </button>
                                                        </li>

                                                    </ul>
                                                </div>
                                                <div className={"w-52"}>
                                                    <SortByComponent/>
                                                </div>
                                            </div>
                                        </div>
                                        <div id={"infinite_list"}>
                                            <Stats
                                                translate={"yes"}
                                                translations={{
                                                    rootElementText({
                                                                        nbHits,
                                                                        processingTimeMS,
                                                                        nbSortedHits,
                                                                        areHitsSorted,
                                                                    }) {
                                                        return `Showing ${nbHits} Results`
                                                    }
                                                }}

                                                className={"text-sm text-gray-500 pt-2"}
                                            />

                                            <NoResultsBoundary fallback={<NoResults/>}>
                                                {gridMode === 'list' ? <InfiniteHits/> :
                                                    <InfiniteGrid/>}
                                            </NoResultsBoundary>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </section>
                </ScrollTo>
                <aside data-layout="mobile" className={"hidden"}>
                    <button
                        className="filters-button"
                        data-action="open-overlay"
                        onClick={openFilters}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 14">
                            <path
                                d="M15 1H1l5.6 6.3v4.37L9.4 13V7.3z"
                                stroke="#fff"
                                strokeWidth="1.29"
                                fill="none"
                                fillRule="evenodd"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Filters
                    </button>
                </aside>
                <Drawer/>
            </InstantSearch>
        </InstantSearchSSRProvider>
    );
}


export default App

import algoliasearch from 'algoliasearch/lite';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Configure, InstantSearch, Stats,} from 'react-instantsearch';

import {ClearFiltersMobile, NoResults, NoResultsBoundary, SaveFiltersMobile,} from './components';


// import './Theme.css';
import './index.css'
// import './App.css';
// import './App.mobile.css';
import InfiniteGrid from "./components/UI/InfiniteGrid";
import {initialUIState} from "./settings/initialUIStatae";
import {SearchConfig} from "./settings/SearchConfig";
import InfiniteHits from "./components/UI/InfiniteHits";
import SortByComponent from "./components/UI/SortByComponent";
import {ScrollTo} from "./components/ScrollTo";
import {routing} from "./utils";
import FiltersSideWidget from "./components/UI/FiltersSideWidget";
import CustomSearchBox from "./components/CustomSearchBox";
// import './components/Pagination.css';


const searchClient = algoliasearch(
    'WR1LHA5AEI',
    'aed708cd4183d38b9453be50384dc90b');


function App() {

    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef(null);
    const [gridMode, setGridMode] = useState('list');
    const [selectedBoatSpecs, setSelectedBoatSpecs] = useState<any>();


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


    useEffect(() => {
        if ((window as any).UIkit) {
            (window as any).UIkit.util.on('#modal-specs', 'hide', function () {
                setSelectedBoatSpecs(undefined)
            });
        }
    }, []);

    if (!(window as any).MM_DEALER_ID) {
        return <>DEALER ID IS MISSING</>
    }


    return (
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
            routing={routing}
            future={{
                preserveSharedStateOnUnmount: true
            }}>
            <Configure {...SearchConfig}/>
            <ScrollTo>
                <section className={"bg-white"}>
                    <main ref={containerRef} className={"py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6"}>
                        <div className={"grid grid-flow-row-dense grid-cols-4"}>
                            <div className={"hidden md:block"}>
                                <FiltersSideWidget/>
                                <footer className="container-filters-footer" data-layout="mobile">
                                    <div className="container-filters-footer-button-wrapper">
                                        <ClearFiltersMobile containerRef={containerRef}/>
                                    </div>
                                    <div className="container-filters-footer-button-wrapper">
                                        <SaveFiltersMobile onClick={closeFilters}/>
                                    </div>
                                </footer>
                            </div>
                            <div className={"col-span-4 md:col-span-3"}>
                                <div>
                                    <div>
                                        <div className={"flex justify-between mx-auto gap-x-2"}>
                                            <CustomSearchBox/>
                                            <div data-layout={"desktop"}>
                                                <ul className="uk-iconnav">
                                                    <li>
                                                        <button onClick={() => setGridMode('grid')}
                                                                className={gridMode === 'grid' ? "uk-active" : ''}
                                                                data-uk-icon="icon: grid"></button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => setGridMode('list')}
                                                                className={gridMode === 'list' ? "uk-active" : ''}
                                                                data-uk-icon="icon: menu"></button>
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
                                            {gridMode === 'list' ? <InfiniteHits onSelectBoatSpecs={(specs: any) => {
                                                    (window as any).UIkit.modal(document.querySelector('#modal-specs')).show()
                                                    setSelectedBoatSpecs(specs)
                                                }}/> :
                                                <InfiniteGrid/>}
                                        </NoResultsBoundary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            </ScrollTo>
            <aside data-layout="mobile">
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

        </InstantSearch>
    );
}


export default App

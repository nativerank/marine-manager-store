import algoliasearch from 'algoliasearch/lite';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Configure, InstantSearch, SearchBox, Stats,} from 'react-instantsearch';

import {ClearFiltersMobile, NoResults, NoResultsBoundary, SaveFiltersMobile,} from './components';


import './Theme.css';
import './App.css';
import './App.mobile.css';
import InfiniteGrid from "./components/UI/InfiniteGrid";
import {initialUIState} from "./settings/initialUIStatae";
import {SearchConfig} from "./settings/SearchConfig";
import SubmitIcon from "./components/UI/SubmitIcon";
import InfiniteHits from "./components/UI/InfiniteHits";
import SortByComponent from "./components/UI/SortByComponent";
import FiltersSideWidget from "./components/UI/FiltersSideWidget";
import {ScrollTo} from "./components/ScrollTo";
import {routing} from "./utils";
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
                <section className={"uk-section uk-section-primary uk-preserve-color"}>
                    <main className="uk-container" ref={containerRef} style={{
                        maxWidth: '1400px',
                    }}>

                        <div className="uk-grid uk-child-width-expand@m uk-grid-small" data-uk-grid>
                            <div className="uk-width-auto container-filters">
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

                            <div>
                                <div className="uk-panel" style={{
                                    background: '#fff',
                                    // clipPath: 'polygon(20px 0,100% 0,100% 100%,0 100%,0 20px)',
                                    padding: '20px'
                                }}>
                                    <div className={"uk-panel uk-padding-small uk-padding-remove-horizontal"}>
                                        <div className="uk-margin-bottom uk-grid uk-child-width-expand uk-flex-middle"
                                             data-uk-grid>
                                            <div>
                                                <SearchBox
                                                    placeholder="Search boat"
                                                    submitIconComponent={SubmitIcon}
                                                />
                                            </div>
                                            <div className={"uk-width-auto"} data-layout={"desktop"}>
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
                                            <div className={"uk-width-auto"}>
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
                                                                    areHitsSorted
                                                                }) {
                                                    return `Showing ${nbHits} Results`
                                                }
                                            }}
                                            style={{
                                                fontSize: 16
                                            }}/>
                                        <hr style={{
                                            margin: '0 0 8px 0'
                                        }}/>

                                        <NoResultsBoundary fallback={<NoResults/>}>
                                            {gridMode === 'list' ? <InfiniteHits onSelectBoatSpecs={(specs: any) => {
                                                    (window as any).UIkit.modal(document.querySelector('#modal-specs')).show()
                                                    setSelectedBoatSpecs(specs)
                                                }}/> :
                                                <InfiniteGrid/>}
                                        </NoResultsBoundary>
                                    </div>
                                    <div className={`uk-flex-top`}
                                         id={"specs-modal"} data-uk-modal>
                                        {selectedBoatSpecs &&
                                            <div className="uk-modal-dialog  uk-margin-auto-vertical" style={{
                                                width: 700
                                            }}>
                                                <button className="uk-modal-close-default" type="button"
                                                        data-uk-close></button>

                                                <div className="uk-modal-header">
                                                    <div className="uk-grid uk-child-width-auto uk-grid-small"
                                                         data-uk-grid>
                                                        <div>
                                                            <img
                                                                src={(selectedBoatSpecs.images[0] as string).includes('cdn.nativerank.com') ? `${selectedBoatSpecs.images[0]}/tr:w-100` : selectedBoatSpecs.images[0]}
                                                                width={100}/>

                                                        </div>
                                                        <div className={"uk-width-expand"}>
                                                            <h3 className={"el-title"}>Vehicle Overview | <span
                                                                className={"boat-title uk-text-bold"}>
                                            {selectedBoatSpecs.name}
                                        </span></h3>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="uk-modal-body" data-uk-overflow-auto>
                                                    <h4 className={"uk-heading-divider uk-text-bold"}>Specifications</h4>
                                                    <div className={"uk-grid uk-child-width-1-2@s uk-grid-row-small"}
                                                         data-uk-grid>
                                                        {selectedBoatSpecs?.attributes && selectedBoatSpecs.attributes.map((attr: any) =>
                                                            <div key={attr.name}>
                                                                <div className="uk-panel">
                                                                    <div
                                                                        className="spec uk-grid uk-child-width-expand uk-space-between"
                                                                        data-uk-grid>
                                                                <span
                                                                    className={"label uk-width-auto"}>{attr.name}:</span>
                                                                        <span
                                                                            className={"value uk-text-bold uk-text-right"}>{attr.value}</span>
                                                                    </div>
                                                                </div>
                                                            </div>)}
                                                    </div>
                                                    {selectedBoatSpecs.description && <>
                                                        <h4 className={"uk-heading-divider uk-text-bold"}>Description</h4>
                                                        <div dangerouslySetInnerHTML={{
                                                            __html: selectedBoatSpecs.description
                                                        }}/>
                                                    </>}

                                                </div>

                                                <div className="uk-modal-footer uk-text-right">

                                                    <a href={selectedBoatSpecs.link}
                                                       className="uk-button uk-button-primary">View Full Listing</a>
                                                </div>


                                            </div>}
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

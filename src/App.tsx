import algoliasearch from 'algoliasearch/lite';
import React, {useEffect, useRef} from 'react';
import {
    Configure,
    HierarchicalMenu,
    Hits,
    HitsPerPage,
    InstantSearch,
    Pagination,
    RefinementList,
    SearchBox,
    SortBy,
    ToggleRefinement,
    Highlight,
    Snippet, RangeInput, HierarchicalMenuProps, useInfiniteHits,
} from 'react-instantsearch-hooks-web';
import {
    AlgoliaSvg,
    ClearFilters,
    ClearFiltersMobile,
    NoResults,
    NoResultsBoundary,
    Panel,
    PriceSlider,
    ResultsNumberMobile,
    SaveFiltersMobile,
} from './components/index';


import './Theme.css';
import './App.css';
import './components/Pagination.css';
import './App.mobile.css';
import {formatNumber} from './utils/index';
import {ScrollTo} from './components/ScrollTo';
import {Hit as AlgoliaHit} from 'instantsearch.js';

const searchClient = algoliasearch(
    'DKCB12KYO6',
    'e8192fc74751b19908e3a5cc87b38028');


function App() {
    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef(null);

    function openFilters() {
        document.body.classList.add('filtering');
        window.scrollTo(0, 0);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('click', onClick);
    }

    function closeFilters() {
        document.body.classList.remove('filtering');
        containerRef.current!.scrollIntoView();
        window.removeEventListener('keyup', onKeyUp);
        window.removeEventListener('click', onClick);
    }

    function onKeyUp(event: { key: string }) {
        if (event.key !== 'Escape') {
            return;
        }

        closeFilters();
    }

    function onClick(event: MouseEvent) {
        if (event.target !== headerRef.current) {
            return;
        }

        closeFilters();
    }

    return (
        <InstantSearch
            searchClient={searchClient}
            indexName={'dev_boats'}
            insights={true}
        >
            <Configure filters={"location.dealer.id=2"}/>
            <header className="header" ref={headerRef}>
                <p className="header-logo">
                    <AlgoliaSvg/>
                </p>

                <p className="header-title">Find your dream boat</p>

                <SearchBox
                    placeholder="Search boat"
                    submitIconComponent={SubmitIcon}
                />
            </header>

            <Configure
                attributesToSnippet={['description:10']}
                snippetEllipsisText="…"
                removeWordsIfNoResults="allOptional"
            />

            <ScrollTo>
                <main className="container" ref={containerRef}>
                    <div className="container-wrapper">
                        <section className="container-filters" onKeyUp={onKeyUp}>
                            <div className="container-header">
                                <h2>Filters</h2>

                                <div className="clear-filters" data-layout="desktop">
                                    <ClearFilters/>
                                </div>

                                <div className="clear-filters" data-layout="mobile">
                                    <ResultsNumberMobile/>
                                </div>
                            </div>

                            <div className="container-body">
                                <Panel header="Location">
                                    <RefinementList attribute="location.city" transformItems={items => {
                                        // Sort all items alphabetically
                                        return items.sort((a, b) => {
                                            const labelA = a.label.toUpperCase();
                                            const labelB = b.label.toUpperCase();
                                            if (labelA < labelB) {
                                                return -1;
                                            }
                                            if (labelA > labelB) {
                                                return 1;
                                            }
                                            return 0;
                                        });
                                    }}/>
                                </Panel>
                                <Panel header="Usage">
                                    <RefinementList attribute="usage"/>
                                </Panel>

                                <Panel header="Manufacturer">
                                    <HierarchicalMenu
                                        showMore={true}

                                        showMoreLimit={100}
                                        limit={10}

                                        transformItems={items => {
                                            return items.map((item) => ({
                                                ...item,
                                                label: item.label,
                                            }));
                                        }}
                                        attributes={[
                                            'lvl0',
                                            'lvl1',
                                        ]}
                                    />
                                </Panel>


                                <Panel header="Price">
                                    <PriceSlider attribute="price"/>
                                </Panel>
                                <Panel header="Price">
                                    <RangeInput
                                        attribute={'year'}
                                    />
                                </Panel>

                                <Panel header="Status">
                                    <RefinementList
                                        attribute="status"
                                        transformItems={items => {
                                            // Sort all items alphabetically
                                            return items.sort((a, b) => {
                                                const labelA = a.label.toUpperCase();
                                                const labelB = b.label.toUpperCase();
                                                if (labelA < labelB) {
                                                    return -1;
                                                }
                                                if (labelA > labelB) {
                                                    return 1;
                                                }
                                                return 0;
                                            });
                                        }}
                                    />
                                </Panel>

                                {/*<Panel header="Free shipping">*/}
                                {/*    <ToggleRefinement*/}
                                {/*        attribute="free_shipping"*/}
                                {/*        label="Display only items with free shipping"*/}
                                {/*        on={true}*/}
                                {/*    />*/}
                                {/*</Panel>*/}

                                {/*<Panel header="Ratings">*/}
                                {/*    <Ratings attribute="rating" />*/}
                                {/*</Panel>*/}
                            </div>
                        </section>

                        <footer className="container-filters-footer" data-layout="mobile">
                            <div className="container-filters-footer-button-wrapper">
                                <ClearFiltersMobile containerRef={containerRef}/>
                            </div>

                            <div className="container-filters-footer-button-wrapper">
                                <SaveFiltersMobile onClick={closeFilters}/>
                            </div>
                        </footer>
                    </div>

                    <section className="container-results">
                        <header className="container-header container-options">
                            <SortBy
                                className="container-option"
                                items={[
                                    {
                                        label: 'Sort by Price',
                                        value: 'price',
                                    },
                                ]}
                            />

                            {/*<HitsPerPage*/}
                            {/*    className="container-option"*/}
                            {/*    items={[*/}
                            {/*        {*/}
                            {/*            label: '16 hits per page',*/}
                            {/*            value: 16,*/}
                            {/*            default: true,*/}
                            {/*        },*/}
                            {/*        {*/}
                            {/*            label: '32 hits per page',*/}
                            {/*            value: 32,*/}
                            {/*        },*/}
                            {/*        {*/}
                            {/*            label: '64 hits per page',*/}
                            {/*            value: 64,*/}
                            {/*        },*/}
                            {/*    ]}*/}
                            {/*/>*/}
                        </header>

                        <NoResultsBoundary fallback={<NoResults/>}>
                            <InfiniteHits hitComponent={Hit}/>
                        </NoResultsBoundary>

                        {/*<footer className="container-footer" style={{height: 400}}>*/}
                        {/*    <Pagination padding={2} showFirst={false} showLast={false}/>*/}
                        {/*</footer>*/}
                    </section>
                </main>
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


function SubmitIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 18 18"
            aria-hidden="true"
        >
            <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.67"
                transform="translate(1 1)"
            >
                <circle cx="7.11" cy="7.11" r="7.11"/>
                <path d="M16 16l-3.87-3.87"/>
            </g>
        </svg>
    );
}

type HitType = AlgoliaHit<any | {
    image: string;
    name: string;
    categories: string[];
    description: string;
    price: number;
    rating: string;
}>;

function Hit({hit}: { hit: HitType }) {
    return (
        <article className="hit">
            <header className="hit-image-container">
                {hit.images && <img src={hit.images[0]} alt={hit.name} className="hit-image"/>}
            </header>

            <div className="hit-info-container">
                <p className="hit-category">{hit.stock_number}</p>
                <h1>
                    <Highlight attribute="name" highlightedTagName="mark" hit={hit}/>
                </h1>
                <p className="hit-description">
                    <Snippet
                        attribute="description"
                        highlightedTagName="mark"
                        hit={hit}
                    />
                </p>

                <footer>
                    <p>
                        <span className="hit-em">$</span>{' '}
                        <strong>{formatNumber(hit.price)}</strong>{' '}
                    </p>
                </footer>
            </div>
        </article>
    );
}


function InfiniteHits(props: any) {

    const {hits, isLastPage, showMore} = useInfiniteHits(props);
    const sentinelRef = useRef(null);


    useEffect(() => {
        if (sentinelRef.current !== null) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.log(' more')

                    if (entry.isIntersecting && !isLastPage) {
                        console.log('showing more')
                        showMore();

                    }
                });
            });

            observer.observe(sentinelRef.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [isLastPage, showMore]);

    return (
        <div>
            <div className="ais-InfiniteHits">
                <ul className="ais-InfiniteHits-list">
                    {hits.map((hit: any) => (
                        <li ref={sentinelRef} key={hit.objectID} className="ais-InfiniteHits-item">
                            <Hit hit={hit}/>
                        </li>
                    ))}
                </ul>
            </div>
            {!isLastPage && <div style={{textAlign: 'center', paddingTop: 30}}>
                <a style={{
                    background: '#1d45f9',
                    color: '#fff',
                    padding: '0 20px',
                    lineHeight: '36px',
                    display: 'inline-block',
                    cursor: 'pointer'
                }}
                   onClick={() => showMore()}
                >
                    Show More
                </a>
            </div>}
        </div>
    );

}


export default App

import {ClearFilters} from "../ClearFilters";
import {ResultsNumberMobile} from "../ResultsNumberMobile";
import {Panel} from "../Panel";
import {HierarchicalMenu, RangeInput, RefinementList} from "react-instantsearch";
import {PriceSlider} from "../PriceSlider";
import React, {memo} from "react";

const FiltersSideWidget = () => {
    return (
        <div className="uk-panel filters-wrapper" style={{
            width: '290px',
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
            border: '1px solid #e5e5e5'
        }}>
            <section>
                <div className="container-header" style={{
                    padding: 10,
                    background: '#fff'
                }}>
                    <h2 className={"uk-h4 uk-margin-remove"}>Filters</h2>
                    <div className="clear-filters" data-layout="desktop">
                        <ClearFilters/>
                    </div>

                    <div className="clear-filters" data-layout="mobile">
                        <ResultsNumberMobile/>
                    </div>
                </div>

                <div className="container-body">
                    <Panel header="Location">
                        <RefinementList attribute="location.city" sortBy={["name"]}/>
                    </Panel>
                    <Panel header="Condition">
                        <RefinementList attribute="usage" sortBy={["name"]}/>
                    </Panel>

                    <Panel header="Manufacturer">
                        <HierarchicalMenu
                            showMore={true}
                            sortBy={["name"]}
                            showMoreLimit={100}
                            limit={10}

                            attributes={[
                                'lvl0',
                                'lvl1',
                            ]}
                        />
                    </Panel>
                    <Panel header="Category">
                        <RefinementList attribute="category" sortBy={["name"]}/>
                    </Panel>

                    <Panel header="Price">
                        <PriceSlider attribute="price"/>
                    </Panel>
                    <Panel header="Year">
                        <RangeInput
                            attribute={'year'}

                        />
                    </Panel>

                    <Panel header="Status">
                        <RefinementList
                            attribute="status"
                            sortBy={["name"]}

                        />
                    </Panel>

                    <canvas height={150} data-layout={"mobile"}></canvas>

                </div>
            </section>

        </div>
    )
}

export default memo(FiltersSideWidget)

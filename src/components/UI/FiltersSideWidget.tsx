import {ClearFilters} from "../ClearFilters";
import {ResultsNumberMobile} from "../ResultsNumberMobile";
import {Panel} from "../Panel";
import {HierarchicalMenu, RangeInput, RefinementList} from "react-instantsearch";
import {PriceSlider} from "../PriceSlider";
import React, {memo} from "react";

const FiltersSideWidget = () => {
    return (
        <div className={""}>
            <section>
                <div className="container-header">
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

import {ClearFilters} from "../ClearFilters";
import {RangeInput, useCurrentRefinements} from "react-instantsearch";
import {PriceSlider} from "../PriceSlider";
import React, {memo, useCallback} from "react";
import CollapsiblePanel from "../../SideFilter/CollapsiblePanel";
import CustomRefinementList from "../CustomRefinementList";
import CustomSwitch from "../CustomSwitcher";
import CustomHierarchicalMenu from "../CustomHierarchicalMenu";
import Panel from "../../SideFilter/Panel";
import LocationRefinementList from "../LocationRefinementList";

const FiltersSideWidget = () => {

    const currentRefinementsApi = useCurrentRefinements({
        includedAttributes: ['location.city', 'location.display_name', 'status', 'lvl0', 'lvl1'],
    });


    const getSelectedItems = useCallback((attribute: string | string[]) => {
        return currentRefinementsApi.items.find((item) => {
            if (typeof attribute === 'string') {
                return item.attribute === attribute
            }

            if (typeof attribute === 'object') {
                return attribute.includes(item.attribute)
            }
        })?.refinements
    }, [currentRefinementsApi])

    return (
        <div className={"rounded border bg-white px-3 relative"}>

            <section>
                <div className="container-header">
                    <div className="clear-filters" data-layout="desktop">
                        <ClearFilters/>
                    </div>

                </div>


                <CustomSwitch attribute={"usage"} sortBy={["name"]}/>

                <CollapsiblePanel
                    borderTop
                    title={"Location"}
                    expanded
                    selectedItems={getSelectedItems('location.display_name')}
                    refine={currentRefinementsApi.refine}>
                    <LocationRefinementList cacheRefinements={'location.display_name'} attribute="location.display_name"
                                            sortBy={["name"]}/>
                </CollapsiblePanel>


                <CollapsiblePanel title="Manufacturer"
                                  selectedItems={getSelectedItems(['lvl0', 'lvl1'])}
                                  expanded
                                  borderTop
                                  refine={currentRefinementsApi.refine}>
                    <CustomHierarchicalMenu
                        showMore={true}
                        sortBy={["name"]}
                        showMoreLimit={100}
                        limit={10}
                        showParentLevel={true}
                        attributes={[
                            'lvl0',
                            'lvl1',
                        ]}
                    />
                </CollapsiblePanel>
                <CollapsiblePanel expanded borderTop title={"Category"} selectedItems={getSelectedItems('category')}
                                  refine={currentRefinementsApi.refine}>
                    <CustomRefinementList attribute="category" sortBy={["name"]}/>
                </CollapsiblePanel>

                <Panel header="Price" borderTop>
                    <PriceSlider attribute="price"/>
                </Panel>
                <Panel header="Year" borderTop>
                    <RangeInput
                        attribute={'year'}
                        classNames={{
                            form: 'flex',
                            input: 'w-full',
                            label: 'flex-1',
                            submit: 'px-4 bg-blue-800 block text-white py-2'
                        }}
                    />
                </Panel>

                <CollapsiblePanel borderTop title="Status" refine={currentRefinementsApi.refine}>
                    <CustomRefinementList
                        attribute="status"
                        sortBy={["name"]}
                    />
                </CollapsiblePanel>


            </section>

        </div>
    )
}

export default memo(FiltersSideWidget)

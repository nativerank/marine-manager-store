import {ConfigureProps} from "react-instantsearch";

const filters = `location.dealer.id=${(window as any).MM_DEALER_ID} AND published = 1`

export const SearchConfig: ConfigureProps = {
    filters: 'MM_FILTERS' in window ? `${filters} ${window.MM_FILTERS}` : filters,
    attributesToSnippet: ['description:10'],
    snippetEllipsisText: "…",
    removeWordsIfNoResults: "allOptional",
    hitsPerPage: 10,
    attributesToHighlight: ['name'],
    // attributesToRetrieve: ['category', 'usage', 'slug'],
}
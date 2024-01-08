import {ConfigureProps} from "react-instantsearch";

export const SearchConfig: ConfigureProps = {
    // filters: `location.dealer.id=${(window as any).MM_DEALER_ID} AND published = 1`,
    attributesToSnippet: ['description:10'],
    snippetEllipsisText: "…",
    removeWordsIfNoResults: "allOptional",
    hitsPerPage: 10
}
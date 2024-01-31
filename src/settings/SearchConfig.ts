import {ConfigureProps} from "react-instantsearch";

const filters = `location.dealer.id=21 AND published = 1`

export const SearchConfig: ConfigureProps = {
    filters: filters,
    attributesToSnippet: ['description:10'],
    snippetEllipsisText: "…",
    removeWordsIfNoResults: "allOptional",
    hitsPerPage: 10
}
export const SearchConfig = {
    filters: `dealer_id=${(window as any).MM_DEALER_ID}`,
    attributesToSnippet: ['description:10'],
    snippetEllipsisText: "…",
    removeWordsIfNoResults: "allOptional",
    hitsPerPage: 10
}
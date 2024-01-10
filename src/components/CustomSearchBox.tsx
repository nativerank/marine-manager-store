import React, {useRef, useState} from 'react';
import {useInstantSearch, useSearchBox, UseSearchBoxProps} from 'react-instantsearch';

function CustomSearchBox(props: UseSearchBoxProps) {
    const {query, refine} = useSearchBox(props);
    const {status} = useInstantSearch();
    const [inputValue, setInputValue] = useState(query);
    const inputRef = useRef<HTMLInputElement>(null);

    const isSearchStalled = status === 'stalled';

    function setQuery(newQuery: string) {
        setInputValue(newQuery);

        refine(newQuery);
    }

    return (

        <form
            action=""
            role="search"
            noValidate
            onSubmit={(event) => {
                event.preventDefault();
                event.stopPropagation();

                if (inputRef.current) {
                    inputRef.current.blur();
                }
            }}
            onReset={(event) => {
                event.preventDefault();
                event.stopPropagation();

                setQuery('');

                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }}
            className={"relative flex items-center w-full h-13 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-solid border border-gray-400"}
        >
            <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    width={20}
                    aria-hidden={"true"}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                </svg>
            </div>
            <label htmlFor="search-boats" className="sr-only">Search Boats</label>


            <input
                id={"search-boats"}
                ref={inputRef}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Search boats"
                spellCheck={false}
                maxLength={512}
                type="search"
                value={inputValue}
                onChange={(event) => {
                    setQuery(event.currentTarget.value);
                }}
                autoFocus
                className={"peer h-full w-full outline-none text-sm text-gray-700 pr-2 rounded-r-lg"}
            />

            {/*<button type="submit"*/}
            {/*        className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">*/}
            {/*    <svg*/}
            {/*        xmlns="http://www.w3.org/2000/svg"*/}
            {/*        fill="none"*/}
            {/*        aria-hidden="true"*/}
            {/*        viewBox="0 0 20 20"*/}
            {/*    >*/}
            {/*        <path*/}
            {/*            stroke="currentColor"*/}
            {/*            strokeLinecap="round"*/}
            {/*            strokeLinejoin="round"*/}
            {/*            strokeWidth="2"*/}
            {/*            d="M19 19l-4-4m0-7A7 7 0 111 8a7 7 0 0114 0z"*/}
            {/*        ></path>*/}
            {/*    </svg>*/}
            {/*    <span className="sr-only">Search</span>*/}
            {/*</button>*/}

            <span hidden={!isSearchStalled}>Searching…</span>
        </form>

    );
}

export default CustomSearchBox
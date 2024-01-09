import {history} from 'instantsearch.js/es/lib/routers';
import {RouterProps} from "instantsearch.js/es/middlewares/createRouterMiddleware";

export function formatNumber(number: string | number): string {
    return Number(number).toLocaleString();
}

export function getBoatAttribute(name: string, attributes: any[]): string | null {
    return attributes.find((attr) => attr.name === name)?.value ?? null
}


export const getCDNImage = ({
                                url,
                                transform
                            }: {
    url: string,
    transform?: string
}) => {
    if (url.includes('cdn.nativerank.com')) {

        if (transform) {
            return `${url}/tr:${transform}`
        }

        return url;
    }

    if (url.includes('marinemanagerpro-com.s3')) {
        return url.replace('https://marinemanagerpro-com.s3.us-west-2.amazonaws.com/', 'https://cdn.nativerank.com/mm-assets/')
    }

    return url
}

const indexName = 'prod_boats'

export const routing: RouterProps = {
    router: history({
        createURL() {
            return ``;
        },
    }),
};


export const calculateMonthlyPayment = ({
                                            APR,
                                            term,
                                            amountFinanced
                                        }: {
    APR: number,
    term: number,
    amountFinanced: number
}) => (amountFinanced * (APR / 12) * (Math.pow((1 + (APR / 12)), APR)) / ((Math.pow((1 + (APR / 12)), term)) - 1)).toFixed(0)

export const convertHtmlToString = (htmlString: any, slice = 250) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const textContent = doc.body.textContent || "";
    return shortenString(textContent, slice);
}

export const shortenString = (inputString: any, maxLength: any) => {
    if (inputString.length <= maxLength) {
        return inputString;
    } else {
        return inputString.slice(0, maxLength - 3) + '...';
    }
}
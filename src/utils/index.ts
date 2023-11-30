import {history} from 'instantsearch.js/es/lib/routers';
import {RouterProps} from "instantsearch.js/es/middlewares/createRouterMiddleware";

export function formatNumber(number: string | number): string {
    return Number(number).toLocaleString();
}

export function getBoatAttribute(name: string, attributes: any[]): string | null {
    return attributes.find((attr) => attr.name === name)?.value ?? null
}


export const getCDNImage = (image: string) => {
    if (image.includes('cdn.nativerank.com')) {
        return image;
    }

    if (image.includes('marinemanagerpro-com.s3')) {
        return image.replace('https://marinemanagerpro-com.s3.us-west-2.amazonaws.com/', 'https://cdn.nativerank.com/mm-assets/')
    }

    return false
}

const indexName = 'prod_boats'

export const routing: RouterProps = {
    router: history({
        createURL() {
            return ``;
        },
    }),
};

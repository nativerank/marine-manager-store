import {Helmet} from "react-helmet";
import {memo, useMemo} from "react";
import {useInfiniteHits, useStats} from 'react-instantsearch';
import {BOAT_PLACEHOLDER_IMAGE} from "../UI/Hit";

const CarouselSchema = () => {
    const {hitsPerPage} = useStats();
    const {hits} = useInfiniteHits<any>();


    const schema = useMemo(() => {

        const obj: any = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "url": (window as any).location.href,
            "numberOfItems": hitsPerPage,
            "itemListOrder": "https://schema.org/ItemListUnordered",
        }


        obj["itemListElement"] = hits.map((hit, idx) => ({
            "@type": "ListItem",
            "position": idx,
            "url": `${(window as any).MM_DOMAIN}/${hit.usage.toLowerCase()}${(window as any).MM_USAGE_SLUG}/${hit.manufacturer.slug}/${hit.slug}`,
            "image": hit.images && Array.isArray(hit.images) && hit.images.length > 0 ? hit.images[0] : BOAT_PLACEHOLDER_IMAGE,
            "name": hit.name

        }))

        return obj

    }, [hits])

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    )
}

export default memo(CarouselSchema)
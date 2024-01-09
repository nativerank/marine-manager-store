import {FC, useCallback, useState} from "react";
import BackIcon from "../Icons/BackIcon";
import ForwardIcon from "../Icons/ForwardIcon";

const Slider: FC<{ images: string[] }> = ({images}) => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const previousSlide = useCallback(() => {
        if (currentSlide === 0) {
            return
        } else {
            setCurrentSlide(currentSlide - 1)
        }
    }, [currentSlide, images])

    const nextSlide = useCallback(() => {
        if (currentSlide === images.length - 1) {
            return
        } else {
            setCurrentSlide(currentSlide + 1)
        }
    }, [currentSlide, images])

    return (
        <div className="overflow-hidden relative">
            <div className="flex transition ease duration-500 max-h-52 lg:max-h-none"
                 style={{
                     transform: `translateX(-${currentSlide * 100}%)`,
                 }}
            >
                {images.map((image, idx) => {

                    return <img loading={`${idx === 0 ? 'eager' : 'lazy'}`}
                                className={"w-full md:w-72 h-auto md:h-full lg:max-h-56 object-cover"}
                                key={'img-' + idx}
                                srcSet={`${image} 800w, ${image} 400w`}
                                sizes="(max-width: 600px) 800w, 400px"
                                src={image} alt={""}/>
                })}
            </div>
            <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-4 text-3xl">
                <button
                    className={"bg-white rounded p-1 disabled:opacity-50 shadow hover:shadow-lg disabled:shadow-none"}
                    disabled={currentSlide === 0}
                    onClick={previousSlide}>
                    <BackIcon/>
                </button>
                <button
                    className={"bg-white rounded p-1 disabled:opacity-50 shadow hover:shadow-lg disabled:shadow-none"}
                    onClick={nextSlide}
                    disabled={currentSlide === images.length - 1}>
                    <ForwardIcon/>
                </button>
            </div>

            <div
                className={`mx-auto inline-flex items-center justify-center overflow-hidden absolute left-1/2 bottom-1 mb-2 h-[12px] -translate-x-1/2 rounded-full bg-[color:rgba(34,34,34,0.75)] py-[4px] px-1`}>
                <ul
                    className="m-0 inline-flex items-center justify-center gap-1 transition-transform duration-300 h-[12px]"
                >
                    {images.map((img, idx) => {
                        return <li key={'nav_' + idx}
                                   onClick={() => setCurrentSlide(idx)}
                                   className={`transition-[property:background,opacity] block shrink-0 rounded-full duration-[400ms] h-[4px] w-[10px]  ${currentSlide === idx ? 'bg-white' : 'bg-[color:rgba(255,255,255,0.5)]'}`}
                                   data-test="carouselDotsDot"></li>
                    })
                    }
                </ul>
            </div>
        </div>

    )
}

export default Slider
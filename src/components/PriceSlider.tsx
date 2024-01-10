import React, {useEffect, useState} from 'react';
import {GetHandleProps, Handles, Rail, Slider, Ticks, Tracks,} from 'react-compound-slider';
import {formatNumber} from '../utils';
import './PriceSlider.css';
import {useRange} from 'react-instantsearch';


function Handle({
                    domain: [min, max],
                    handle: {id, value, percent},
                    disabled,
                    getHandleProps,
                }: {
    domain: [number, number];
    handle: { id: string; value: number; percent: number };
    disabled?: boolean;
    getHandleProps: GetHandleProps;
}) {
    return (
        <>
            {/* Dummy element to make the tooltip draggable */}


            <div
                style={{
                    position: 'absolute',
                    left: `${percent}%`,
                    width: 40,
                    height: 25,
                    transform: 'translate(-50%, -100%)',
                    cursor: disabled ? 'not-allowed' : 'grab',
                    zIndex: 1,
                }}
                aria-hidden={true}
                {...getHandleProps(id)}
            />
            <div
                role="slider"
                className="slider-handle"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                style={{
                    left: `${percent}%`,
                    cursor: disabled ? 'not-allowed' : 'grab',
                }}
                {...getHandleProps(id)}
            />
        </>
    );
}

function convertToTicks(start: any, range: any): number[] {
    const domain =
        range.min === 0 && range.max === 0
            ? {min: undefined, max: undefined}
            : range;

    return [
        start[0] === -Infinity ? domain.min! : start[0]!,
        start[1] === Infinity ? domain.max! : start[1]!,
    ];
}

export function PriceSlider({
                                attribute,
                                min,
                                max,
                            }: {
    attribute: string;
    min?: number;
    max?: number;
}) {
    const {range, start, refine, canRefine} = useRange(
        {
            attribute,
            min,
            max,
        },
        {$$widgetType: 'e-commerce.rangeSlider'}
    );
    const [ticksValues, setTicksValues] = useState(convertToTicks(start, range));
    const [prevStart, setPrevStart] = useState(start);


    useEffect(() => {
        if (start !== prevStart) {
            setTicksValues(convertToTicks(start, range));
            setPrevStart(start);
        }
    }, [start, prevStart]);

    const onChange = (values: readonly number[]) => {
        refine(values as [number, number]);
    };

    const onUpdate = (values: readonly number[]) => {
        setTicksValues(values as [number, number]);
    };

    if (
        !canRefine ||
        ticksValues[0] === undefined ||
        ticksValues[1] === undefined
    ) {
        return null;
    }

    return (
        <div>
            <div className={"flex hidden items-center gap-2 p-1 mb-4"}>
                <input type="text"
                       defaultValue={ticksValues[0]}
                       className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"}/>
                <div>
                    to
                </div>
                <input type="text"
                       defaultValue={ticksValues[1]}
                       className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"}/>
            </div>
            <Slider
                mode={2}
                step={1}
                domain={[range.min!, range.max!]}
                values={start as number[]}
                disabled={!canRefine}
                onChange={onChange}
                onUpdate={onUpdate}
                rootStyle={{position: 'relative'}}
                className="ais-RangeSlider"
            >
                <div className={"mock"} style={{paddingTop: 20}}/>
                <Rail>
                    {({getRailProps}) => (
                        <div className="slider-rail" {...getRailProps()} />
                    )}
                </Rail>

                <Tracks left={false} right={false}>
                    {({tracks, getTrackProps}) => (
                        <div>
                            {tracks.map(({id, source, target}) => (
                                <div
                                    key={id}
                                    className="slider-track"
                                    style={{
                                        left: `${source.percent}%`,
                                        width: `${target.percent - source.percent}%`,
                                    }}
                                    {...getTrackProps()}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>

                <Handles>
                    {({handles, getHandleProps}) => (
                        <div>
                            {handles.map((handle) => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    domain={[range.min!, range.max!]}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>

                <Ticks values={ticksValues}>
                    {({ticks}) => (
                        <div>
                            {ticks.map(({id, value, percent}) => (
                                <div
                                    key={id}
                                    className="slider-tick"
                                    style={{
                                        left: `${percent}%`,
                                    }}
                                >
                                    {/* @ts-ignore */}
                                    <span style={{color: '#0f46f9', marginRight: 4}}>$</span>
                                    {formatNumber(value)}
                                </div>
                            ))}
                        </div>
                    )}
                </Ticks>
            </Slider>
        </div>
    );
}

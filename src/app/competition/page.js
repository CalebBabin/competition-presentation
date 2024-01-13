'use client';

import BigViewPopup from "@/components/BigViewPopup";
import { ItemPreview } from "@/components/ItemPreview";
import { useBackground } from "@/components/util/setPageBackground";
import { useCategory, useCategoryCount } from "@/components/util/state";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


function CategoryOverview({ category }) {
    const count = useCategoryCount(category);
    const items = useCategory(category);

    const [expand, setExpand] = useState(false);

    const ref = useRef();
    useEffect(() => {
        if (!ref.current) return;
        let targetHeight = 0;
        const resizeListener = () => {
            targetHeight = ref.current.children[0].offsetHeight;

            if (expand && ref.current.style.height !== targetHeight + 'px') {
                ref.current.style.height = targetHeight + 'px';
            } else if (!expand && ref.current.style.height !== '0px') {
                ref.current.style.height = '0px';
            }
        }
        resizeListener();

        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [ref.current, expand]);

    return <div className="bg-slate-600 p-2 rounded cursor-default max-w-full w-[700px]">
        <h3 className="text-lg mb-4">
            {category} - {count}
            <span
                onClick={() => setExpand(!expand)}
                className={(expand ? 'rotate-180' : 'rotate-0') + " transition-transform duration-200 material-symbols-outlined inline-block align-bottom ml-1 px-1 rounded hover:bg-slate-500"}
            >
                expand_more
            </span>
        </h3>
        <div ref={ref} className="overflow-hidden transition-all duration-500">
            <div className="w-full flex flex-col gap-4">
                {items.map(item => <ItemPreview key={item.key} item={item} inactive={!expand} />)}
            </div>
        </div>
    </div >
}

export default function Page() {
    useBackground('#aa2556');
    const totalCount = useCategoryCount('no') + useCategoryCount('maybe') + useCategoryCount('yes');

    return (<>
        <BigViewPopup />
        <div className="text-center">
            <h2 className="text-xl md:text-3xl lg:text-6xl my-8">competition view</h2>
            <h2 className="my-8">
                <span className="text-4xl md:text-7xl lg:text-9xl my-8 leading-[50%]">
                    {totalCount}
                </span>
                <br />
                <small className="text-lg md:text-xl lg:text-2xl leading-[0%]">submissions<br />remaining</small>
            </h2>
        </div>


        <div className="w-full text-center border-t-4 border-dashed">
            <h2 className="text-xl lg:text-4xl my-8">Pick your method!</h2>
            <div className="my-8 flex gap-8 px-16 py-8 overflow-x-scroll">
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    Tinder Style<br />(pass/fail)
                    <Link href="/competition/TinderMethod" className="absolute inset-0" />
                </div>
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    Showdown!<br />(1v1)
                </div>
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    Free-For-All<br />(semi-organized chaos)
                </div>
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    I Love Democracy<br />(automated chat vote)
                </div>
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    Lottery<br />(completely random)
                </div>
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    Award Show<br />(category nominations)
                </div>
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    7
                </div>
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    8
                </div>
                <div className="flex-none aspect-video w-48 bg-slate-700 rounded shadow-md overflow-hidden relative">
                    9
                </div>
            </div>
        </div>

        <div className="w-full text-center border-t-4 border-dashed">
            <h2 className="text-xl lg:text-4xl mt-32 mb-8">all submissions:</h2>
        </div>
        <CategoryOverview category="yes" />
        <CategoryOverview category="no" />
        <CategoryOverview category="maybe" />
        <CategoryOverview category="graveyard" />

        <div className="my-16" />
    </>)
}

'use client';

import { useBackground } from "@/components/util/setPageBackground";

export default function NotFound() {
	useBackground('#000000');

	return <div className="text-center">
		<span className="text-2xl md:text-4xl lg:text-8xl xl:text-9xl">Error 404 &nbsp;</span>
		<span className="text-xl md:text-2xl lg:text-4xl xl:text-6xl">Page not found</span>
	</div>
}
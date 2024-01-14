'use client';

import { Button } from "@/components/ui/button";
import { useBackground } from "@/components/util/setPageBackground";
import { ArrowUpCircle, InfoIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";

function Home() {
	useBackground('#138874');
	return (<>
		<div className="flex flex-col gap-4 justify-stretch text-right">
			<Link href='/setup'>
				<Button variant="default">
					<ArrowUpCircle /> &nbsp; Setup New Competition
				</Button>
			</Link>
			<Link href='/competition'>
				<Button variant="secondary">
					<RefreshCcw /> &nbsp; Resume Cached
				</Button>
			</Link>
			<a href='https://github.com/calebbabin/competition-presentation'>
				<Button variant="outline">
					<InfoIcon /> &nbsp; Learn More
				</Button>
			</a>
		</div>
	</>)
}

export default Home

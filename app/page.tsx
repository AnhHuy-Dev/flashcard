"use client";
import CreateModal from "@/components/CreateModal";
import WordSwiper from "@/components/WordSwiper";

export default function Home() {
	return (
		<div>
			<div className="flex items-center justify-center">
				<h1 className="text-center text-3xl font-bold py-4 flex-1">Vocabulary</h1>
			</div>
			<WordSwiper />
		</div>
	);
}

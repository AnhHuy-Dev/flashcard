import WordSwiper from "@/components/WordSwiper";
import { Pagination } from "antd";
import { useState } from "react";
export default function Home() {
	return (
		<div>
			<h1 className="text-center text-3xl font-bold py-6">Vocabulary</h1>
			<WordSwiper />
		</div>
	);
}

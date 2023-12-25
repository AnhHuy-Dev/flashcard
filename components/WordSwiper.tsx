// components/CoverflowCarousel.js
"use client";
import { getWordByPageAndType } from "@/actions/getWordByPage";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { ClipLoader } from "react-spinners";
import { FaChevronDown } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import "swiper/swiper-bundle.css";
import Word from "./Word";
import { Pagination as Pagi } from "antd";
import { Word as WordType } from "@/interface";

import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import useCreateModal from "@/hooks/useCreateModal";
import CreateModal from "./CreateModal";

// Kích hoạt các module bạn muốn sử dụng
SwiperCore.use([EffectCoverflow, Pagination]);

function WordSwiper() {
	const [page, setPage] = useState<number>(0);
	const [type, setType] = useState<string>("ALL");
	const { onOpen, isOpen } = useCreateModal();

	const { data, isLoading } = useQuery({
		queryFn: () => getWordByPageAndType(page, type),
		queryKey: ["word", { page, type }],
	});

	const items: MenuProps["items"] = [
		{
			label: <p>NOUN</p>,
			key: "0",
			onClick: () => setType("NOUN"),
		},
		{
			label: <p>VERB</p>,
			key: "1",
			onClick: () => setType("VERB"),
		},
		{
			label: <p>ADJ</p>,
			onClick: () => setType("ADJ"),
			key: "2",
		},
		{
			label: <p>ADV</p>,
			onClick: () => setType("ADV"),
			key: "3",
		},
		{
			label: <p>ALL</p>,
			onClick: () => setType("ALL"),
			key: "4",
		},
	];

	useEffect(() => {
		if (!data) return;
		const mySwiper = new SwiperCore(".swiper-container", {
			effect: "coverflow",
			grabCursor: true,
			centeredSlides: true,
			slidesPerView: "auto",
			coverflowEffect: {
				rotate: 50,
				stretch: 50,
				depth: 100,
				modifier: 1,
			},
			pagination: {
				el: ".swiper-pagination",
			},
			loopAdditionalSlides: 2,
		});
	}, [data]);

	return (
		<>
			<div className="border-2 border-black rounded-full fixed right-14 p-2 cursor-pointer top-4" onClick={onOpen}>
				<FaPlus className="ml-auto w-5 h-5" />
			</div>
			<div className="flex flex-col">
				<div className="ml-auto mx-14 mb-4 mt-2">
					<Dropdown menu={{ items }} trigger={["click"]}>
						<div className="border border-black px-2 rounded-md cursor-pointer flex items-center gap-x-2 hover:bg-white">
							<span>{type}</span>
							<FaChevronDown />
						</div>
					</Dropdown>
				</div>
				{data && data?.posts.length > 0 && (
					<div className="h-[70vh]">
						<div className="swiper-container">
							<div className="swiper-wrapper">
								{data.posts.map((item: WordType) => {
									return (
										<div key={item._id} className="swiper-slide">
											<Word item={item} />
										</div>
									);
								})}
							</div>
						</div>
					</div>
				)}
				{data?.posts.length == 0 && <div className="m-auto font-semibold text-xl mt-10 italic">Bạn chưa thêm từ nào !</div>}

				{isLoading && (
					<ClipLoader
						cssOverride={{
							position: "fixed",
							top: "40%",
							left: "45%",
							width: "50px",
							height: "50px",
							borderWidth: "4px",
						}}
					/>
				)}
				{data?.posts.length !== 0 && (
					<div className="flex justify-center mt-4">
						<Pagi defaultCurrent={page + 1} total={data?.total} pageSize={10} onChange={(page) => setPage(page - 1)} />
					</div>
				)}
			</div>
			<CreateModal />
		</>
	);
}

export default WordSwiper;

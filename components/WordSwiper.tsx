// components/CoverflowCarousel.js
"use client";
import { getWordByPage } from "@/actions/getWordByPage";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import SwiperCore, { EffectCoverflow, Pagination } from "swiper";
import { ClipLoader } from "react-spinners";

import "swiper/swiper-bundle.css";
import Word from "./Word";
import { Pagination as Pagi } from "antd";
// Kích hoạt các module bạn muốn sử dụng
SwiperCore.use([EffectCoverflow, Pagination]);

function WordSwiper() {
	const [page, setPage] = useState<number>(0);

	const { data, isLoading } = useQuery({
		queryFn: () => getWordByPage(page),
		queryKey: ["word", { page }],
	});

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

		return () => {
			mySwiper.destroy();
		};
	}, [page, data]);

	return (
		<>
			<div className="h-[75vh]">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						{data &&
							data.posts.map((item, index) => {
								return (
									<div key={item._id} className="swiper-slide">
										<Word item={item} />
									</div>
								);
							})}
					</div>
				</div>
			</div>
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
			<div className="flex justify-center mt-4">
				<Pagi defaultCurrent={page + 1} total={data?.total} pageSize={10} onChange={(page) => setPage(page - 1)} />
			</div>
		</>
	);
}

export default WordSwiper;

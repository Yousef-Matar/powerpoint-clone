import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleSlide from "../../../Slide/SingleSlide";
const SlideNavigation = () => {
	const slides = useSelector<slidesInterface, slidesInterface["slides"]>(
		(state) => state.slides
	);
	const [navBarHeight, setNavBarHeight] = useState(0);
	useEffect(() => {
		let navBarElement = document.getElementById("nav-bar");
		if (navBarElement) {
			setNavBarHeight(navBarElement.offsetHeight);
		}
	}, []);

	return (
		<div
			id="slide-navigation"
			className="min-w-[30%] max-w-[40%] max-h-full overflow-y-auto"
			style={{
				width: "30%",
				height: `calc(100vh - ${navBarHeight}px)`,
			}}
		>
			<ol
				className="list-decimal mx-7 my-7 flex flex-col gap-5"
				style={{
					height: `calc(100vh - (${navBarHeight}px + 1.75*2rem))`,
				}}
				//style={{
				//	zoom: "0.4",
				//}}
			>
				{slides.map((slide, index) => {
					return (
						<li key={index} className="min-h-[25%]">
							<SingleSlide slide={slide} navigation={true} />
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default SlideNavigation;

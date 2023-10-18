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
			className="min-w-[33.333333%] max-w-[66.666666%] max-h-full overflow-y-auto"
			style={{
				width: "33.333333%",
				height: `calc(100vh - ${navBarHeight}px)`,
			}}
		>
			<ol className="list-decimal mx-7 my-7 flex flex-col gap-5">
				{slides.map((slide, index) => {
					return (
						<li key={index}>
							<SingleSlide slide={slide} navigation={true} />
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default SlideNavigation;

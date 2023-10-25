import React, { useEffect, useState } from "react";
import ActiveSlide from "./util/ActiveSlide";

const LayoutView = () => {
	const [navBarHeight, setNavBarHeight] = useState<number>(0);
	const slideNavigationSection = document.getElementById("slide-navigation");
	const layoutSplitter = document.getElementById("layout-splitter");
	const [moveX, setMoveX] = useState(0);
	const [dragging, setDragging] = useState(false);
	const calculateSlideNavigationWidth = () => {
		if (slideNavigationSection?.style && layoutSplitter) {
			slideNavigationSection.style.width =
				moveX - layoutSplitter.getBoundingClientRect().width + "px";
		}
	};
	useEffect(() => {
		let navbar = document.getElementById("nav-bar");
		if (navbar) setNavBarHeight(navbar?.offsetHeight);
	}, []);

	return (
		<div
			className={`flex ${dragging && "cursor-col-resize"}`}
			style={{
				height: `calc(100vh - ${navBarHeight}px)`,
			}}
			onMouseMove={(event) => {
				if (dragging) {
					event.preventDefault()
					setMoveX(event.clientX);
					calculateSlideNavigationWidth();
				}
			}}
			onMouseUp={() => setDragging(false)}
		>
			<div id="slide-navigation" className="min-w-[20%] max-w-[40%] p-10">
				Left Section {moveX}
			</div>
			<div
				id="layout-splitter"
				className="min-w-[0.5rem] max-w-[0.5rem] bg-neutral-600 cursor-col-resize"
				onMouseDown={(event) => {
					event.preventDefault()
					setDragging(true);
					setMoveX(event.clientX);
				}}
			/>
			<ActiveSlide />
		</div>
	);
};

export default LayoutView;

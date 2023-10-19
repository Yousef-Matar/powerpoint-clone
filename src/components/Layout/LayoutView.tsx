import React, { useState } from "react";
import SlideView from "./util/SlideLayout/SlideView";
import SlideNavigation from "./util/SlideNavigation/SlideNavigation";

const LayoutView = () => {
	const SlideNavigationSection = document.getElementById("slide-navigation");
	const layoutSplitter = document.getElementById("slide-layout-splitter");
	const [moveX, setMoveX] = useState(0);
	const [drag, setDrag] = useState(false);
	return (
		<div
			className="flex flex-1"
			onMouseMove={(event) => {
				setMoveX(event.clientX);
				if (drag) {
					if (SlideNavigationSection?.style && layoutSplitter) {
						SlideNavigationSection.style.width =
							moveX -
							layoutSplitter.getBoundingClientRect().width +
							"px";
					}
				}
			}}
			onMouseUp={() => setDrag(false)}
		>
			<SlideNavigation />
			<div
				id="slide-layout-splitter"
				className="min-w-[0.5rem] max-w-[0.5rem] bg-slate-600 cursor-col-resize"
				onMouseDown={(event) => {
					setDrag(true);
					setMoveX(event.clientX);
				}}
			/>
			<SlideView />
		</div>
	);
};

export default LayoutView;

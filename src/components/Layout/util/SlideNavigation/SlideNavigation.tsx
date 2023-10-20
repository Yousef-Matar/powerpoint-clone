import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleSlide from "../../../Slide/SingleSlide";
const ctrlKey = "Control";
const cKey = "c";
const vKey = "v";
const SlideNavigation = () => {
	const dispatch = useDispatch();
	const slides = useSelector<storeInterface, storeInterface["slides"]>(
		(state) => state.slides
	);
	const [navBarHeight, setNavBarHeight] = useState(0);
	const [ctrlDown, setCtrlDown] = useState(false);
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
				className="list-decimal px-7 py-7 flex flex-col gap-5 cursor-default"
				style={{
					height: `calc(100vh - (${navBarHeight}px + 1.75*2rem))`,
				}}
				onKeyDown={(event) => {
					event.preventDefault();
					if (event.key === ctrlKey) setCtrlDown(true);
					if (ctrlDown && event.key === vKey)
						dispatch({
							type: "PASTE_SLIDE",
						});
				}}
				onKeyUp={(event) => {
					event.preventDefault();
					if (event.key === ctrlKey) setCtrlDown(false);
				}}
			>
				{slides.map((slide, index) => {
					return (
						<li
							key={index}
							className="min-h-[25%] relative focus:outline-none select-none"
							onKeyDown={(event) => {
								event.preventDefault();
								if (event.key === ctrlKey) setCtrlDown(true);
								if (ctrlDown && event.key === cKey)
									dispatch({
										type: "COPY_ELEMENT",
										payload: slide,
									});
							}}
							onKeyUp={(event) => {
								event.preventDefault();
								if (event.key === ctrlKey) setCtrlDown(false);
							}}
							contentEditable
							suppressContentEditableWarning
						>
							<SingleSlide slide={slide} navigation={true} />
						</li>
					);
				})}
			</ol>
		</div>
	);
};

export default SlideNavigation;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleSlide from "../../../Slide/SingleSlide";
const ctrlKey = "Control";
const cKey = "c";
const vKey = "v";
const backspaceKey = "Backspace";
const deleteKey = "Delete";
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
							className="min-h-[25%] relative select-none caret-transparent"
							onKeyDown={(event) => {
								event.preventDefault();
								if (event.key === ctrlKey) setCtrlDown(true);
								if (ctrlDown && event.key === cKey)
									dispatch({
										type: "COPY_SLIDE",
										payload: slide,
									});
								if (
									event.key === deleteKey ||
									event.key === backspaceKey
								)
									dispatch({
										type: "DELETE_SLIDE",
										payload: {
											slideID: slide.id,
											slideIndex: index,
										},
									});
							}}
							onKeyUp={(event) => {
								event.preventDefault();
								if (event.key === ctrlKey) setCtrlDown(false);
							}}
							onClick={(event) => event.preventDefault()}
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

import React, { useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../util/Debounce";

const SingleSlide = (props: { slide: slide; navigation: boolean }) => {
	const dispatch = useDispatch();
	const [initialSlide, setInitialSlide] = useState(props.slide);
	const selectSlide = (slideID: string) => {
		dispatch({ type: "SELECT_SLIDE", payload: slideID });
	};
	const updateSlide = (slide: slide) => {
		setInitialSlide(slide);
		updateStore(slide);
	};
	const _updateStore = (slide: slide) => {
		dispatch({ type: "UPDATE_SLIDE", payload: slide });
	};
	const updateStore = useDebounce(_updateStore, 300);
	useEffect(() => {
		setInitialSlide(props.slide);
	}, [props.slide]);

	const moveElement = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		element: HTMLElement | null
	) => {
		if (element == null) return;
		var clickPositionX = 0;
		var clickPositionY = 0;
		var newClickPositionX = 0;
		var newClickPositionY = 0;
		clickPositionX = event.clientX;
		clickPositionY = event.clientY;
		document.onmouseup = () => {
			document.onmouseup = null;
			document.onmousemove = null;
		};
		document.onmousemove = (event) => {
			newClickPositionX = clickPositionX - event.clientX;
			newClickPositionY = clickPositionY - event.clientY;
			clickPositionX = event.clientX;
			clickPositionY = event.clientY;
			element.style.top = element.offsetTop - newClickPositionY + "px";
			element.style.left = element.offsetLeft - newClickPositionX + "px";
		};
	};
	return (
		<div
			className={`bg-white dark:bg-black rounded p-3 relative ${
				props.navigation
					? `h-[25vh] overflow-hidden cursor-pointer ${
							initialSlide.active &&
							"border-4 border-slate-900 dark:border-slate-500"
					  }`
					: "h-full"
			}`}
			{...(props.navigation &&
				!initialSlide.active && {
					onClick: () => selectSlide(initialSlide.id),
				})}
			title={props.navigation ? initialSlide.header : undefined}
		>
			<div
				{...(!props.navigation && {
					id: "layout-slide-header-moveable",
				})}
				className={`bg-transparent rounded text-3xl absolute cursor-move left-[5%] top-[20%]  ${
					!props.navigation &&
					"p-5 border border-dashed focus-within:border-solid"
				}`}
				style={{
					zoom: props.navigation ? "0.4" : "1",
					maxWidth: "100%",
					width: "90%",
				}}
				{...(!props.navigation && {
					onMouseDown: (event) =>
						moveElement(
							event,
							document.getElementById(
								"layout-slide-header-moveable"
							)
						),
				})}
			>
				<ContentEditable
					className="p-4 focus:outline-none cursor-text"
					html={
						initialSlide.header.length
							? initialSlide.header
							: props.navigation
							? ""
							: "Click to add title"
					}
					disabled={props.navigation}
					onChange={(event) =>
						updateSlide({
							...initialSlide,
							header: event.currentTarget.innerHTML,
						})
					}
				/>
			</div>
		</div>
	);
};

export default SingleSlide;

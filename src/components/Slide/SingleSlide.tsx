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
		htmlElement: HTMLElement | null,
		elementID: string
	) => {
		if (htmlElement == null) return;
		var clickPositionX = 0;
		var clickPositionY = 0;
		var newElementPositionX = 0;
		var newElementPositionY = 0;
		clickPositionX = event.clientX;
		clickPositionY = event.clientY;
		document.onmouseup = () => {
			document.onmouseup = null;
			document.onmousemove = null;
			updateSlide({
				...initialSlide,
				elements: initialSlide.elements.map((element) => {
					if (element.id === elementID) {
						return {
							...element,
							position: {
								top: newElementPositionY + "px",
								left: newElementPositionX + "px",
							},
						};
					} else {
						return element;
					}
				}),
			});
		};
		document.onmousemove = (event) => {
			newElementPositionX =
				htmlElement.offsetLeft - (clickPositionX - event.clientX);
			newElementPositionY =
				htmlElement.offsetTop - (clickPositionY - event.clientY);
			clickPositionX = event.clientX;
			clickPositionY = event.clientY;
			htmlElement.style.top = newElementPositionY + "px";
			htmlElement.style.left = newElementPositionX + "px";
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
		>
			{initialSlide.elements.map((renderedElement) => {
				return (
					<div
						key={initialSlide.id + "_" + renderedElement.id}
						className={`bg-transparent rounded absolute cursor-move p-5 
						${
							!props.navigation &&
							"border border-dashed focus:border-solid focus-within:border-solid"
						}`}
						style={{
							zoom: props.navigation ? "0.4" : "1",
							maxWidth: "100%",
							width: "90%",
							top: renderedElement.position.top,
							left: renderedElement.position.left,
						}}
						{...(!props.navigation && {
							id: `layout-slide-${renderedElement.id}-moveable`,
							tabIndex: -1,
							onMouseDown: (event) =>
								moveElement(
									event,
									document.getElementById(
										`layout-slide-${renderedElement.id}-moveable`
									),
									renderedElement.id
								),
						})}
					>
						<ContentEditable
							className={`p-4 focus:outline-none cursor-text ${
								renderedElement.type === "title"
									? "text-3xl"
									: "text-xl"
							}`}
							html={
								renderedElement.content.length
									? renderedElement.content
									: props.navigation
									? ""
									: renderedElement.placeholder
							}
							disabled={props.navigation}
							onChange={(event) =>
								updateSlide({
									...initialSlide,
									elements: initialSlide.elements.map(
										(element) => {
											if (
												element.id ===
												renderedElement.id
											) {
												return {
													...element,
													content:
														event.currentTarget
															.innerHTML,
												};
											} else {
												return element;
											}
										}
									),
								})
							}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default SingleSlide;

export { };
// import React, { useEffect, useState } from "react";
// import ContentEditable from "react-contenteditable";
// import { useDispatch } from "react-redux";
// import { useDebounce } from "../../util/Debounce";
// const ctrlKey = "Control";
// const cKey = "c";
// const vKey = "v";
// const backspaceKey = "Backspace";
// const deleteKey = "Delete";
// const SingleSlide = (props: { slide: slide; navigation: boolean }) => {
// 	const dispatch = useDispatch();
// 	const [initialSlide, setInitialSlide] = useState(props.slide);
// 	const slideWrapper = document.getElementById(`slide-${initialSlide.id}`);
// 	const [ctrlDown, setCtrlDown] = useState(false);
// 	const selectSlide = (slideID: string) => {
// 		dispatch({ type: "SELECT_SLIDE", payload: slideID });
// 	};
// 	const updateSlide = (slide: slide) => {
// 		setInitialSlide(slide);
// 		updateStore(slide);
// 	};
// 	const _updateStore = (slide: slide) => {
// 		dispatch({ type: "UPDATE_SLIDE", payload: slide });
// 	};
// 	const updateStore = useDebounce(_updateStore, 300);
// 	useEffect(() => {
// 		setInitialSlide(props.slide);
// 	}, [props.slide]);

// 	const moveElement = (
// 		event: React.MouseEvent<HTMLDivElement, MouseEvent>,
// 		htmlElement: HTMLElement | null,
// 		elementID: string
// 	) => {
// 		if (htmlElement == null || slideWrapper == null) return;
// 		var clickPositionX = event.clientX;
// 		var clickPositionY = event.clientY;
// 		var newElementPositionX =
// 			htmlElement.offsetLeft - (clickPositionX - event.clientX);
// 		var newElementPositionY =
// 			htmlElement.offsetTop - (clickPositionY - event.clientY);
// 		document.onmouseup = () => {
// 			document.onmouseup = null;
// 			document.onmousemove = null;
// 			updateSlide({
// 				...initialSlide,
// 				elements: initialSlide.elements.map((element) => {
// 					if (element.id === elementID) {
// 						return {
// 							...element,
// 							position: {
// 								top:
// 									(newElementPositionY /
// 										slideWrapper.clientHeight) *
// 										100 +
// 									"%",
// 								left:
// 									(newElementPositionX /
// 										slideWrapper.clientWidth) *
// 										100 +
// 									"%",
// 							},
// 						};
// 					} else {
// 						return element;
// 					}
// 				}),
// 			});
// 		};
// 		document.onmousemove = (event) => {
// 			newElementPositionX =
// 				htmlElement.offsetLeft - (clickPositionX - event.clientX);
// 			newElementPositionY =
// 				htmlElement.offsetTop - (clickPositionY - event.clientY);
// 			clickPositionX = event.clientX;
// 			clickPositionY = event.clientY;
// 			htmlElement.style.top =
// 				(newElementPositionY / slideWrapper.clientHeight) * 100 + "%";
// 			htmlElement.style.left =
// 				(newElementPositionX / slideWrapper.clientWidth) * 100 + "%";
// 		};
// 	};
// 	return (
// 		<div
// 			className={`bg-white dark:bg-black rounded p-3 relative h-full ${
// 				props.navigation
// 					? `overflow-hidden cursor-pointer ${
// 							initialSlide.active &&
// 							"border-4 border-slate-900 dark:border-slate-500"
// 					  }`
// 					: ""
// 			}`}
// 			{...(props.navigation
// 				? !initialSlide.active && {
// 						onClick: () => selectSlide(initialSlide.id),
// 				  }
// 				: { id: `slide-${initialSlide.id}`,
// 				onKeyDown: (event) => {
// 					event.preventDefault();
// 					if (event.key === ctrlKey) setCtrlDown(true);
// 					if (ctrlDown && event.key === vKey)
// 						dispatch({
// 							type: "PASTE_ELEMENT",
// 						});
// 				},
// 				onKeyUp: (event) => {
// 					event.preventDefault();
// 					if (event.key === ctrlKey) setCtrlDown(false);
// 				},
// 			})}
// 		>
// 			{initialSlide.elements.map((renderedElement) => {
// 				return (
// 					<div
// 						key={initialSlide.id + "_" + renderedElement.id}
// 						className={`bg-transparent rounded absolute p-5 z-0 
// 						${
// 							!props.navigation &&
// 							"cursor-move border border-dashed focus:border-solid focus-within:border-solid"
// 						}`}
// 						style={{
// 							zoom: props.navigation ? "0.4" : "1",
// 							maxWidth: "100%",
// 							width: "90%",

// 							top: renderedElement.position.top,
// 							left: renderedElement.position.left,
// 						}}
// 						{...(!props.navigation && {
// 							id: `layout-slide-${renderedElement.id}-moveable`,
// 							tabIndex: -1,
// 							onMouseDown: (event) =>
// 								moveElement(
// 									event,
// 									document.getElementById(
// 										`layout-slide-${renderedElement.id}-moveable`
// 									),
// 									renderedElement.id
// 								),
// 							onKeyDown: (event) => {
// 								event.preventDefault();
// 								if (event.key === ctrlKey) setCtrlDown(true);
// 								if (ctrlDown && event.key === cKey)
// 									dispatch({
// 										type: "COPY_ELEMENT",
// 										payload: renderedElement,
// 									});
// 							},
// 							onKeyUp: (event) => {
// 								event.preventDefault();
// 								if (event.key === ctrlKey) setCtrlDown(false);
// 							},
// 						})}
// 					>
// 						{["title", "subtitle"].includes(
// 							renderedElement.type
// 						) ? (
// 							<ContentEditable
// 								className={`p-4 focus:outline-none ${
// 									renderedElement.type === "title"
// 										? "text-3xl "
// 										: "text-xl "
// 								}${
// 									props.navigation
// 										? "cursor-pointer"
// 										: "cursor-text"
// 								}`}
// 								html={
// 									renderedElement.content.length
// 										? renderedElement.content
// 										: ""
// 								}
// 								disabled={props.navigation}
// 								onChange={(event) =>
// 									updateSlide({
// 										...initialSlide,
// 										elements: initialSlide.elements.map(
// 											(element) => {
// 												if (
// 													element.id ===
// 													renderedElement.id
// 												) {
// 													return {
// 														...element,
// 														content:
// 															event.currentTarget
// 																.innerHTML,
// 													};
// 												} else {
// 													return element;
// 												}
// 											}
// 										),
// 									})
// 								}
// 								onMouseDown={(event) => event.stopPropagation()}
// 								onKeyDown={(event) => event.stopPropagation()}
// 							/>
// 						) : (
// 							<div>Image</div>
// 						)}
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// };

// export default SingleSlide;

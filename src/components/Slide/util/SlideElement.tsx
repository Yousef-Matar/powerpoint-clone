import React, { useState } from "react";
import ContentEditable from "react-contenteditable";
import { useDispatch, useSelector } from "react-redux";
import * as keyboard from "../../../constants/keyboardKeys.constants";
import {
	copyElement,
	deleteSlideElement,
	selectSlideElement,
	updateSlideElement,
} from "../../../store/actions/actions";
import { useDebounce } from "../../../util/Debounce";
interface ISlideElementProps {
	slideElement: ISlideElement;
	navigation: boolean;
}
const minWidth = 5;
const minHeight = 5;
const SlideElement = (props: ISlideElementProps) => {
	const dispatch = useDispatch();
	const activeSlide = useSelector<IPowerpoint, IPowerpoint["activeSlide"]>(
		(state) => state.activeSlide
	);
	const [holdingCTRL, setHoldingCTRL] = useState(false);
	const handleSelectSlideElement = () => {
		if (activeSlide?.selectedElement?.id !== props.slideElement.id) {
			dispatch(
				selectSlideElement(
					activeSlide?.elements.indexOf(props.slideElement)
				)
			);
		}
	};
	// Mouse Events
	// Move Slide Element
	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		var htmlElement = event.currentTarget;
		var singleSlideHtmlElement = htmlElement.parentElement;
		var clickPositionX = event.clientX;
		var clickPositionY = event.clientY;
		if (singleSlideHtmlElement) {
			// Normal Dragging
			var elementPosition = {
				top:
					((htmlElement.offsetTop -
						(clickPositionY - event.clientY)) /
						singleSlideHtmlElement.clientHeight) *
					100,
				left:
					((htmlElement.offsetLeft -
						(clickPositionX - event.clientX)) /
						singleSlideHtmlElement.clientWidth) *
					100,
			};
			handleMouseMove(
				htmlElement,
				elementPosition,
				clickPositionX,
				clickPositionY
			);
			handleMouseUp(
				htmlElement,
				elementPosition,
				props.slideElement.size
			);
		}
	};
	const handleMouseMove = (
		htmlElement: HTMLDivElement,
		elementProperty: IElementPosition,
		clickPositionX: number,
		clickPositionY: number
	) => {
		var singleSlideHtmlElement = htmlElement.parentElement;
		document.onmousemove = (event) => {
			if (singleSlideHtmlElement) {
				elementProperty.left =
					((htmlElement.offsetLeft -
						(clickPositionX - event.clientX)) /
						singleSlideHtmlElement.clientWidth) *
					100;
				elementProperty.top =
					((htmlElement.offsetTop -
						(clickPositionY - event.clientY)) /
						singleSlideHtmlElement.clientHeight) *
					100;
				clickPositionX = event.clientX;
				clickPositionY = event.clientY;

				htmlElement.style.top = elementProperty.top + "%";
				htmlElement.style.left = elementProperty.left + "%";
			}
		};
	};
	const handleMouseUp = (
		htmlElement: HTMLElement | undefined | null,
		elementPosition: IElementPosition,
		elementSize: IElementSize
	) => {
		document.onmouseup = () => {
			document.onmouseup = null;
			document.onmousemove = null;
			document.body.classList.remove("cursor-nwse-resize");
			document.body.classList.remove("cursor-nesw-resize");
			document.body.classList.remove("cursor-ew-resize");
			document.body.classList.remove("cursor-ns-resize");
			dispatch(
				updateSlideElement({
					...props.slideElement,
					position: { ...elementPosition },
					size: { ...elementSize },
				})
			);
			if (htmlElement)
				htmlElement.scrollIntoView({
					behavior: "smooth",
					block: "end",
					inline: "nearest",
				});
		};
	};
	// Resize Slide Element
	const handleResize = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		// Calculation Values
		var { height, width } = props.slideElement.size;
		var { top, left } = props.slideElement.position;
		// Html Elements
		var selectedResizer = event.currentTarget;
		var slideElementHTML = event.currentTarget.parentElement;
		var singleSlideHtmlElement = slideElementHTML?.parentElement;
		var clickPositionX = event.clientX;
		var clickPositionY = event.clientY;
		var newElementPosition = { ...props.slideElement.position };
		var newElementSize = { ...props.slideElement.size };
		if (
			selectedResizer.classList.contains("top-left") ||
			selectedResizer.classList.contains("bottom-right")
		) {
			document.body.className = "cursor-nwse-resize";
		} else if (
			selectedResizer.classList.contains("top-right") ||
			selectedResizer.classList.contains("bottom-left")
		) {
			document.body.className = "cursor-nesw-resize";
		} else if (
			selectedResizer.classList.contains("middle-right") ||
			selectedResizer.classList.contains("middle-left")
		) {
			document.body.className = "cursor-ew-resize";
		} else {
			document.body.className = "cursor-ns-resize";
		}
		document.onmousemove = (event) => {
			if (slideElementHTML && singleSlideHtmlElement) {
				var newValueX =
					((event.clientX - clickPositionX) /
						singleSlideHtmlElement.clientWidth) *
					100;
				var newValueY =
					((event.clientY - clickPositionY) /
						singleSlideHtmlElement.clientHeight) *
					100;
				// Right Top & Bottom Resizers Width Calculation
				if (
					selectedResizer.classList.contains("bottom-right") ||
					selectedResizer.classList.contains("top-right") ||
					selectedResizer.classList.contains("middle-right")
				) {
					width = props.slideElement.size.width + newValueX;
				}
				// Left Top & Bottom Resizer Width & Left Calculation
				if (
					selectedResizer.classList.contains("bottom-left") ||
					selectedResizer.classList.contains("top-left") ||
					selectedResizer.classList.contains("middle-left")
				) {
					width = props.slideElement.size.width - newValueX;
					left = props.slideElement.position.left + newValueX;
				}
				// Bottom Right & Left Resizers Height Calculation
				if (
					selectedResizer.classList.contains("bottom-right") ||
					selectedResizer.classList.contains("bottom-left") ||
					selectedResizer.classList.contains("bottom-middle")
				) {
					height = props.slideElement.size.height + newValueY;
				}
				// Top Right & Left Resizer Height & Top Calculation
				if (
					selectedResizer.classList.contains("top-right") ||
					selectedResizer.classList.contains("top-left") ||
					selectedResizer.classList.contains("top-middle")
				) {
					height = props.slideElement.size.height - newValueY;
					top = props.slideElement.position.top + newValueY;
				}
				// Element New Styling
				if (width > minWidth) {
					newElementPosition.left = left;
					newElementSize.width = width;
					slideElementHTML.style.width = newElementSize.width + "%";
					slideElementHTML.style.left = newElementPosition.left + "%";
				}
				if (height > minHeight) {
					newElementPosition.top = top;
					newElementSize.height = height;
					slideElementHTML.style.height = newElementSize.height + "%";
					slideElementHTML.style.top = newElementPosition.top + "%";
				}
			}
		};
		handleMouseUp(
			singleSlideHtmlElement,
			newElementPosition,
			newElementSize
		);
	};
	// Keyboard Events
	const handleKeyDown = (pressedKey: string) => {
		if (pressedKey === keyboard.ctrlKey) {
			setHoldingCTRL(true);
		}
		if (holdingCTRL && pressedKey === keyboard.cKey) {
			dispatch(copyElement("slideElement"));
		}
		if ([keyboard.deleteKey, keyboard.backspaceKey].includes(pressedKey)) {
			dispatch(deleteSlideElement());
		}
	};
	const handleCtrlKeyUp = (pressedKey: string) => {
		if (pressedKey === keyboard.ctrlKey) {
			setHoldingCTRL(false);
		}
	};
	// Update Slide Element Content
	const updateContent = useDebounce((value: string) => {
		dispatch(
			updateSlideElement({
				...props.slideElement,
				content: value,
			})
		);
	}, 300);
	return (
		<div
			className={`bg-transparent rounded absolute flex items-center ${
				props.navigation
					? `preview-slide p-2`
					: `p-5 border show-resize ${
							props.slideElement.content?.length === 0
								? "border-dashed"
								: "border-none"
					  } cursor-move focus:border-solid focus-within:border-dashed`
			}`}
			style={{
				width: props.slideElement.size?.width + "%",
				height: props.slideElement.size?.height + "%",
				top: props.slideElement.position?.top + "%",
				left: props.slideElement.position?.left + "%",
			}}
			draggable={false}
			{...(!props.navigation && {
				tabIndex: -1,
				onMouseDown: (event) => handleMouseDown(event),
				onBlur: (event) => {
					if (!event.currentTarget.contains(event.relatedTarget)) {
						dispatch(selectSlideElement(-1));
					}
				},
				onClick: () => handleSelectSlideElement(),
				onKeyDown: (event) => handleKeyDown(event.key),
				onKeyUp: (event) => handleCtrlKeyUp(event.key),
			})}
		>
			{!props.navigation && (
				<>
					<div
						className="resize-indicator top-left bg-neutral-800 absolute z-1 w-2 h-2 rounded-full cursor-nwse-resize -left-1 -top-1"
						onMouseDown={(event) => {
							event.stopPropagation();
							handleResize(event);
						}}
					/>
					<div
						className="resize-indicator middle-left bg-neutral-800 absolute z-1 w-2 h-2 rounded-full cursor-ew-resize -left-1 top-[calc(50%-4px)]"
						onMouseDown={(event) => {
							event.stopPropagation();
							handleResize(event);
						}}
					/>
					<div
						className="resize-indicator top-middle bg-neutral-800 absolute z-1 w-2 h-2 rounded-full cursor-ns-resize left-[calc(50%-4px)] -top-1"
						onMouseDown={(event) => {
							event.stopPropagation();
							handleResize(event);
						}}
					/>
					<div
						className="resize-indicator bottom-left bg-neutral-800 absolute z-1 w-2 h-2 rounded-full cursor-nesw-resize -left-1 -bottom-1"
						onMouseDown={(event) => {
							event.stopPropagation();
							handleResize(event);
						}}
					/>
					<div
						className="resize-indicator top-right bg-neutral-800 absolute z-1 w-2 h-2 rounded-full cursor-nesw-resize -right-1 -top-1"
						onMouseDown={(event) => {
							event.stopPropagation();
							handleResize(event);
						}}
					/>
					<div
						className="resize-indicator bottom-middle bg-neutral-800 absolute z-1 w-2 h-2 rounded-full cursor-ns-resize left-[calc(50%-4px)] -bottom-1"
						onMouseDown={(event) => {
							event.stopPropagation();
							handleResize(event);
						}}
					/>
					<div
						className="resize-indicator middle-right bg-neutral-800 absolute z-1 w-2 h-2 rounded-full cursor-ew-resize -right-1 top-[calc(50%-4px)]"
						onMouseDown={(event) => {
							event.stopPropagation();
							handleResize(event);
						}}
					/>
					<div
						className="resize-indicator bottom-right bg-neutral-800 absolute z-1 w-2 h-2 rounded-full cursor-nwse-resize -right-1 -bottom-1"
						onMouseDown={(event) => {
							event.stopPropagation();
							handleResize(event);
						}}
					/>
				</>
			)}
			<ContentEditable
				className={`focus:outline-none w-full ${
					props.navigation ? "cursor-pointer" : "cursor-text"
				}`}
				draggable={false}
				html={props.slideElement.content}
				disabled={props.navigation}
				onKeyDown={(event) => event.stopPropagation()}
				onMouseDown={(event) => event.stopPropagation()}
				onChange={(event) =>
					updateContent(event.currentTarget.innerHTML)
				}
			/>
		</div>
	);
};

export default SlideElement;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as keyboard from "../../../constants/keyboardKeys.constants";
import {
	copyElement,
	deleteSlideElement,
	selectSlideElement,
	updateSlideElement,
} from "../../../store/actions/actions";
interface ISlideElementProps {
	slideElement: ISlideElement;
	navigation: boolean;
}
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
	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		var htmlElement = event.currentTarget;
		var singleSlideHtmlElement = htmlElement.parentElement;
		var clickPositionX = event.clientX;
		var clickPositionY = event.clientY;
		if (singleSlideHtmlElement) {
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
			handleMouseUp(htmlElement, elementPosition);
		}
	};
	const handleMouseMove = (
		htmlElement: HTMLDivElement,
		elementPosition: IElementPosition,
		clickPositionX: number,
		clickPositionY: number
	) => {
		var singleSlideHtmlElement = htmlElement.parentElement;
		document.onmousemove = (event) => {
			if (singleSlideHtmlElement) {
				elementPosition.left =
					((htmlElement.offsetLeft -
						(clickPositionX - event.clientX)) /
						singleSlideHtmlElement.clientWidth) *
					100;
				elementPosition.top =
					((htmlElement.offsetTop -
						(clickPositionY - event.clientY)) /
						singleSlideHtmlElement.clientHeight) *
					100;
				clickPositionX = event.clientX;
				clickPositionY = event.clientY;

				htmlElement.style.top = elementPosition.top + "%";
				htmlElement.style.left = elementPosition.left + "%";
			}
		};
	};
	const handleMouseUp = (
		htmlElement: HTMLDivElement,
		elementPosition: IElementPosition
	) => {
		document.onmouseup = () => {
			document.onmouseup = null;
			document.onmousemove = null;
			dispatch(
				updateSlideElement({
					...props.slideElement,
					position: { ...elementPosition },
				})
			);
			htmlElement.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		};
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
	return (
		<div
			className={`bg-transparent rounded absolute ${
				props.navigation
					? `preview-slide p-1`
					: `p-5 border ${
							props.slideElement.content?.length === 0 &&
							"border-dashed"
					  } cursor-move focus:border-solid focus-within:border-dashed`
			}`}
			style={{
				width: props.slideElement.size?.width + "%",
				height: props.slideElement.size?.height + "%",
				top: props.slideElement.position?.top + "%",
				left: props.slideElement.position?.left + "%",
			}}
			{...(!props.navigation && {
				tabIndex: -1,
				onMouseDown: (event) => handleMouseDown(event),
				onBlur: () => dispatch(selectSlideElement(-1)),
				onClick: handleSelectSlideElement,
				onKeyDown: (event) => handleKeyDown(event.key),
				onKeyUp: (event) => handleCtrlKeyUp(event.key),
			})}
		>
			<pre>{JSON.stringify(activeSlide, null, 2)}</pre>
		</div>
	);
};

export default SlideElement;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
interface ISlideElementProps {
	slideElement: ISlideElement;
	navigation: boolean;
}
const SlideElement = (props: ISlideElementProps) => {
	const activeSlide = useSelector<IPowerpoint, IPowerpoint["activeSlide"]>(
		(state) => state.activeSlide
	);
	const dispatch = useDispatch();
	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		var htmlElement = event.currentTarget;
		var clickPositionX = event.clientX;
		var clickPositionY = event.clientY;
		var elementPosition = {
			top: htmlElement.offsetTop - (clickPositionY - event.clientY),
			left: htmlElement.offsetLeft - (clickPositionX - event.clientX),
		};
		handleMouseUp(htmlElement, elementPosition);
		handleMouseMove(
			htmlElement,
			elementPosition,
			clickPositionX,
			clickPositionY
		);
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

			dispatch({
				type: "UPDATE_SLIDE_ELEMENT",
				payload: {
					position: { ...elementPosition },
				},
			});

			htmlElement.scrollIntoView({
				behavior: "smooth",
				block: "end",
				inline: "nearest",
			});
		};
	};
	const handleSelectSlideElement = () => {
		if (activeSlide?.selectedElement?.id !== props.slideElement.id) {
			dispatch({
				type: "SELECT_SLIDE_ELEMENT",
				payload: activeSlide?.elements.indexOf(props.slideElement),
			});
		}
	};
	return (
		<div
			className={`bg-transparent rounded absolute p-5 ${
				!props.navigation &&
				`border ${
					props.slideElement.content?.length === 0 && "border-dashed"
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
				onBlur: () =>
					dispatch({
						type: "SELECT_SLIDE_ELEMENT",
						payload: -1,
					}),
				onClick: handleSelectSlideElement,
			})}
		>
			<pre>{JSON.stringify(activeSlide, null, 2)}</pre>
		</div>
	);
};

export default SlideElement;

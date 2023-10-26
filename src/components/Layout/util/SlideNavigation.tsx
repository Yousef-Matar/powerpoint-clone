import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as keyboard from "../../../constants/keyboardKeys.constants";
import SingleSlide from "../../Slide/SingleSlide";
const SlideNavigation = () => {
	const dispatch = useDispatch();
	const slides = useSelector<IPowerpoint, IPowerpoint["slides"]>(
		(state) => state.slides
	);
	const activeSlide = useSelector<IPowerpoint, IPowerpoint["activeSlide"]>(
		(state) => state.activeSlide
	);
	const [holdingCTRL, setHoldingCTRL] = useState(false);
	const handleDeleteSlide = (pressedKey: string) => {
		if ([keyboard.deleteKey, keyboard.backspaceKey].includes(pressedKey)) {
			dispatch({
				type: "DELETE_SLIDE",
			});
		}
	};
	const handleCopySlide = (pressedKey: string) => {
		if (pressedKey === keyboard.ctrlKey) {
			setHoldingCTRL(true);
		}
		if (holdingCTRL && pressedKey === keyboard.cKey) {
			dispatch({
				type: "COPY_ELEMENT",
				payload: "slide",
			});
		}
	};
	const handleCtrlKeyUp = (pressedKey: string) => {
		if (pressedKey === keyboard.ctrlKey) {
			setHoldingCTRL(false);
		}
	};
	useEffect(() => {
		document.getElementById(`slide-${activeSlide?.id}`)?.scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "nearest",
		});
	}, [activeSlide]);

	return (
		<div
			id="slide-navigation"
			tabIndex={-1}
			className="min-w-[25%] max-w-[40%] p-10 overflow-y-auto flex flex-col gap-4 cursor-default h-full focus:outline-none"
			onKeyDown={(event) => handleDeleteSlide(event.key)}
		>
			{slides.map((slide, index) => {
				return (
					<div
						id={`slide-${slide.id}`}
						key={slide.id}
						tabIndex={-1}
						className={`min-h-[25%] min-w-full relative ${
							activeSlide?.id === slide.id
								? "border-4 border-sky-600"
								: "cursor-pointer"
						}`}
						onClick={(event) => {
							event.currentTarget.focus();
							if (activeSlide?.id !== slide.id)
								dispatch({
									type: "SELECT_SLIDE",
									payload: index,
								});
						}}
						onKeyDown={(event) => handleCopySlide(event.key)}
						onKeyUp={(event) => handleCtrlKeyUp(event.key)}
					>
						<div className="absolute left-[-30px] top-0">
							{index + 1}.
						</div>
						<SingleSlide slide={slide} navigation={true} />
					</div>
				);
			})}
		</div>
	);
};

export default SlideNavigation;

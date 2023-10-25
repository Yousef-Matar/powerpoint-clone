import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleSlide from "../../Slide/SingleSlide";

const SlideNavigation = () => {
	const dispatch = useDispatch();
	const powerpoint = useSelector<IPowerpoint, IPowerpoint>((state) => state);
	return (
		<div
			id="slide-navigation"
			className="min-w-[20%] max-w-[40%] p-10 overflow-y-auto flex flex-col gap-4 cursor-default h-full"
		>
			{powerpoint.slides.map((slide, index) => {
				return (
					<div
						className={`min-h-[25%] relative ${
							powerpoint.activeSlide?.id === slide.id
								? "border-8 border-sky-600"
								: "cursor-pointer"
						}`}
						key={slide.id}
						onClick={(event) => {
							event.preventDefault();
							if (powerpoint.activeSlide?.id !== slide.id)
								dispatch({
									type: "SELECT_SLIDE",
									payload: index,
								});
						}}
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

import React from "react";
import { useSelector } from "react-redux";
import SingleSlide from "../../Slide/SingleSlide";
const ActiveSlide = () => {
	const activeSlide = useSelector<IPowerpoint, IPowerpoint["activeSlide"]>(
		(state) => state.activeSlide
	);
	return (
		<div className="min-w-[60%] max-w-[80%] overflow-auto p-10 flex-grow">
			<SingleSlide slide={activeSlide} />
		</div>
	);
};

export default ActiveSlide;

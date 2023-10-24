import React from "react";
import { useDispatch, useSelector } from "react-redux";
const LogicWrapper = () => {
	const dispatch = useDispatch();
	const slides = useSelector<IPowerpoint, IPowerpoint["slides"]>(
		(state) => state.slides
	);
	return (
		<div className="container-fluid">
			<button onClick={() => dispatch({ type: "CREATE_SLIDE" })}>
				Create Slide
			</button>
			<div className="row">
				<div className="col-6">
					Slide Layout
					{slides.length}
					{slides.map((slide) => {
						return <div key={slide.id}>{slide.id}</div>;
					})}
				</div>
			</div>
		</div>
	);
};

export default LogicWrapper;

import React from "react";
import SlideElement from "./util/SlideElement";

interface ISingleSlideProps {
	slide: Nullable<ISlide>;
	navigation: boolean;
}
const SingleSlide = (props: ISingleSlideProps) => {
	return (
		<div
			className={`bg-white text-black h-full w-full relative aspect-video ${
				props.navigation && "overflow-hidden select-none"
			}`}
			style={{ zoom: props.navigation ? "0.4" : "1" }}
		>
			{props.slide?.elements.map((slideElement) => {
				return (
					<SlideElement
						key={slideElement.id}
						slideElement={slideElement}
						navigation={props.navigation}
					/>
				);
			})}
		</div>
	);
};

export default SingleSlide;

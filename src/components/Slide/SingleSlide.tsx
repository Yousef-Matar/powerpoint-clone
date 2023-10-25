import React from "react";

interface ISingleSlideProps {
	slide: Nullable<ISlide>;
	navigation: boolean;
}
const SingleSlide = (props: ISingleSlideProps) => {
	return (
		<div
			className={`bg-white text-black h-full w-full relative ${
				props.navigation && "overflow-hidden"
			}`}
			style={{ zoom: props.navigation ? "0.4" : "1" }}
		>
			<div className="bg-transparent rounded absolute p-4 z-0">
				<pre>{JSON.stringify(props.slide, null, 2)}</pre>
			</div>
		</div>
	);
};

export default SingleSlide;

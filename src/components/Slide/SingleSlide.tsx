import React from "react";

interface ISingleSlideProps {
	slide: Nullable<ISlide>;
}
const SingleSlide = (props: ISingleSlideProps) => {
	return (
		<div className="bg-white text-black h-full w-full relative">
			<div className="bg-transparent rounded absolute p-4 z-0">
				<pre>{JSON.stringify(props.slide, null, 2)}</pre>
			</div>
		</div>
	);
};

export default SingleSlide;

import React from "react";
import { useSelector } from "react-redux";
const ActiveSlide = () => {
	const navBarDomElement = document.getElementById("nav-bar");
	const activeSlide = useSelector<IPowerpoint, IPowerpoint["activeSlide"]>(
		(state) => state.activeSlide
	);
	return (
		<div className="min-w-[60%] max-w-[80%] overflow-auto p-10"
      style={{
         height:`calc(100vh - ${navBarDomElement?.clientHeight}px)`
      }}
      >
			<pre>
				{JSON.stringify(activeSlide)} {JSON.stringify(activeSlide)}
			</pre>
			<pre>
				{JSON.stringify(activeSlide, null, 2)}{" "}
				{JSON.stringify(activeSlide, null, 2)}
				{JSON.stringify(activeSlide, null, 2)}{" "}
				{JSON.stringify(activeSlide, null, 2)}
				{JSON.stringify(activeSlide, null, 2)}{" "}
				{JSON.stringify(activeSlide, null, 2)}
				{JSON.stringify(activeSlide, null, 2)}{" "}
				{JSON.stringify(activeSlide, null, 2)}
			</pre>
		</div>
	);
};

export default ActiveSlide;

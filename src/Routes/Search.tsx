import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { getMovieSearchResult, getShowSearchResult } from "../api";
import OneSliderMovie from "./OneSliderMovie";
import OneSliderShow from "./OneSliderShow";

const Wrapper = styled.div`
	background: black;
	height: 250px;
`;

const Space = styled.div`
	height: 300px;
`;

function Search() {
	const location = useLocation();
	const keyword = new URLSearchParams(location.search).get("keyword");

	return (
		<Wrapper>
			<Space />
			<OneSliderMovie
				getFunction={getMovieSearchResult}
				keyword={keyword}
				sliderIndex={1}
				sliderName="Movies"
			/>
			<OneSliderShow
				getFunction={getShowSearchResult}
				keyword={keyword}
				sliderIndex={2}
				sliderName="Shows"
			/>
		</Wrapper>
	);
}

export default Search;

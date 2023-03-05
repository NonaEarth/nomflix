import { useQuery } from "react-query";
import styled from "styled-components";

import {
	getAiringTodayShows,
	getLatestShow,
	getMovies as getNowPlaying,
	getPopularShows,
	getTopRatedMovies,
	IGetMoviesResult,
	IShow,
} from "../api";
import { makeImagePath } from "../utils";
import OneSliderShow from "./OneSliderShow";

const Wrapper = styled.div`
	background: black;
	height: 250px;
`;

const Loader = styled.div`
	height: 200vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
	height: 100vh;
	background-color: black;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 60px;
	background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)),
		url(${(props) => props.bgphoto});
	background-size: cover;
`;

const Title = styled.h2`
	font-size: 68px;
	margin-bottom: 20px;
	position: relative;
`;

const Overview = styled.p`
	font-size: 30px;
	width: 50%;
`;

function Tv() {
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useQuery<IShow>(["showsFront", "nowPlayingShowFront"], getLatestShow);

	return (
		<Wrapper>
			{nowPlayingLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Banner bgphoto={""}>
						<Title>{nowPlayingData?.name}</Title>
						<Overview>{nowPlayingData?.overview}</Overview>
					</Banner>
				</>
			)}
			<OneSliderShow
				getFunction={getAiringTodayShows}
				sliderIndex={2}
				sliderName="Shows that are airing today"
			/>
			<OneSliderShow
				getFunction={getPopularShows}
				sliderIndex={3}
				sliderName="Popular Shows"
			/>
			<OneSliderShow
				getFunction={getTopRatedMovies}
				sliderIndex={4}
				sliderName="Top Rater Shows"
			/>
		</Wrapper>
	);
}
export default Tv;

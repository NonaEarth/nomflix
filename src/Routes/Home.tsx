import { useQuery } from "react-query";
import styled from "styled-components";

import {
	getLatestMovies,
	getMovies as getNowPlaying,
	getTopRatedMovies,
	getUpcomingMovies,
	IGetMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";
import OneSliderMovie from "./OneSliderMovie";

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

function Home() {
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useQuery<IGetMoviesResult>(
			["moviesFront", "nowPlayingMovieFront"],
			getNowPlaying
		);

	return (
		<Wrapper>
			{nowPlayingLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Banner
						bgphoto={makeImagePath(
							nowPlayingData?.results[0].backdrop_path || ""
						)}
					>
						<Title>{nowPlayingData?.results[0].title}</Title>
						<Overview>{nowPlayingData?.results[0].overview}</Overview>
					</Banner>
				</>
			)}
			<OneSliderMovie
				getFunction={getNowPlaying}
				sliderIndex={1}
				sliderName="Now Playing"
			/>
			<OneSliderMovie
				getFunction={getLatestMovies}
				sliderIndex={2}
				sliderName="Latest Movies"
			/>
			<OneSliderMovie
				getFunction={getTopRatedMovies}
				sliderIndex={3}
				sliderName="Top Rated Movies"
			/>
			<OneSliderMovie
				getFunction={getUpcomingMovies}
				sliderIndex={4}
				sliderName="Upcoming Movies"
			/>
		</Wrapper>
	);
}
export default Home;

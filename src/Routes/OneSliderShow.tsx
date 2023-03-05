import { AnimatePresence, motion, useScroll, Variants } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

import { getShowSearchResult, IGetShowsResult } from "../api";
import { makeImagePath } from "../utils";

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

const Slider = styled.div`
	position: relative;
	top: -100px;
`;

const Row = styled(motion.div)`
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(6, 1fr);
	position: absolute;
	width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
	background-color: white;
	background-image: url(${(props) => props.bgphoto});
	background-size: cover;
	background-position: center center;
	height: 200px;
	font-size: 66px;
	cursor: pointer;

	&:first-child {
		transform-origin: center left;
	}

	&:last-child {
		transform-origin: center right;
	}
`;

const Overlay = styled(motion.div)`
	position: fixed;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	opacity: 0;
`;

const BigShow = styled(motion.div)`
	position: absolute;
	width: 60vw;
	height: 100vh;
	background-color: tomato;
	left: 0;
	right: 0;
	margin: 0 auto;
	border-radius: 15px;
	overflow: hidden;
	background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
	width: 100%;
	height: 400px;
	background-size: cover;
	background-position: center center;
`;

const Bigtitle = styled.h3`
	color: ${(props) => props.theme.white.lighter};
	padding: 10px;
	font-size: 46px;
	position: relative;
	top: -60px;
`;

const BigOverview = styled.p`
	padding: 20px;
	top: -60px;
	color: ${(props) => props.theme.white.lighter};
`;
const rowVariants = {
	hidden: {
		x: window.outerWidth + 10,
	},
	visible: {
		x: 0,
	},
	exit: {
		x: -window.outerWidth - 10,
	},
};

const boxVariants: Variants = {
	normal: {
		scale: 1,
	},
	hover: {
		scale: 1.3,
		y: -10,
		transition: {
			delay: 0.5,
			duration: 0.3,
			type: "tween",
		},
	},
};

const Info = styled(motion.div)`
	padding: 20px 0px;
	background-color: ${(props) => props.theme.black.lighter};
	opacity: 0;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;

	h4 {
		text-align: center;
		font-size: 18px;
	}
`;

const infoVariants = {
	hover: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 0.3,
			type: "tween",
		},
	},
};

interface propTypes {
	getFunction: (keyword?: string) => Promise<any>;
	sliderName: string;
	sliderIndex: number;
	keyword?: string | null | undefined;
}

function OneSliderShow({
	getFunction,
	keyword = "",
	sliderName,
	sliderIndex,
}: propTypes) {
	const { data, isLoading } = useQuery<IGetShowsResult>(
		[`shows${sliderIndex}`, `nowPlayingShow${sliderIndex}`],
		async () => {
			if (keyword) {
				return await getShowSearchResult(keyword);
			} else {
				return await getFunction();
			}
		}
	);

	const history = useHistory();
	const offset = 6;

	const [index, setIndex] = useState(0);
	const [leaving, setLeaving] = useState(false);
	const increaseIndex = () => {
		if (data) {
			if (leaving) return;
			toggleLeaving();

			const totalShows = data.results.length - 1;
			const maxIndex = Math.floor(totalShows / offset - 1);
			setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
		}
	};
	const toggleLeaving = () => setLeaving((prev) => !prev);

	const onShowBoxClicked = (showId: number) => {
		history.push(`/tv/${showId}`);
	};

	const onOverlayClick = () => {
		history.push("/tv");
	};

	const bigShowMatch = useRouteMatch<{ showId: string }>(
		keyword ? "/search/tv/:showId" : "/tv/:showId"
	);

	const clickedShow =
		bigShowMatch?.params.showId &&
		data?.results.find((show) => show.id === +bigShowMatch.params.showId);

	const { scrollY } = useScroll();

	return (
		<Wrapper>
			{isLoading ? (
				<Loader>Loading</Loader>
			) : (
				<>
					<Slider>
						<span onClick={increaseIndex}>{sliderName}</span>
						<AnimatePresence initial={false} onExitComplete={toggleLeaving}>
							<Row
								variants={rowVariants}
								initial="hidden"
								animate="visible"
								exit="exit"
								transition={{ type: "tween", duration: 1 }}
								key={index}
							>
								{data?.results
									.slice(1)
									.slice(offset * index, offset * index + offset)
									.map((show) => (
										<Box
											layoutId={`${show.id}${sliderIndex.toString()}`}
											variants={boxVariants}
											key={show.id}
											initial="normal"
											whileHover="hover"
											transition={{ type: "tween" }}
											onClick={() => {
												if (!keyword) onShowBoxClicked(show.id);
											}}
											bgphoto={makeImagePath(show.backdrop_path, "w500")}
										>
											<Info variants={infoVariants}>
												<h4>{show.name}</h4>
											</Info>
										</Box>
									))}
							</Row>
						</AnimatePresence>
					</Slider>
					<AnimatePresence>
						{!keyword &&
						bigShowMatch &&
						clickedShow &&
						bigShowMatch.url.includes(clickedShow.id + "") ? (
							<>
								<Overlay
									onClick={onOverlayClick}
									exit={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								/>
								<BigShow
									style={{ top: scrollY.get() + 100, zIndex: 100 }}
									layoutId={bigShowMatch.params.showId + sliderIndex.toString()}
								>
									{clickedShow && (
										<>
											<BigCover
												style={{
													backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
														clickedShow.backdrop_path,
														"w500"
													)})`,
												}}
											/>
											<Bigtitle>{clickedShow.name}</Bigtitle>
											<BigOverview>{clickedShow.overview}</BigOverview>
										</>
									)}
								</BigShow>
							</>
						) : null}
					</AnimatePresence>
				</>
			)}
		</Wrapper>
	);
}

export default OneSliderShow;

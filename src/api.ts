const API_KEY = "74eca6fbcacbb1e41f59a5f13224f261";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
	id: number;
	backdrop_path: string;
	poster_path: string;
	title: string;
	overview: string;
}

export interface IGetMoviesResult {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: IMovie[];
	total_pages: number;
	total_results: number;
}

export interface IShow {
	poster_path: string;
	overview: string;
	first_air_date: string;
	id: number;
	original_name: string;
	name: string;
	backdrop_path: string;
	popularity: number;
	vote_count: number;
	vote_average: number;
}

export interface IGetShowsResult {
	page: number;
	results: IShow[];
	total_pages: number;
	total_results: number;
}

export function getMovies() {
	return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getLatestMovies() {
	return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedMovies() {
	return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getUpcomingMovies() {
	return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

// TV

export function getLatestShow() {
	return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&language=en-US`).then(
		(response) => response.json()
	);
}

export function getAiringTodayShows() {
	return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getPopularShows() {
	return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
		(response) => response.json()
	);
}

export function getTopRatedShows() {
	return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
		response.json()
	);
}

export function getMovieSearchResult(keyword?: string) {
	return fetch(
		`${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}&page=1`
	).then((response) => response.json());
}

export function getShowSearchResult(keyword?: string) {
	return fetch(
		`${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}&page=1`
	).then((response) => response.json());
}

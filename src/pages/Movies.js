import { useEffect, useState, useContext } from 'react';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';
import UserContext from '../UserContext';

export default function Movies() {

	const { user } = useContext(UserContext);

	// console.log(user)

	const [ movies, setMovies ] = useState([]);

	// this function will run each time the submit is clicked in edit movies.
	const fetchData = () => {

		fetch(`https://movie-catalog-lgn0.onrender.com/movies/getMovies`)
		.then(res => res.json())
		.then(data => {
			
			 if(data.movies) {

			 	setMovies(data.movies);
			 } else	{

			 	setMovies([]);
			 }
		})
	}

	useEffect(() => {

		let fetchUrl = `https://movie-catalog-lgn0.onrender.com/movies/getMovies`;

		fetch(fetchUrl)
		.then(res => res.json())
		.then(data => {
			
			if(data.movies) {

			 	setMovies(data.movies);
			 } else	{

			 	setMovies([]);
			 }

		})
	}, [fetchData])


	return (
		user.isAdmin ?
        	<AdminView moviesData={movies} fetchData={fetchData} />
        :
        	<UserView moviesData={movies} />
	)
}
import { useState, useEffect } from 'react';
import { Row, Col } from "react-bootstrap";
import MovieCard from './MovieCard';


export default function UserView({moviesData}) {

    const [movies, setMovies ] = useState([]);

    useEffect(() => {
    	
        const moviesArr = moviesData.map(movie => {

            return (
            	<Col xs={12} md={4} key={movie._id} className="mt-3">
                	<MovieCard movieProp={movie} />
                </Col>
            )
        });

        setMovies(moviesArr)

    }, [moviesData])


    return (
    <Row className="my-5">
           { movies }
    </Row>
  );
}

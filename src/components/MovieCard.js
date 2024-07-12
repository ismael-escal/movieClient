import { Card } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function MovieCard({movieProp}) {
    // console.log(movieProp); for checking only

    const { user } = useContext(UserContext);

    const {title, description, director, year, genre, _id} = movieProp;


    return (
        <Card className="cardHighlight mt-3 justify-content-center" border="info">
            <Card.Body>
                <Card.Title className="text-primary pb-2">{title.toUpperCase()}</Card.Title>
                <Card.Subtitle>Description:</Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle>Director:</Card.Subtitle>
                <Card.Text>{director}</Card.Text>
                <Card.Subtitle>Year:</Card.Subtitle>
                <Card.Text>{year}</Card.Text>
                <Card.Subtitle>Genre:</Card.Subtitle>
                <Card.Text>{genre}</Card.Text>
                {
                	user.id !== null ?
                		<Link className="btn btn-success" to={`/movie/${_id}`}>View Comments</Link>
                	:
                		<Link className="btn btn-danger" to={`/login`}>Login to View Comments</Link>
                }

            </Card.Body>
        </Card>
	)
}
import { Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Home() {

    const { user } = useContext(UserContext);

	return (
		<>
        <Row className="mt-5">
            <Col className="p-4 text-center">
                <h1>Welcome To Movie Catalog Application</h1>
                <p>View and Add you comments to movies you've watched</p>
                <Link className="btn btn-warning" to={'/movies'}>Check Movies</Link> 
            </Col>
        </Row>
		</>
	)
}
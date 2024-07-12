import { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Row, Col, ButtonGroup, Modal, Form } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function MovieView() {

	const { id } = useParams();

	const navigate = useNavigate();

	const { user } = useContext(UserContext);

	const [ title, setTitle ] = useState("");
	const [ director, setDirector ] = useState("");
	const [ year, setYear ] = useState(0);
	const [ description, setDescription ] = useState("");
	const [ genre, setGenre ] = useState("");
	const [ comments, setComments ] = useState([]);

	// for add comment modal
	const [showComment, setShowComment] = useState(false);
	const [ comment, setComment ] = useState("");


	useEffect(() => {

		fetch(`https://movie-catalog-lgn0.onrender.com/movies/getMovie/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
		.then(res => res.json())
		.then(data => {
			
			setTitle(data.title);
			setDirector(data.director);
			setYear(data.year);
			setDescription(data.description);
			setGenre(data.genre);
			setComments(data.comments || []);
		})
	}, [comment]);


    

    const openComment = () => {

		setShowComment(true);
	}

	const closeComment = () => {

		setComment("");
		setShowComment(false);

	}

	const addComment = (e) => {

		e.preventDefault();

		const fetchUrl = `https://movie-catalog-lgn0.onrender.com/movies/addComment/${id}`;

		fetch(fetchUrl, {
        	method: "PATCH",
			headers : { 
				"Content-Type": "application/json",
				Authorization : `Bearer ${localStorage.getItem('token')}`
			},
            body: JSON.stringify({

                userId: user.id,
                comment

            })
		})
		.then(res => res.json())
		.then(data => {

			// console.log(data);

			if(data.message === 'comment added successfully') {

				Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Comment Added'
                })

                closeComment();

			} else {

				Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                })

                closeComment();
			}
		})
	}



	return(
		<>
	    <Container className="mt-5">
	        <Row>
	            <Col lg={{ span: 6, offset: 3 }}>
	                <Card className="cardHighlight mt-3 justify-content-center" border="info">
	                    <Card.Body className="text-left">
	                        <Card.Title className="text-primary pb-2 text-center">{title ? title.toUpperCase() : "Loading..."}</Card.Title>
	                        <Card.Text>{description}</Card.Text>
							<Card.Subtitle>Director:</Card.Subtitle>
                            <Card.Text>{director}</Card.Text>
                            <Card.Subtitle>Year:</Card.Subtitle>
                            <Card.Text>{year}</Card.Text>
                            <Card.Subtitle>Genre:</Card.Subtitle>
                            <Card.Text>{genre}</Card.Text>

						    <br/>
                            <Card.Subtitle>Comments:</Card.Subtitle>
                            {comments.length > 0 ? (
                                comments.map(comment => (
                                    <Card key={comment._id} className="my-2">
                                        <Card.Body>
                                            <Card.Text>{comment.comment}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <Card.Text>No comments yet.</Card.Text>
                            )}
                            <br/>
                            {
                        		user.isAdmin !== true ?
                        			<Button className="d-flex justify-content-center my-3 w-100" variant="warning" block="true" onClick={(e) => openComment()}>Add Comment</Button>
                        		:
                        			<Button className="d-flex justify-content-center my-3 w-100" variant="secondary" block="true" disabled>Add Comment</Button>
                            }
                            <Link className='btn btn-danger mb-3 w-100' to="/movies">Back</Link>
                        </Card.Body>        
                    </Card>
                </Col>
            </Row>
		</Container>

		<Modal show={showComment} onHide={closeComment}>
			<Form onSubmit={e => addComment(e)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group>
						<Form.Label>Comment:</Form.Label>
						<Form.Control type="text" value={comment} onChange={e => setComment(e.target.value)} required />
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => closeComment()}>No</Button>
					<Button variant="danger" type="submit">Yes</Button>
				</Modal.Footer>
			</Form>
		</Modal>

		</>
    )
}
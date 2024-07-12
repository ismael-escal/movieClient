import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function EditMovie({movieId, fetchData}) {

	// state hooks that will store the values of the input fields
	const [ title, setTitle ] = useState("");
	const [ director, setDirector ] = useState("");
	const [ year, setYear ] = useState(0);
	const [ description, setDescription ] = useState("");
	const [ genre, setGenre ] = useState("");


	const [showEdit, setShowEdit] = useState(false);

	const openEdit = (movieId) => {


		fetch(`https://movie-catalog-lgn0.onrender.com/movies/getMovie/${movieId}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			// console.log(data);

			setTitle(data.title);
		    setDescription(data.description);
		    setDirector(data.director);
		    setYear(data.year);
		    setGenre(data.genre);
		})

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);

		setTitle('');
	    setDescription('');
	    setDirector('');
	    setYear(0);
	    setGenre('');
	}

	const editMovie = (e, movieId) => {

		e.preventDefault();

		fetch(`https://movie-catalog-lgn0.onrender.com/movies/updateMovie/${movieId}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`
			},
			body: JSON.stringify({
				title,
				director,
				year,
				description,
				genre
			})
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === 'Movie updated successfully') {

				Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: 'Movie Successfully Updated'
                })

                closeEdit();
                fetchData();

			} else {

				Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                })

                closeEdit();
                fetchData();
			}
		})
	}


	return(
		<>
			<Button variant="warning" size="sm" onClick={() => openEdit(movieId)}>Edit</Button>

			<Modal show={showEdit} onHide={closeEdit}>
				<Form onSubmit={e => editMovie(e, movieId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Movie</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group>
					        <Form.Label>Title:</Form.Label>
					        <Form.Control type="text" placeholder="Enter Movie Title" value={title} onChange={e => {setTitle(e.target.value)}} required/>
					    </Form.Group>

					    <Form.Group>
					        <Form.Label>Description:</Form.Label>
					        <Form.Control type="text" placeholder="Enter Description" value={description} onChange={e => {setDescription(e.target.value)}} required/>
					    </Form.Group>

					    <Form.Group>
					        <Form.Label>Director:</Form.Label>
					        <Form.Control type="text" placeholder="Enter Director" value={director} onChange={e => {setDirector(e.target.value)}} required/>
					    </Form.Group>

					    <Form.Group>
					        <Form.Label>Year:</Form.Label>
					        <Form.Control type="number" placeholder="Enter Year" value={year} onChange={e => {setYear(e.target.value)}} required/>
					    </Form.Group>

					    <Form.Group>
					        <Form.Label>Genre:</Form.Label>
					        <Form.Control type="text" placeholder="Enter Genre" value={genre} onChange={e => {setGenre(e.target.value)}} required/>
					    </Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => closeEdit()}>Close</Button>
						<Button variant="success" type="submit">Update</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}
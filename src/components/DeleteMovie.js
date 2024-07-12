import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function DeleteMovie({movieId, fetchData}) {

	const [ title, setTitle ] = useState("");
	const [ director, setDirector ] = useState("");
	const [ year, setYear ] = useState(0);
	const [ description, setDescription ] = useState("");
	const [ genre, setGenre ] = useState("");

	const [showDelete, setShowDelete] = useState(false);

	const openDelete = (movieId) => {


		fetch(`https://movie-catalog-lgn0.onrender.com/movies/getMovie/${movieId}`,{
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

		setShowDelete(true);
	}

	const closeDelete = () => {

		setShowDelete(false);

		setTitle('');
	    setDescription('');
	    setDirector('');
	    setYear(0);
	    setGenre('');
	}

	const deleteMovie = (e, movieId) => {

		e.preventDefault();

		fetch(`https://movie-catalog-lgn0.onrender.com/movies/deleteMovie/${movieId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {

			if(data.message === 'Movie deleted successfully') {

				Swal.fire({
                    title: 'Deleted!',
                    icon: 'success',
                    text: 'Movie Successfully Deleted'
                })

                closeDelete();
                fetchData();

			} else {

				Swal.fire({
                    title: 'Error!',
                    icon: 'error',
                    text: 'Please try again'
                })

                closeDelete();
                fetchData();
			}
		})
	}


	return(
		<>
			<Button variant="danger" size="sm" onClick={() => openDelete(movieId)}>Delete</Button>

			<Modal show={showDelete} onHide={closeDelete}>
				<Form onSubmit={e => deleteMovie(e, movieId)}>
					<Modal.Header closeButton>
						<Modal.Title>Are you sure you want to delete this movie?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p><b>Title:</b>  {title}</p>
						<p><b>Description:</b>  {description}</p>
						<p><b>Director:</b>  {director}</p>
						<p><b>Year:</b>  {year}</p>
						<p><b>Genre:</b>  {genre}</p>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="warning" onClick={() => closeDelete()}>No</Button>
						<Button variant="danger" type="submit">Yes</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	)
}
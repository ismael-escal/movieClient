import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';


export default function AddMovie() {

	// creates context hooks to access the user context object and use its properties for user validation
    const { user } = useContext(UserContext);

    const navigate = useNavigate();


	// state hooks that will store the values of the input fields
	const [ title, setTitle ] = useState("");
	const [ director, setDirector ] = useState("");
	const [ year, setYear ] = useState(0);
	const [ description, setDescription ] = useState("");
	const [ genre, setGenre ] = useState("");

	// State hook that will determine whether the submit button is clickable or not
	const [ isActive, setIsActive ] = useState(false);


	function addMovie(e) {

		// prevents page refresh when submitting the form
		e.preventDefault();

		fetch(`https://movie-catalog-lgn0.onrender.com/movies/addMovie`, {
			method: "POST",
			headers: { 
				"Content-Type": "application/json",
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
			// console.log(data);

			if(data.error === 'Failed to save the Movie'){

				Swal.fire({
                    title: 'Unsuccessful Creation',
                    icon: 'error',
                    text: 'Please try again'
                })
			} else if(data._id){

				Swal.fire({
                    title: 'Movie Added Successfully',
                    icon: 'success'
                })
                // Clear input fields after submission
				setTitle('');
			    setDescription('');
			    setDirector('');
			    setYear(0);
			    setGenre('');
                navigate("/movies");
			} else {

				Swal.fire({
                    title: 'Unsuccessful Creation.',
                    icon: 'error',
                    text: 'Please try again'
                })
			} 
		})
	};


	useEffect(() => {

		if(title !== "" && description !== "" && director !== "" && year !== "" && genre !== "") {

			setIsActive(true)
		} else {
			setIsActive(false)
		}

		// dependency - optional array - the useEffect runs only when there is a change in the inputs
	}, [title, description, director, year, genre])




	return (

		user.isAdmin !== true ?
            <Navigate to="/movies" />
        :	
        	<>
        	<h1 className="my-5 text-center">Add Movie</h1>
        	<div className="d-flex justify-content-center align-items-center mb-4">
        		<Link className="btn btn-warning mx-2" to="/movies">Show Movies</Link>
	        </div>
        	<div className="d-flex justify-content-center align-items-center my-5">
                	<div className="border p-4 border-info rounded bg-light" style={{ width: '500px' }}>
				<Form onSubmit={e => addMovie(e)}>
					{/* Two way data binding, the form saves the data to the variable and also retrieves that data from the variable*/}
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

				    {/* Conditional Rendering of submit button based on the isActive state */}
				    {
				    	isActive ?
				    	<Button className="my-3 w-100" variant="warning" type="submit">Add Movie</Button>
				    	:
				    	<Button className="my-3 w-100" variant="secondary" type="submit" disabled>Add Movie</Button>
				    }
				    
			    	</Form>
		    	</div>
    		</div> 
    		</	>
	)
}
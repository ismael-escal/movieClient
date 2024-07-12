import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditMovie from './EditMovie';
import DeleteMovie from './DeleteMovie';

export default function AdminView({moviesData, fetchData}) {


    const [movies, setMovies] = useState([])

    useEffect(() => {
        const moviesArr = moviesData.map(movie => {
            return (
                <tr key={movie._id}>
                    <td className="text-primary">{movie.title ? movie.title.toUpperCase() : "Loading..."}</td>
                    <td>{movie.description}</td>
                    <td>{movie.director}</td>
                    <td>{movie.year}</td>
                    <td>{movie.genre}</td>
                    <td><Link className="btn btn-success d-flex justify-content-center" to={`/movie/${movie._id}`}>View Comments</Link> </td>
                    <td><EditMovie movieId={ movie._id }  fetchData={fetchData} /></td> 
                    <td><DeleteMovie movieId={movie._id} fetchData={fetchData} /></td>    
                </tr>
            )
        })

        setMovies(moviesArr)

    }, [moviesData, fetchData])


    return(
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>
            <Table striped bordered hover responsive> 
                <thead>
                    <tr className="text-center">
                        <th className="bg-dark text-light">Title</th>
                        <th className="bg-dark text-light text-light text-light text-light">Description</th>
                        <th className="bg-dark text-light text-light text-light">Director</th>
                        <th className="bg-dark text-light text-light">Year</th>
                        <th className="bg-dark text-light text-light">Genre</th>
                        <th className="bg-dark text-light text-light">Comments</th>
                        <th colSpan="2" className="bg-dark text-light">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies}
                </tbody>
            </Table> 
            <div className="d-flex justify-content-center align-items-center mb-4">
	            <Link className="btn btn-warning mx-2" to="/addMovie">Add Movie</Link>
	        </div>   
        </>
    )
}
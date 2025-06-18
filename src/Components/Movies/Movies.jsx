import React, { useState, useEffect } from 'react'

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const API_KEY = '5f84ccbcc40586ca7b8b12d3d57d7528';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
      const data = await response.json();
      setMovies(data.results);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies data');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async () => {
    if (!searchTerm.trim()) {
      fetchTrendingMovies();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setMovies(data.results);
      setError(null);
    } catch (err) {
      setError('Failed to search movies');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).getFullYear();
  };

  if (loading) {
    return (
      <div className="container">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger text-center" role="alert">
          {error}
          <br />
          <button className="btn btn-outline-danger mt-2" onClick={fetchTrendingMovies}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4 text-white">Trending Movies</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="row justify-content-center mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-light" type="submit">
                  <i className="fas fa-search"></i> Search
                </button>
              </div>
            </div>
          </form>

          {/* Reset to trending button */}
          {searchTerm && (
            <div className="text-center mb-3">
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => {
                  setSearchTerm('');
                  fetchTrendingMovies();
                }}
              >
                Show Trending Movies
              </button>
            </div>
          )}

          {/* Movies Grid */}
          <div className="row">
            {movies.map(movie => (
              <div key={movie.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card bg-dark text-white h-100">
                  <img
                    src={
                      movie.poster_path 
                        ? `${IMAGE_BASE_URL}${movie.poster_path}`
                        : 'https://via.placeholder.com/300x450/6c757d/ffffff?text=No+Poster'
                    }
                    className="card-img-top"
                    alt={movie.title}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      <small className="text-muted">Year: {formatDate(movie.release_date)}</small><br/>
                      <small className="text-muted">Rating: ★ {movie.vote_average.toFixed(1)}/10</small><br/>
                      <small className="text-warning">Popularity: {movie.popularity.toFixed(0)}</small>
                    </p>
                    {movie.overview && (
                      <p className="card-text small text-muted" style={{ fontSize: '0.85rem' }}>
                        {movie.overview.length > 100 
                          ? `${movie.overview.substring(0, 100)}...`
                          : movie.overview
                        }
                      </p>
                    )}
                    <button className="btn btn-primary mt-auto">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {movies.length === 0 && !loading && (
            <div className="text-center text-white">
              <h3>No movies found</h3>
              <p>Try adjusting your search terms or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

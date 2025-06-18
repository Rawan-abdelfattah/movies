import React, { useState, useEffect } from 'react'

export default function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const API_KEY = '5f84ccbcc40586ca7b8b12d3d57d7528';
  const BASE_URL = 'https://api.themoviedb.org/3';
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchTrendingPeople();
  }, []);

  const fetchTrendingPeople = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/trending/person/week?api_key=${API_KEY}`);
      const data = await response.json();
      setPeople(data.results);
      setError(null);
    } catch (err) {
      setError('Failed to fetch people data');
      console.error('Error fetching people:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchPeople = async () => {
    if (!searchTerm.trim()) {
      fetchTrendingPeople();
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setPeople(data.results);
      setError(null);
    } catch (err) {
      setError('Failed to search people');
      console.error('Error searching people:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchPeople();
  };

  const getGenderText = (gender) => {
    switch (gender) {
      case 1: return 'Female';
      case 2: return 'Male';
      default: return 'Not specified';
    }
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
          <button className="btn btn-outline-danger mt-2" onClick={fetchTrendingPeople}>
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
          <h1 className="text-center mb-4 text-white">Popular People</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="row justify-content-center mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for people..."
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
                  fetchTrendingPeople();
                }}
              >
                Show Trending People
              </button>
            </div>
          )}

          {/* People Grid */}
          <div className="row">
            {people.map(person => (
              <div key={person.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card bg-dark text-white h-100">
                  <div className="text-center">
                    <img
                      src={
                        person.profile_path 
                          ? `${IMAGE_BASE_URL}${person.profile_path}`
                          : 'https://via.placeholder.com/300x450/6c757d/ffffff?text=No+Image'
                      }
                      className="card-img-top"
                      alt={person.name}
                      style={{ 
                        height: '350px', 
                        objectFit: 'cover',
                        width: '100%'
                      }}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">{person.name}</h5>
                    {person.original_name !== person.name && (
                      <p className="text-muted text-center small">({person.original_name})</p>
                    )}
                    <div className="card-text">
                      {person.known_for_department && (
                        <small className="text-muted">
                          <strong>Known for:</strong> {person.known_for_department}<br/>
                        </small>
                      )}
                      <small className="text-muted">
                        <strong>Gender:</strong> {getGenderText(person.gender)}<br/>
                      </small>
                      <small className="text-warning">
                        <strong>Popularity:</strong> ★ {person.popularity.toFixed(1)}
                      </small>
                    </div>
                    <button className="btn btn-primary btn-sm mt-auto">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {people.length === 0 && !loading && (
            <div className="text-center text-white">
              <h3>No people found</h3>
              <p>Try adjusting your search terms or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

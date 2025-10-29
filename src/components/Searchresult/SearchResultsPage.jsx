import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AdminContext } from '../../AdminPanel/AdminContext';

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { products } = useContext(AdminContext);
  const query = searchParams.get('q');

 // ... inside your SearchResultsPage component

useEffect(() => {
  // The query check is good.
  if (query && products) { // Also good to check if products itself is not null/undefined
    setLoading(true);
    
    const filteredResults = products.filter(product => {
      // --- THE FIX ---
      // 1. Safely access `product.name`, make it lowercase, or default to an empty string "".
      const productName = (product?.name?.toLowerCase() || "");
      
      // 2. Do the same for the description for consistency and safety.
      const productDescription = (product?.description?.toLowerCase() || "");
      
      // 3. Now, safely run the .includes() check on a guaranteed string.
      return productName.includes(query.toLowerCase()) || 
             productDescription.includes(query.toLowerCase());
    });
    
    // Simulate network delay for a better loading experience
    setTimeout(() => {
      setResults(filteredResults);
      setLoading(false);
    }, 500);

  } else {
    setResults([]);
    setLoading(false);
  }
}, [query, products]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fs-5 text-muted">Searching for products...</p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="text-center py-5 my-5 bg-light rounded-3">
          <i className="bi bi-search-heart fs-1 text-primary mb-3"></i>
          <h2 className="fw-light">No Luck This Time!</h2>
          <p className="lead text-muted">
            We couldn't find anything for "{query}".
            <br />
            How about trying a different keyword?
          </p>
          <div className="mt-4">
            <h6 className='fw-normal'>Suggestions:</h6>
            <ul className="list-unstyled text-muted">
              <li>Double-check your spelling.</li>
              <li>Use more general terms.</li>
              <li>Browse our popular categories.</li>
            </ul>
          </div>
          <Link to="/shop" className="btn btn-primary mt-3">
            <i className="bi bi-bag-check-fill me-2"></i> Explore Shop
          </Link>
        </div>
      );
    }
    
    return (
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {results.map(product => (
          <div key={product.id} className="col">
            <div className="card h-100 shadow-sm border-0 transition-shadow">
              <Link to={`/product/${product.id}`} className="text-decoration-none">
                <img 
                  src={product.image || 'https://via.placeholder.com/300x200.png?text=No+Image'} 
                  className="card-img-top" 
                  alt={product.name} 
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark">{product.name}</h5>
                <p className="card-text text-muted flex-grow-1">
                  {product.description?.substring(0, 80)}...
                </p>
                <p className="card-text fs-4 fw-bold text-success mb-3">₹{product.price}</p>
                <Link to={`/product/${product.id}`} className="btn btn-outline-primary mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container my-5">
      {query && (
         <h1 className="mb-4 fw-light">Search Results for: <span className="fw-bold text-primary">"{query}"</span></h1>
      )}
      {renderContent()}
    </div>
  );
}

export default SearchResultsPage;
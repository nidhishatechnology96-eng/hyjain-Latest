// src/components/NewsAndMedia.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewsAndMedia.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// ✅ Import the central data source for all news articles
import { allNewsArticles } from '../newsData'; 

// This reusable component creates a single news card.
// It now links to the detailed page using the article's "slug".
const NewsCard = ({ article }) => (
  <div className={`news-card grid-col-span-${article.gridSpan}`}>
    {/* The entire card is now a clickable link to the detail page */}
    <Link to={`/news/${article.slug}`}>
      <div className="card-image-container">
        <img src={article.image} alt={article.title} className="card-image" />
        <div className="card-category">{article.category}</div>
      </div>
      <div className="card-content">
        <p className="card-meta"><i className="bi bi-calendar3 me-2"></i>{article.date}</p>
        <h3 className="card-title">{article.title}</h3>
      </div>
    </Link>
  </div>
);

function NewsAndMedia() {
  // State to manage how many articles are currently shown
  const [visibleCount, setVisibleCount] = useState(5); 

  const handleLoadMore = () => {
    // Increase the number of visible articles by 3 when the button is clicked
    setVisibleCount(prevCount => prevCount + 3);
  };

  // Get the subset of articles to display based on the visibleCount
  const visibleArticles = allNewsArticles.slice(0, visibleCount);

  return (
    <div className="news-page-container">
      <header className="news-header">
        <h1>News & Media</h1>
        <p>The latest updates, stories, and press information from the world of HYJAIN.</p>
      </header>

      <div className="container news-content-area">
        <div className="news-grid">
          {/* Map over the visible articles and render a NewsCard for each one */}
          {visibleArticles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>

        {/* Only show the "Load More" button if there are more articles to show */}
        {visibleCount < allNewsArticles.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsAndMedia;
// src/components/ArticleDetailPage.jsx

import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { allNewsArticles } from './newsData'; // Import the data
import './ArticleDetailPage.css'; // We will create this CSS file next
import 'bootstrap-icons/font/bootstrap-icons.css';


function ArticleDetailPage() {
  const { articleId } = useParams(); // Gets the "slug" from the URL

  const article = allNewsArticles.find(a => a.slug === articleId);

  // If no article with that slug is found, redirect to the main news page
  if (!article) {
    return <Navigate to="/news-media" replace />;
  }

  return (
    <>
      <div className="article-detail-page">
        <header
          className="article-header"
          style={{ backgroundImage: `url(${article.image})` }}
        >
          <div className="article-header-overlay">
            <div className="container">
              <p className="article-category-badge">{article.category}</p>
              <h1 className="article-title">{article.title}</h1>
              <p className="article-meta">
                <i className="bi bi-calendar3 me-2"></i>Published on {article.date}
              </p>
            </div>
          </div>
        </header>

        <div className="container article-body-container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              <div className="back-link-container">
                <Link to="/news-media" className="back-link">
                  <i className="bi bi-arrow-left me-2"></i>Back to All News
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );

}

export default ArticleDetailPage;
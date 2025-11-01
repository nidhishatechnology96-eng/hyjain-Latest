// src/Shop/CategoryPage.jsx

import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminContext } from '../../AdminPanel/AdminContext';
import { CartContext } from '../../context/CartContext';
import Carousel from './Carousel';
import './ProductGrid.css';

function CategoryPage() {
    const { categoryName } = useParams();
    const { products, getCategoryByName } = useContext(AdminContext);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const [currentCategory, setCurrentCategory] = useState(null);
    const [isLoadingPage, setIsLoadingPage] = useState(true);

    // This is the variable that holds the category name, like "All Products"
    const decodedCategoryName = useMemo(() => {
        return categoryName ? decodeURIComponent(categoryName) : "All Products";
    }, [categoryName]);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setIsLoadingPage(true);
            try {
                // Assuming "All Products" doesn't have specific data to fetch this way
                if (decodedCategoryName !== "All Products") {
                    const categoryData = await getCategoryByName(decodedCategoryName);
                    setCurrentCategory(categoryData);
                } else {
                    setCurrentCategory(null); // Reset for "All Products"
                }
            } catch (error) {
                console.error("Failed to fetch category data:", error);
            } finally {
                setIsLoadingPage(false);
            }
        };
        fetchCategoryData();
    }, [decodedCategoryName, getCategoryByName]);

    const filteredProducts = useMemo(() => {
        const productList = products || [];
        if (decodedCategoryName === 'All Products') return productList;
        return productList.filter(p => p.category === decodedCategoryName);
    }, [products, decodedCategoryName]);
    
    // Use a default carousel for "All Products"
    const imagesForCarousel = decodedCategoryName === 'All Products'
        ? [ { desktopImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2874&auto=format&fit=crop', mobileImage: 'https://images.unsplash.com/photo-1587393855524-h2c16c352a9e?q=80&w=2874&auto=format&fit=crop' } ]
        : currentCategory?.carouselImages || [];

    const isWaterTheme = decodedCategoryName === 'Water Bottles';

    if (isLoadingPage) {
        return <div className="container my-5 text-center"><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <div className={`product-grid-page ${isWaterTheme ? 'water-theme' : ''}`}>
            <div className="container">
                <Carousel images={imagesForCarousel} />
                
                <div className="category-header-container">
                    <Link to="/shop" className="back-to-shop-button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        <span>Back to Shop</span>
                    </Link>
                    <div className="product-grid-header text-center">
                        <h1 className="page-title">{decodedCategoryName}</h1>
                        <p className="product-count">{filteredProducts.length} products found</p>
                    </div>
                </div>
            
                <div className="row g-4 pb-5">
                    {filteredProducts.map((product) => {
                        const isInCart = cart.some(item => item.id === product.id);
                        const placeholderImage = 'https://via.placeholder.com/400x400.png?text=No+Image';
                        const imageUrl = (product.images && product.images[0]) || product.image || placeholderImage;
                        return (
                            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
                                <div className="product-card-grid h-100">
                                    <Link to={`/product/${product.id}`} className="text-decoration-none d-flex flex-column h-100">
                                        <div className="product-image-container">
                                            <img src={imageUrl} alt={product.name} className="card-img-top" />
                                        </div>
                                        <div className="card-body d-flex flex-column p-3 text-start">
                                            <h5 className="card-title fs-6 text-dark flex-grow-1">{product.name}</h5>
                                            <h6 className="product-price fw-bold mb-3">₹{product.price}</h6>
                                            <div className="mt-auto d-grid">
                                                {isInCart ? (
                                                    <button className="btn btn-outline-danger" onClick={(e) => { e.preventDefault(); removeFromCart(product.id); }}>Remove</button>
                                                ) : (
                                                    <button className="btn btn-primary" onClick={(e) => { e.preventDefault(); addToCart(product); }}>Add to Cart</button>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- ✅ ADD THIS SECTION HERE --- */}
            {/* This will now correctly show the manufacturing process only on the "All Products" page */}
            {decodedCategoryName === 'All Products' && (
                <section className="manufacturing-process py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto text-center mb-5">
                                <h2 className="fw-bold">Our Hyjain & Quality <span className="text-success">Process</span></h2>
                                <p className="text-muted mt-3">
                                    Our commitment is to deliver purity and flavor...
                                </p>
                            </div>
                        </div>
                        <div className="timeline">
                            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 1</h5><p>Sourcing Premium Raw Materials</p></div></div>
                            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 2</h5><p>Initial Grading & Sorting</p></div></div>
                            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 3</h5><p>Multi-Stage Hyjain Cleaning</p></div></div>
                            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 4</h5><p>Precision Cutting & Preparation</p></div></div>
                            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 5</h5><p>Advanced Dehydration Process</p></div></div>
                            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 6</h5><p>Gentle Low-Temp Drying (to preserve nutrients)</p></div></div>
                            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 7</h5><p>Natural Cooling & Stabilization</p></div></div>
                            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 8</h5><p>Strict Quality Control (Moisture & Purity Test)</p></div></div>
                            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 9</h5><p>Sieving & Metal Detection</p></div></div>
                            <div className="timeline-item timeline-item-left"><div className="timeline-content"><h5 className="text-success fw-bold">Step 10</h5><p>Hyjain, Air-Tight Packaging</p></div></div>
                            <div className="timeline-item timeline-item-right"><div className="timeline-content"><h5 className="text-success fw-bold">Step 11</h5><p>Final Inspection & Dispatch</p></div></div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center mt-4">
                                <p className="fw-bold text-secondary">End Process</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default CategoryPage;
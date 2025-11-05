import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AdminContext } from '../AdminPanel/AdminContext';
import { CartContext } from '../context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, reviews, isLoading } = useContext(AdminContext);
    const { cart, addToCart } = useContext(CartContext);
    
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [displayImage, setDisplayImage] = useState('');

    // --- FIX #1: SCROLL TO TOP ON NEW PRODUCT VIEW ---
    // This effect runs every time the product ID in the URL changes.
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);
    
    // Effect to find the product and set its default state
    useEffect(() => {
        if (!isLoading && products.length > 0) {
            const foundProduct = products.find(p => p.id === id);
            setProduct(foundProduct);
            
            if (foundProduct?.options?.length > 0) {
                setSelectedOption(foundProduct.options[0]);
            } else {
                setSelectedOption(null); // Reset if product has no options
            }
            // Reset quantity to 1 when navigating to a new product
            setQuantity(1);
        }
    }, [id, products, isLoading]);

    // Effect to update the image gallery when the selected option changes
    useEffect(() => {
        if (selectedOption?.images?.length > 0 && selectedOption.images[0]) {
            setDisplayImage(selectedOption.images[0]);
        } else if (product?.images?.length > 0) {
            setDisplayImage(product.images[0]);
        }
    }, [selectedOption, product]);

    // Calculate average rating and review count
    const { averageRating, reviewCount } = useMemo(() => {
        if (!reviews || !product) return { averageRating: 0, reviewCount: 0 };
        const productReviews = reviews.filter(review => review.productId === product.id);
        const count = productReviews.length;
        if (count === 0) return { averageRating: 0, reviewCount: 0 };

        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return { averageRating: parseFloat((totalRating / count).toFixed(1)), reviewCount: count };
    }, [reviews, product]);

    const handleAddToCart = () => {
        if (product && selectedOption) {
            addToCart({ ...product, selectedOption, quantity });
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    if (isLoading) return <div className="text-center my-5"><div className="spinner-border"></div></div>;

    if (!product) {
        return (
            <div className="container my-5 text-center py-5">
                <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
                <h2 className="mt-3">Product Not Found</h2>
                <Link to="/shop" className="btn btn-primary mt-3">Continue Shopping</Link>
            </div>
        );
    }

    // --- FIX #2: REMOVED THE LIMIT ON RELATED PRODUCTS ---
    const relatedProducts = products.filter(p => 
        p.category === product.category && p.id !== product.id
    );

    // Dynamically derive all content from the selected option
    const currentPrice = selectedOption?.price || product.price || '0.00';
    const currentDescription = selectedOption?.description || product.description || 'No description available.';
    const currentImages = (selectedOption?.images?.length > 0 && selectedOption.images[0]) ? selectedOption.images : product.images || [];
    const subtotal = (currentPrice * quantity).toFixed(2);
    const cartItem = cart.find(item => item.cartId === `${product.id}-${selectedOption?.label}`);
    const inCart = cartItem ? cartItem.quantity : 0;

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="container my-5">
                <div className="row g-5">
                    {/* --- DYNAMIC IMAGE GALLERY --- */}
                    <div className="col-md-6">
                        <div className="card shadow-sm border-0 rounded-3 mb-3">
                            <img src={displayImage || 'https://placehold.co/600x600'} alt={product.name} className="img-fluid rounded-3" style={{ aspectRatio: '1 / 1', objectFit: 'cover' }} />
                        </div>
                        {currentImages.length > 1 && (
                            <div className="d-flex justify-content-center gap-2">
                                {currentImages.map((img, index) => (
                                    img && <img key={index} src={img} alt={`${product.name} thumbnail ${index + 1}`} className="img-thumbnail"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer', border: displayImage === img ? '2px solid #0d6efd' : '2px solid transparent' }}
                                        onClick={() => setDisplayImage(img)} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- DYNAMIC PRODUCT DETAILS --- */}
                    <div className="col-md-6">
                        {product.category && <span className="badge bg-primary mb-2">{product.category}</span>}
                        <h1 className="display-5 fw-bold">{product.name}</h1>

                        {reviewCount > 0 ? (
                            <div className="d-flex align-items-center mb-3">
                                <span className="fs-5 fw-bold text-warning me-2">{averageRating}</span><i className="bi bi-star-fill text-warning"></i>
                                <span className="text-muted ms-2">({reviewCount} Reviews)</span>
                            </div>
                        ) : (<div className="text-muted mb-3">No reviews yet.</div>)}

                        <div className="d-flex align-items-center mb-3">
                            <h2 className="text-success me-3 mb-0">₹{parseFloat(currentPrice).toFixed(2)}</h2>
                            {inCart > 0 && <span className="badge bg-warning text-dark">{inCart} in cart</span>}
                        </div>

                        <p className="text-muted mb-4 lead fs-6">{currentDescription}</p>

                        <div className="mb-4">
                            <h6>Product Details</h6>
                            <ul className="list-unstyled">
                                <li><i className="bi bi-check-circle text-success me-2"></i>100% natural ingredients</li>
                                <li><i className="bi bi-check-circle text-success me-2"></i>No added preservatives</li>
                            </ul>
                        </div>
                        
                        {product.options && product.options.length > 0 && (
                            <div className="mb-4">
                                <label className="form-label fw-bold">Option:</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {product.options.map((option, index) => (
                                        <button key={index} type="button"
                                            className={`btn btn-sm ${selectedOption?.label === option.label ? 'btn-primary' : 'btn-outline-secondary'}`}
                                            onClick={() => setSelectedOption(option)}>
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="row g-3 align-items-center mb-4">
                            <div className="col-auto"><label className="col-form-label fw-bold">Quantity:</label></div>
                            <div className="col-auto">
                                <div className="input-group" style={{ width: '120px' }}>
                                    <button className="btn btn-outline-secondary" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                                    <input type="number" className="form-control text-center" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} min="1" />
                                    <button className="btn btn-outline-secondary" onClick={() => setQuantity(q => q + 1)}>+</button>
                                </div>
                            </div>
                            <div className="col-auto"><span className="text-muted">Subtotal: ₹{subtotal}</span></div>
                        </div>

                        <div className="d-grid gap-2 d-sm-flex">
                            <button className="btn btn-primary btn-lg flex-fill" onClick={handleAddToCart} disabled={!selectedOption}>
                                <i className="bi bi-cart-plus me-2"></i>Add to Cart
                            </button>
                            <button className="btn btn-success btn-lg flex-fill" onClick={handleBuyNow} disabled={!selectedOption}>
                                <i className="bi bi-lightning me-2"></i>Buy Now
                            </button>
                        </div>

                        <div className="mt-4 p-3 bg-light rounded">
                            <h6 className="mb-2"><i className="bi bi-truck me-2"></i>Delivery Info</h6>
                            <p className="small mb-0">Free delivery on orders above ₹500. Usually delivered within 2-3 business days.</p>
                        </div>
                    </div>
                </div>

                {/* --- CORRECTED: RELATED PRODUCTS SECTION --- */}
                {relatedProducts.length > 0 && (
                    <div className="mt-5 pt-5 border-top">
                        <h3 className="mb-4">Related Products</h3>
                        <div className="row g-4">
                            {relatedProducts.map(relatedProduct => (
                                <div key={relatedProduct.id} className="col-md-3 col-6">
                                    <div className="card h-100 shadow-sm product-card-shop">
                                        <Link to={`/product/${relatedProduct.id}`} className="text-decoration-none">
                                            <img
                                                src={(relatedProduct.images && relatedProduct.images[0]) || "https://placehold.co/300x300"}
                                                alt={relatedProduct.name}
                                                className="card-img-top"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                            <div className="card-body d-flex flex-column text-center">
                                                <h6 className="card-title text-dark">{relatedProduct.name}</h6>
                                                <p className="card-text text-primary fw-bold mt-auto">₹{relatedProduct.price}</p>
                                            </div>
                                        </Link>
                                        <div className="card-footer bg-white border-0 text-center pb-3">
                                             <Link to={`/product/${relatedProduct.id}`} className="btn btn-sm btn-outline-primary">
                                                View Options
                                             </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
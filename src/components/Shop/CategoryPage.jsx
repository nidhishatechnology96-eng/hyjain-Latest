import React, { useContext, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AdminContext } from '../../AdminPanel/AdminContext';
import { CartContext } from '../../context/CartContext';
import './ProductGrid.css';
import Carousel from './Carousel'; // <-- 1. IMPORT THE CAROUSEL COMPONENT

// --- 2. CREATE A DATA OBJECT FOR YOUR IMAGES ---
// Place your image paths here. You can host them or import them.
const categoryImages = {
    'Dehydrated Fruits': [
        { src: 'https://happyharvestfarms.com/blog/wp-content/uploads/2023/11/dry-fruits-1.jpg', alt: 'Dried Apricots' },
        { src: 'https://draxe.com/wp-content/uploads/2022/04/DrAxeArticle-DriedFruit_Header.jpg', alt: 'Assortment of dried fruits' },
        { src: 'https://www.eatingwell.com/thmb/MsONGAwC-0VQg8k7bYhXXZKAqKg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Can-You-Eat-Dried-Fruit-If-You-Have-Diabetes-cfc60ec43da84d9aa76b4cfc7462c8d6.jpg', alt: 'Dried Figs' }
    ],
    'Dehydrated Vegetables': [
        { src: 'https://www.washturnkey.com/wp-content/uploads/2022/02/1-1.png', alt: 'Potatoes' },
        { src: 'https://dryvegfoods.com/images/slide-pics/slide1-bg.jpg', alt: 'Tomatoes' },
        { src: 'https://nutrivivefoods.com/wp-content/uploads/2024/04/Freeze-Dried-Vegetables-Products-1024x521.jpg', alt: 'Dried chili peppers' }
    ],
    'Spices': [
        { src: 'https://cdn-tps.b-cdn.net/wp-content/uploads/2025/01/Spices-in-Pickles.png', alt: 'Colorful spices in bowls' },
        { src: 'https://www.asianfoodexport.com/images/product/dehydrated-green-chili-powderflakes.jpg', alt: 'Cinnamon sticks' },
        { src: 'https://assets.bonappetit.com/photos/641081dbcd324c305855d0b0/16:9/w_2560%2Cc_limit/20230209%2520HIGHLY%2520REC12018-LORES%25201.jpg', alt: 'Star anise' }
    ],
    'Water Bottles': [
        { src: 'https://i0.wp.com/www.digitaltripathi.com/wp-content/uploads/2025/03/deepika-in-bisleri-ad.webp?ssl=1', alt: 'Water bottle by a lake' },
        { src: 'https://www.marketing360.in/wp-content/uploads/2017/08/Nishant-18thaugust-Brandstory-Bisleri-Chahal-Popli-1024x524.jpg', alt: 'Person holding a water bottle' },
        { src: 'https://www.bisleri.com/on/demandware.static/-/Sites/default/dw2c19928b/images/slot/fizzyDrinks/limonata-brand-page.jpg', alt: 'Water bottles on a shelf' }
    ]
};

function CategoryPage() {
    const { categoryName } = useParams();
    const { products, isLoading } = useContext(AdminContext);
    const { cart, addToCart, removeFromCart } = useContext(CartContext);

    const decodedCategoryName = useMemo(() => decodeURIComponent(categoryName), [categoryName]);

    const filteredProducts = useMemo(() => {
        return (products || []).filter(p => p.category === decodedCategoryName);
    }, [products, decodedCategoryName]);

    // --- 3. GET THE RIGHT IMAGES FOR THE CURRENT CATEGORY ---
    const imagesForCarousel = categoryImages[decodedCategoryName] || [];
    
    const isWaterTheme = decodedCategoryName === 'Water Bottles';

    if (isLoading) {
        return <div className="container my-5 text-center"><div className="spinner-border text-primary"></div></div>;
    }

    return (
        <div className={`product-grid-page ${isWaterTheme ? 'water-theme' : ''}`}>
            <div className="container"> {/* Use a container to keep carousel aligned */}
                {/* --- 4. RENDER THE CAROUSEL HERE --- */}
                {/* It's placed above your "Back" link and header */}
                <Carousel images={imagesForCarousel} />
            </div>

            {/* I have removed your old <section className="category-banner"> as the carousel replaces it */}
            <div className="container">
                <div className="product-grid-header text-center mb-5"> {/* Added text-center and margin */}
                    <Link to="/shop" className="back-to-shop-link d-block mb-3"> {/* Made it a block for better spacing */}
                        <i className="bi bi-arrow-left me-2"></i>Back to Shop
                    </Link>
                    <h1 className="page-title">{decodedCategoryName}</h1>
                    <p className="product-count">
                        {filteredProducts.length} products found
                    </p>
                </div>
            </div>
            
            <div className="container pb-5"> {/* Changed py-5 to pb-5 to avoid extra top space */}
                <div className="row g-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => {
                            const isInCart = cart.some(item => item.id === product.id);
                            return (
                                <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-6">
                                    <div className="product-card-grid h-100">
                                        <Link to={`/product/${product.id}`} className="text-decoration-none d-flex flex-column h-100">
                                            <div className="product-image-container">
                                                <img src={(product.images && product.images[0]) || product.image} alt={product.name} className="card-img-top" />
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
                        })
                    ) : (
                        <div className="col-12 text-center py-5">
                            <i className="bi bi-basket3 fs-1 text-muted"></i>
                            <h4 className="text-muted mt-3">No products found in this category yet.</h4>
                            <p className="text-muted">Check back soon for new arrivals!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
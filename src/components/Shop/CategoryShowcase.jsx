import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryShowcase.css'; // Make sure this CSS file is imported

// Data remains the same
const categoriesData = [
    { name: 'All Products', imageUrl: 'https://media.istockphoto.com/id/639892442/photo/variety-of-vegetables-fruit-seeds-cereals-beans-spices-superfoods-herbs.jpg?s=612x612&w=0&k=20&c=IRCFzX4_sUSi9XBZXI9U5VPNN6RIixMz0P_xZn2kUQ4=', slug: 'All Products' },
    { name: 'Spices', imageUrl: 'https://www.hungrypaprikas.com/wp-content/uploads/2024/11/seven-spice-20.jpg', slug: 'Spices' },
    { name: 'Dehydrated Fruits', imageUrl: 'https://static.toiimg.com/thumb/msid-85372696,width-400,resizemode-4/85372696.jpg', slug: 'Dehydrated Fruits' },
    { name: 'Dehydrated Vegetables', imageUrl: 'https://previews.123rf.com/images/marucyan/marucyan1504/marucyan150400008/39171167-vegetables-in-the-water.jpg', slug: 'Dehydrated Vegetables' },
    { name: 'Water Bottles', imageUrl: 'https://www.milton.in/cdn/shop/files/gps_generated_50e839f4-0fa9-41ab-af70-813cd74815fd.png?v=1736934477&width=1024', slug: 'Water Bottles' },
];

function CategoryShowcase() {
    return (
        <section className="category-showcase-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Top Categories</h2>
                    <p className="section-subtitle">Explore our curated selection of quality products.</p>
                </div>
                <div className="category-grid">
                    {categoriesData.map((cat) => (
                        <Link 
                            key={cat.name} 
                            // UPDATED: The link now points to `/category/...` to match your Shop.js component
                            to={`/category/${encodeURIComponent(cat.slug)}`}
                            className="category-item" 
                        >
                            <div 
                                className="category-circle" 
                                style={{ backgroundImage: `url(${cat.imageUrl})` }}
                            >
                                {/* The dark overlay is handled purely by CSS */}
                            </div>
                            <h5 className="category-title">{cat.name}</h5>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CategoryShowcase;
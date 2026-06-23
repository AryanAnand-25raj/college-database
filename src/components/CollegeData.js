import React, { useState } from 'react';
import './CollegeData.css';

const collegeData = [
    {
        id: 1,
        title: "Galgotias College of Engineering and Technology",
        image: `${process.env.PUBLIC_URL}/image/galgotiascollege.jpg`,
        NAAC_Grade: "A+",
        Placed_Students: 87,
        Area: ["DELHI_NCR", "Greater_Noida", "Uttar_Pradesh"],
        rating: 8.0,
    },
    {
        id: 2,
        title: "GL BAJAJ Institute of Technology and Management",
        image: `${process.env.PUBLIC_URL}/image/Gl.jpg`,
        NAAC_Grade: "A+",
        Placed_Students: 96,
        Area: ["DELHI_NCR", "Greater_Noida", "Uttar_Pradesh"],
        rating: 9.0,
    },
    {
        id: 3,
        title: "ABES Engineering College Ghaziabad",
        image: `${process.env.PUBLIC_URL}/image/ABES.jpg`,
        NAAC_Grade: "A+",
        Placed_Students: 85,
        Area: ["DELHI_NCR", "Ghaziabad", "Uttar_Pradesh"],
        rating: 8.0,
    },
    {
        id: 4,
        title: "New Horizon College of Engineering",
        image: `${process.env.PUBLIC_URL}/image/New_Horizon.jpg`,
        NAAC_Grade: "A+",
        Placed_Students: 87,
        Area: ["Bengaluru", "Karnataka"],
        rating: 7.0,
    },
    {
        id: 5,
        title: "Symbiosis International Deemed University",
        image: `${process.env.PUBLIC_URL}/image/Symbiosis.jpg`,
        NAAC_Grade: "A",
        Placed_Students: 83,
        Area: ["Pune", "Maharashtra"],
        rating: 6.0,
    },
    {
        id: 6,
        title: "DY Patil College of Engineering and Technology",
        image: `${process.env.PUBLIC_URL}/image/Dy_Patil.jpg`,
        NAAC_Grade: "A+",
        Placed_Students: 84,
        Area: ["Pune", "NaviMumbai"],
        rating: 7.0,
    }
];

function getRatingClass(rating) {
    if (rating >= 9) return 'best-college';
    if (rating >= 8) return 'great-college';
    if (rating >= 7) return 'good-college';
    return 'average';
}

function CollegeData() {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [activeArea, setActiveArea] = useState('');

    const allAreas = [...new Set(collegeData.flatMap(c => c.Area))].sort();

    let filtered = collegeData.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );

    if (activeArea) {
        filtered = filtered.filter(c => c.Area.includes(activeArea));
    }

    if (sortBy === 'rating') {
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'placement') {
        filtered = [...filtered].sort((a, b) => b.Placed_Students - a.Placed_Students);
    }

    return (
        <div className="College-Data">
            <h1>College Database</h1>
            <div className="search-section">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search colleges..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="sort-section" style={{ marginBottom: '1rem' }}>
                <label>Sort by:</label>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="">Default</option>
                    <option value="rating">Rating</option>
                    <option value="placement">Placement %</option>
                </select>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1rem' }}>
                {allAreas.map(area => (
                    <button
                        key={area}
                        className={`filter-btn${activeArea === area ? ' active' : ''}`}
                        onClick={() => setActiveArea(activeArea === area ? '' : area)}
                    >
                        {area.replace(/_/g, ' ')}
                    </button>
                ))}
            </div>
            {(search || activeArea || sortBy) && (
                <button className="clear-filters" onClick={() => { setSearch(''); setActiveArea(''); setSortBy(''); }}>
                    Clear Filters
                </button>
            )}
            {filtered.length === 0 ? (
                <div className="empty-state">
                    <h3>No colleges found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="college-product-grid">
                    {filtered.map(college => (
                        <div key={college.id} className="college-card">
                            <img src={college.image} alt={college.title} className="college-image" />
                            <p className="college-title">{college.title}</p>
                            <p className="college-grade">NAAC Grade: {college.NAAC_Grade}</p>
                            <p className="college-placement">Placed Students: {college.Placed_Students}%</p>
                            <p className="college-area">Areas: {college.Area.join(', ').replace(/_/g, ' ')}</p>
                            <p className={`college-rating ${getRatingClass(college.rating)}`}>
                                Rating: {college.rating}/10
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CollegeData;
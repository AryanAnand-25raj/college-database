import React, { useState } from 'react';
import './CollegeData.css';

const collegeData = [
    {
        id: 1,
        title: "Galgotias College of Engineering and Technology",
        image: "/image/galgotiascollege.jpg",
        NAAC_Grade: "A+",
        Placed_Students: 87,
        Area: ["DELHI_NCR", "Greater_Noida", "Uttar_Pradesh"],
        rating: 8.0,
    },
    {
        id: 2,
        title: "GL BAJAJ Institute of Technology and Management",
        image: "/image/Gl.jpg",
        NAAC_Grade: "A+",
        Placed_Students: 96,
        Area: ["DELHI_NCR", "Greater_Noida", "Uttar_Pradesh"],
        rating: 9.0,
    },
    {
        id: 3,
        title: "ABES Engineering College Ghaziabad",
        image: "/image/ABES.jpg",
        NAAC_Grade: "A+",
        Placed_Students: 85,
        Area: ["DELHI_NCR", "Ghaziabad", "Uttar_Pradesh"],
        rating: 8.0,
    },
    {
        id: 4,
        title: "New Horizon College of Engineering",
        image: "/image/New_Horizon.jpg",
        NAAC_Grade: "A+",
        Placed_Students: 87,
        Area: ["Bengaluru", "Karnataka"],
        rating: 7.0,
    },
    {
        id: 5,
        title: "Symbiosis International Deemed University",
        image: "/image/Symbiosis.jpg",
        NAAC_Grade: "A",
        Placed_Students: 83,
        Area: ["Pune", "Maharashtra"],
        rating: 6.0,
    },
    {
        id: 6,
        title: "DY Patil College of Engineering and Technology",
        image: "/image/Dy_Patil.jpg",
        NAAC_Grade: "A+",
        Placed_Students: 84,
        Area: ["Pune", "NaviMumbai"],
        rating: 7.0,
    }
];

function CollegeData() {
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("All");
    const [sortBy, setSortBy] = useState("title");

    const getRating = (rating) => {
        if (rating >= 9.0) return 'best-college';
        if (rating >= 8.5) return 'great-college';
        if (rating >= 7) return 'good-college';
        return 'average';
    };

    const naacGrades = ['All', ...new Set(collegeData.map((col) => col.NAAC_Grade))];

    const filteredColleges = collegeData.filter((col) => {
        const searchLower = searchTerm.toLowerCase();

        const matchesSearch =
            col.title.toLowerCase().includes(searchLower) ||
            col.NAAC_Grade.toLowerCase().includes(searchLower) ||
            col.Placed_Students.toString().includes(searchLower) ||
            col.Area.some((area) => area.toLowerCase().includes(searchLower)) ||
            col.rating.toString().includes(searchLower);

        const matchesGrade = selectedGrade === 'All' || col.NAAC_Grade === selectedGrade;

        return matchesSearch && matchesGrade;
    });

    // sortedColleges now comes AFTER filteredColleges — order fixed
    const sortedColleges = [...filteredColleges].sort((a, b) => {
        switch (sortBy) {
            case "title":
                return a.title.localeCompare(b.title);
            case "grade":
                return b.NAAC_Grade.localeCompare(a.NAAC_Grade);
            case "placement":
                return b.Placed_Students - a.Placed_Students;
            case "area":
                return a.Area[0].localeCompare(b.Area[0]);
            case "rating":
                return b.rating - a.rating;
            default:
                return 0;
        }
    });

    return (
        <div className="College-Data">
            <h1>Top Colleges For Education and Placement</h1>

            <button onClick={() => setLoading(!loading)}>
                {loading ? "Stop Loading" : "Start Loading"}
            </button>

            {loading ? (
                <div className="loading-spinner">
                    <p>Loading College List...</p>
                </div>
            ) : (
                <div className="main-content">

                    <div className='search-section'>
                        <input
                            type="text"
                            placeholder="Search College Name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />

                        {searchTerm && (
                            <p className="search-results">
                                Found {filteredColleges.length} college{filteredColleges.length === 1 ? '' : 's'} for "{searchTerm}"
                            </p>
                        )}
                    </div>

                    <div className='filter-section'>
                        <h4>Filter By NAAC Grade</h4>
                        <div className='genre-buttons'>
                            {naacGrades.map((grade) => (
                                <button
                                    key={grade}
                                    className={`filter-btn ${selectedGrade === grade ? 'active' : ''}`}
                                    onClick={() => setSelectedGrade(grade)}
                                >
                                    {grade}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='sort-section'>
                        <label htmlFor='sort-select'>Sort By:</label>
                        <select
                            id='sort-select'
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="title">Title (A-Z)</option>
                            <option value="grade">Grade (High-Low)</option>
                            <option value="placement">Placement % (High-Low)</option>
                            <option value="area">Area-Location (A-Z)</option>
                            <option value="rating">Rating (High-Low)</option>
                        </select>
                    </div>

                    <div className="college-product-grid">
                        {sortedColleges.map((col) => (
                            <div key={col.id} className="college-card">
                                <img src={col.image} alt={col.title} className="college-image" />
                                <h3 className="college-title">{col.title}</h3>
                                <p className="college-grade">NAAC: {col.NAAC_Grade}</p>
                                <p className="college-placement">Placements: {col.Placed_Students}%</p>
                                <p className="college-area">Area: {col.Area.join(", ")}</p>
                                <p className={`college-rating ${getRating(col.rating)}`}>Rating: {col.rating}/10</p>
                            </div>
                        ))}
                    </div>

                    {sortedColleges.length === 0 && (
                        <p>No colleges match your search.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default CollegeData;
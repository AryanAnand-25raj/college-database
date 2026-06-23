import { useMemo, useState } from 'react';
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

function getRatingLabel(rating) {
    if (rating >= 9) return { label: 'Best College', className: 'best-college' };
    if (rating >= 8) return { label: 'Great College', className: 'great-college' };
    if (rating >= 7) return { label: 'Good College', className: 'good-college' };
    return { label: 'Average', className: 'average' };
}

function CollegeData() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArea, setSelectedArea] = useState('All');
    const [sortBy, setSortBy] = useState('rating-desc');

    const areas = useMemo(() => {
        const uniqueAreas = new Set();
        collegeData.forEach((college) => {
            college.Area.forEach((area) => uniqueAreas.add(area));
        });
        return ['All', ...Array.from(uniqueAreas).sort()];
    }, []);

    const filteredColleges = useMemo(() => {
        return collegeData
            .filter((college) => {
                const matchesSearch = college.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesArea = selectedArea === 'All' || college.Area.includes(selectedArea);
                return matchesSearch && matchesArea;
            })
            .sort((first, second) => {
                if (sortBy === 'rating-desc') return second.rating - first.rating;
                if (sortBy === 'rating-asc') return first.rating - second.rating;
                if (sortBy === 'placement-desc') return second.Placed_Students - first.Placed_Students;
                return first.title.localeCompare(second.title);
            });
    }, [searchQuery, selectedArea, sortBy]);

    return (
        <main className="College-Data">
            <h1>College Database</h1>

            <section className="search-section" aria-label="Search colleges">
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search colleges"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
            </section>

            <section className="filter-section" aria-label="Filter by area">
                {areas.map((area) => (
                    <button
                        className={`filter-btn${selectedArea === area ? ' active' : ''}`}
                        type="button"
                        key={area}
                        onClick={() => setSelectedArea(area)}
                    >
                        {area.replaceAll('_', ' ')}
                    </button>
                ))}
            </section>

            <section className="sort-section" aria-label="Sort colleges">
                <label htmlFor="college-sort">Sort by</label>
                <select id="college-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                    <option value="rating-desc">Highest rating</option>
                    <option value="rating-asc">Lowest rating</option>
                    <option value="placement-desc">Best placement</option>
                    <option value="name-asc">Name</option>
                </select>
            </section>

            {(searchQuery || selectedArea !== 'All') && (
                <button
                    className="clear-filters"
                    type="button"
                    onClick={() => {
                        setSearchQuery('');
                        setSelectedArea('All');
                    }}
                >
                    Clear filters
                </button>
            )}

            {filteredColleges.length > 0 ? (
                <section className="college-product-grid" aria-label="Colleges">
                    {filteredColleges.map((college) => {
                        const rating = getRatingLabel(college.rating);

                        return (
                            <article className="college-card" key={college.id}>
                                <img className="college-image" src={college.image} alt={college.title} />
                                <h2 className="college-title">{college.title}</h2>
                                <p className="college-grade">NAAC Grade: {college.NAAC_Grade}</p>
                                <p className="college-placement">Placed Students: {college.Placed_Students}%</p>
                                <p className="college-area">Area: {college.Area.map((area) => area.replaceAll('_', ' ')).join(', ')}</p>
                                <p className={`college-rating ${rating.className}`}>{rating.label}: {college.rating.toFixed(1)}</p>
                            </article>
                        );
                    })}
                </section>
            ) : (
                <section className="empty-state" aria-live="polite">
                    <h3>No colleges found</h3>
                    <p>Try a different search or area filter.</p>
                </section>
            )}
        </main>
    );
}

export default CollegeData;

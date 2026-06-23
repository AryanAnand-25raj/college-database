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
    if (rating >= 9) {
        return "best-college";
    }

    if (rating >= 8) {
        return "great-college";
    }

    if (rating >= 7) {
        return "good-college";
    }

    return "average";
}

function CollegeData() {
    return (
        <main className="College-Data">
            <h1>College Database</h1>
            <div className="college-product-grid">
                {collegeData.map((college) => (
                    <article className="college-card" key={college.id}>
                        <img
                            className="college-image"
                            src={college.image}
                            alt={college.title}
                        />
                        <h2 className="college-title">{college.title}</h2>
                        <p className="college-grade">NAAC Grade: {college.NAAC_Grade}</p>
                        <p className="college-placement">
                            Placed Students: {college.Placed_Students}%
                        </p>
                        <p className="college-area">Area: {college.Area.join(", ")}</p>
                        <p className={`college-rating ${getRatingClass(college.rating)}`}>
                            Rating: {college.rating.toFixed(1)}
                        </p>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default CollegeData;

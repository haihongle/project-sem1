import { Routes, Route, Link } from "react-router-dom"
import { homepageRoutes } from "./Routes"
import { useState } from "react";
import styles from "./Homepage.module.scss"
import data from "../../../api/api";

console.log("regions:", data.regions)
console.log("beaches:", data.beaches)
console.log("blogs:", data.blogs);
console.log("services:", data.services);
console.log("activities:", data.activities);
console.log("images:", data.images);

function letGo() {
    const div = document.getElementById('ha');
    if (div) {
        div.scrollIntoView({ behavior: 'smooth' });
    }
}

function Homepage() {

    const [activeSite, setActiveSite] = useState("explore");
    const handleSite = (site) => {
        setActiveSite(site);
    };

    return (
        <>
            <div className={`${styles["HP_header"]}`}>
                <video
                    autoPlay
                    muted
                    loop
                    className={`${styles["HP_header-video"]}`}
                >
                    <source src="/HomepageVideo.mp4" type="video/mp4"></source>
                </video>
                <div className={`${styles["HP_header-welcome"]}`}>
                    <p className={`${styles["HP_header-welcome-text"]}`}>
                        Explore the serenity, the beauty
                    </p>
                    <p className={`${styles["HP_header-welcome-text"]}`}>
                        Discover your perfect beach
                    </p>
                    <div>
                        <button className={`${styles["HP_header-welcome-btn"]} mt-4`} onClick={letGo}>Let's go</button>
                    </div>
                    <i className={`${styles["HP_header-welcome-down"]} mt-3 fa-solid fa-arrow-down`}></i>
                </div>
            </div>

            <div className={`${styles["HP_content-intro"]} container-fluid`}>
                <p className={`${styles["HP_content-intro-text"]}`} id="ha">
                    A beach is a place where sunsets paint the sky with
                    extraordinary colors and the sound of waves lulls you into
                    blissful tranquility. Where dreams meet reality, and every
                    moment feels like a vacation.
                </p>
            </div>

            <div className="container-xl">
                <div className={`${styles["HP_content-nav"]} d-flex justify-content-evenly`}>
                    <Link to="/">
                        <button className={`${styles["HP_content-btn"]} ${styles[activeSite === "explore" ? "active" : ""]}`} onClick={() => handleSite("explore")}>Explore</button>
                    </Link>
                    <Link to="/Activities">
                        <button className={`${styles["HP_content-btn"]} ${styles[activeSite === "activity" ? "active" : ""]}`} onClick={() => handleSite("activity")}>Activities</button>
                    </Link>
                    <Link to="/Services">
                        <button className={`${styles["HP_content-btn"]} ${styles[activeSite === "service" ? "active" : ""]}`} onClick={() => handleSite("service")}>Services</button>
                    </Link>
                    <Link to="/Image">
                        <button className={`${styles["HP_content-btn"]} ${styles[activeSite === "image" ? "active" : ""]}`} onClick={() => handleSite("image")}>Image</button>
                    </Link>                
                </div>
                <Routes>
                    {homepageRoutes.map((route, index) => {
                        const Page = route.component
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<Page />}
                            ></Route>
                        )
                    })}
                </Routes>
                <a href="/Mainpage" className={`${styles["HP_content-btn"]} text-center`}>More</a>
              
                <div className={`${styles["HP_content-blog"]}`}>
                    <h1 className={`${styles["HP_content-title"]}`}>TRAVEL BLOGS</h1>
                    <p className={`${styles["HP_content-blog-desc"]}`}>
                        We share our experiences, tips and travel stories to
                        inspire and guide our readers in their own wanderlust
                        adventures. From hidden gems to popular destinations, we
                        showcase the beauty and diversity of the beaches, and
                        promote responsible and sustainable travel.
                    </p>
                    <div className="row">
                        {data.blogs.slice(0, 1).map((blog, index) => (
                            <div className="col-md-6 mt-5" key={index}>
                                <a target="_blank" className={`${styles["HP_content-blog-link"]} border border-secondary-subtle rounded-5 d-block`} href={blog.link}>
                                    <img
                                        src={blog.path}
                                        className={`${styles["HP_blog-img-main"]}`}
                                        alt="Blog 1"
                                    />
                                    <div className="ps-3 pe-3">
                                        <h2>{blog.info}</h2>
                                        <p>{blog.content}</p>
                                    </div>
                                </a>
                            </div>
                        ))}
                        <div className="col-md-6 mt-4 mt-md-5">
                            {data.blogs.slice(1, 4).map((blog, index) => (
                                <div className="mb-4" key={index}>
                                    <a target="_blank" className={`${styles["HP_content-blog-link"]} border border-secondary-subtle rounded-5 d-flex`} href={blog.link}>
                                        <img
                                            src={blog.path}
                                            className={`${styles["HP_blog-img-side"]} col-3 me-2`}
                                            alt="Blog 1"
                                        />
                                        <div>
                                            <h2>{blog.info}</h2>
                                            <p>{blog.content}</p>
                                        </div>  
                                    </a>
                                </div>    
                            ))}
                        </div>
                    </div>
                    <a href="/Blog" className={`${styles["HP_content-btn"]} text-center`}>More</a>
                </div>

                <div className={`${styles["HP_content-wish"]} row`}>
                    <div className="col-lg-6 pe-lg-5">
                        <h1 className={`${styles["HP_content-title"]}`}>Discover Your Next Adventure</h1>
                        <p className={`${styles["HP_content-wish-desc"]}`}>
                            Whether you're planning a romantic honeymoon or a
                            family vacation, our website provide best
                            informations. So, start browsing today and find the
                            perfect places that won't leave you feeling
                            un-sastify. We wish you joy, beautiful adventure, and wonderful experiences as you discover your journeys with us!
                        </p>
                        <p className={`${styles["HP_content-wish-desc"]} mt-5`}>Satisfaction</p>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{width: '90%', background: 'var(--main-color)'}}></div>
                        </div>
                        <p className={`${styles["HP_content-wish-desc"]} mt-5`}>Up to date informations</p>
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                            <div className="progress-bar" style={{width: '95%', background: 'var(--main-color)'}}></div>
                        </div>
                    </div>
                    <div className="col-lg-6 ps-lg-5 mt-5 mt-lg-0">
                        <img
                            className={`${styles["HP_content-wish-img"]}`}
                            src="https://travel.nicdark.com/travel-agency-wordpress-theme/wp-content/uploads/sites/9/2023/05/i-parallax-20-1024x683.jpeg"
                        ></img>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage

import React, { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import styles from "./Beachpage.module.scss"
import data from "../../../api/api"

function fetchRegion(id, setRegion) {
    const regions = async () => {
        try {
            const fetchedRegion = await data.getRegion(id)
            setRegion(fetchedRegion)
        } catch (error) {
            console.error("Error:", error)
        }
    }
    regions()
}

function fetchBeaches(arr) {
    try {
        const beaches = arr.beaches
        return beaches
    } catch (error) {
        console.error("Error fetching beaches:", error)
        return []
    }
}

function Beachpage() {
    const { id, beachID  } = useParams()
    const [region, setRegion] = useState(null)
    const [beaches, setBeaches] = useState([])
    const [currentBeach, setCurrentBeach] = useState(null)
    const [activities, setActivities] = useState(null)
    const [startIndex1, setAcivity1] = useState(0)
    const [startIndex2, setAcivity2] = useState(0)
    const [startIndex3, setAcivity3] = useState(0)
    const indexPerPage = 1
    const [startService, setstartService] = useState(0)
    const [services, setServices] = useState("food")
    const [foods, setFoods] = useState(null)
    const [hotels, sethotels] = useState(null)
    const [travels, setTravels] = useState(null)
    const [gallery, setGallery] = useState(null)
    const [startImage, setStartImage] = useState(0)
    const [feedbacks, setFeedbacks] = useState(null)
    const [blogs, setBlogs] = useState(null)
    const [timeDelay, settimeDelay] = useState(2600)
    const [currentFeedback, setCurrentFeedback] = useState(0)
    const usernameRef = useRef()
    const commentRef = useRef();
    const [currentRating, setCurrentRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [site, setSite] = useState("")
    const [startBeach, setStartBeach] = useState(0);
    const [startRegion, setStartRegion] = useState(0);
    const sectionRefs = {
        explore: useRef(null),
        activity: useRef(null),
        service: useRef(null),
        gallery: useRef(null),
        feedback: useRef(null),
        blog: useRef(null),
    }
    const ratingMessages = [
        "Terrible! 😭",
        "Bad! 😞",
        "Fine! 😐",
        "Good! 😊",
        "Excellent! 😄",
      ];

    // Fetch current region
    useEffect(() => {
        fetchRegion(id, setRegion)
    }, [id])

    // Fetch all the beaches in the current region
    useEffect(() => {
        if (region) {
            const fetchedBeaches = fetchBeaches(region)
            setBeaches(fetchedBeaches)
            console.log("Beaches in Region:", fetchedBeaches)
        }
    }, [region])

    // Fetch current beach
    useEffect(() => {
        if (beaches.length > 0 && beachID) {
            const beach = beaches[beachID - 1 ]
            setCurrentBeach(beach)
            console.log("Current beach:", beach)
        }
    }, [beaches, beachID])

    // Fetch current beach activities
    useEffect(() => {
        if (currentBeach && currentBeach.activity) {
            const activityArrays = Array.from({ length: 3 }, () => [])

            currentBeach.activity.forEach((activity, index) => {
                const subsetIndex = index % 3
                activityArrays[subsetIndex].push(activity)
            })
            console.log("Beach activities:", activityArrays)
            setActivities(activityArrays)
        }
    }, [currentBeach])
    const nextAcivity1 = () => {
        setAcivity1((startIndex1) => {
            const nextIndex = startIndex1 + indexPerPage
            return nextIndex < activities[0].length ? nextIndex : 0
        })
    }
    const nextAcivity2 = () => {
        setAcivity2((startIndex2) => {
            const nextIndex = startIndex2 + indexPerPage
            return nextIndex < activities[1].length ? nextIndex : 0
        })
    }
    const nextAcivity3 = () => {
        setAcivity3((startIndex3) => {
            const nextIndex = startIndex3 + indexPerPage
            return nextIndex < activities[2].length ? nextIndex : 0
        })
    }

    // Fetch current beach services
    const handleServices = (service) => {
        setServices(service)
    }
    useEffect(() => {
        if (currentBeach && currentBeach.food) {
            const fetchFoods = currentBeach.food
            console.log("Beach foods:", fetchFoods)
            setFoods(fetchFoods)
        }
    }, [currentBeach])
    useEffect(() => {
        if (currentBeach && currentBeach.hotel) {
            const fetchHotels = currentBeach.hotel
            console.log("Beach hotels:", fetchHotels)
            sethotels(fetchHotels)
        }
    }, [currentBeach])
    useEffect(() => {
        if (currentBeach && currentBeach.travel) {
            const fetchTravels = currentBeach.travel
            console.log("Beach travels:", fetchTravels)
            setTravels(fetchTravels)
        }
    }, [currentBeach])
    const nextService = (service) => {
        setstartService((startIndex) => {
            const startService = startIndex + indexPerPage
            return startService < service.length ? startService : 0
        })
    }
    const prevService = (service) => {
        setstartService((startIndex) => {
            const startService = startIndex - indexPerPage
            return startService < 0 ? service.length - 1 : startService
        })
    }

    // Fetch current beach gallery
    useEffect(() => {
        if (currentBeach && foods && hotels && travels && activities) {
            const fetchGallery = [
                ...currentBeach.gallery.map((item) => item.path),
                ...Object.values(foods).map((item) => item.path),
                ...Object.values(hotels).map((item) => item.path),
                ...Object.values(travels).map((item) => item.path),
                ...Object.values(activities).flatMap((arr) =>
                    arr.map((item) => item.path)
                ),
            ]
            console.log("Beach gallery:", fetchGallery)
            setGallery(fetchGallery)
        }
    }, [currentBeach, foods, hotels, travels, activities])
    const handlePrevImage = () => {
        setStartImage((prevIndex) => Math.max(0, prevIndex - 1))
    }
    const handleNextImage = () => {
        setStartImage((prevIndex) =>
            Math.min(gallery.length - 3, prevIndex + 1)
        )
    }

    // Fetch current beach feedbacks
    useEffect(() => {
        if (currentBeach) {
            const fetchFeedbacks = currentBeach.feedback
            console.log("Beach feedbacks:", fetchFeedbacks)
            setFeedbacks(fetchFeedbacks)
        }
    }, [currentBeach])
    const handlePrevFeedback = () => {
        setCurrentFeedback((prevIndex) =>
            prevIndex === 0 ? feedbacks.length - 1 : prevIndex - 1
        )
        settimeDelay(10000)
        setTimeout(() => {
            settimeDelay(2600)
        }, 10000)
    }
    const handleNextFeedback = () => {
        setCurrentFeedback((prevIndex) =>
            prevIndex === feedbacks.length - 1 ? 0 : prevIndex + 1
        )
        settimeDelay(10000)
        setTimeout(() => {
            settimeDelay(2600)
        }, 10000)
    }
    useEffect(() => {
        if (feedbacks) {
            const intervalId = setInterval(() => {
                setCurrentFeedback((prevBeach) => {
                    if (prevBeach >= feedbacks.length - 1) {
                        return 0
                    } else {
                        return prevBeach + 1
                    }
                })
            }, timeDelay)
            return () => clearInterval(intervalId)
        }
    }, [feedbacks, timeDelay])

    // Fetch current beach blogs
    useEffect(() => {
        if (currentBeach && gallery) {
            const newBlogs = [currentBeach.blog]
            const fetchBlogs = [...newBlogs, gallery]
            console.log("Beach blog:", fetchBlogs)
            setBlogs(fetchBlogs)
        }
    }, [currentBeach, gallery])

    // Feedback box
    const focusFeedback = () => {
        setTimeout(() => {
            console.log(usernameRef.current)
            usernameRef.current.focus()
        }, 100)
    }
    const clearFeedbacks = () => {
        setCurrentRating(null);
        setHover(null);
        usernameRef.current.value = '';
        commentRef.current.value = '';
    }
    const saveFeedback = async (e) => {
        e.preventDefault();
        const feedbackData = {
            username: usernameRef.current.value,
            content: commentRef.current.value,
            rating: currentRating,
        };

        try {
            if (feedbackData.username && feedbackData.content && feedbackData.rating) {
                setFeedbacks([...feedbacks, feedbackData]);
                clearFeedbacks();
            } else {
                if (!feedbackData.username) {
                    usernameRef.current.placeholder = "Please enter your name !";
                }
                if (!feedbackData.content) {
                    commentRef.current.placeholder = "Please enter your feedback !";
                }
            }
        } catch (error) {
            console.error("Error posting feedback:", error);
        }
    }

    // Other beach
    const navigatePreviousBeach = () => {
        if (startBeach > 0) {
            setStartBeach(startBeach - 1);
        } else if (startRegion > 0) {
            setStartRegion(startRegion - 1);
            setStartBeach(data.regions[startRegion - 1]?.beaches.length - 1);
        }
    };
    const navigateNextBeach = () => {
        if (startBeach < (data.regions[startRegion]?.beaches.length - 1)) {
            setStartBeach(startBeach + 1);
        } else if (startRegion < (data.regions.length - 1)) {
            setStartRegion(startRegion + 1);
            setStartBeach(0);
        }
    };
    const beach = data.regions && data.regions[startRegion]?.beaches && data.regions[startRegion].beaches[startBeach];

    // Scroll-spy
    const scrollToSection = (sectionRef, siteName) => {
        if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: "smooth" })
            setSite(siteName)
        }
    }
    useEffect(() => {
        const handleScroll = () => {
            let scrollY = window.scrollY + 150
            let isSiteActive = false

            Object.entries(sectionRefs).forEach(([key, ref]) => {
                if (ref.current) {
                    const sectionTop = ref.current.offsetTop
                    const sectionHeight = ref.current.offsetHeight
                    if (
                        scrollY >= sectionTop &&
                        scrollY < sectionTop + sectionHeight
                    ) {
                        setSite(key)
                        isSiteActive = true
                    }
                }
            })
            if (!isSiteActive) {
                setSite("")
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [sectionRefs])

    return (
        <>
            {region && (
                <div className={`${styles["BP_header"]}`}>
                    <div className={`${styles["BP_header-side1"]}`}>
                        <h1>{region.title}</h1>
                        <p>{region.info}</p>
                    </div>
                    <div className={`${styles["BP_header-side2"]}`}>
                        <img
                            className={`${styles["BP_header-img"]}`}
                            src={region.path}
                            alt="Beach"
                        ></img>
                    </div>
                </div>
            )}

            <div className="row g-2 g-md-0 position-sticky top-0 bg-light-subtle border-bottom z-3">
                <div
                    className={`${styles["BP_navbar-item"]} ${styles[site === "explore" ? "activeRef" : ""]} col-4 col-md text-center`}
                    onClick={() =>
                        scrollToSection(sectionRefs.explore, "explore")
                    }
                >
                    Explore
                </div>
                <div
                    className={`${styles["BP_navbar-item"]} ${styles[site === "activity" ? "activeRef" : ""]} col-4 col-md text-center`}
                    onClick={() =>
                        scrollToSection(sectionRefs.activity, "activity")
                    }
                >
                    Activities
                </div>
                <div
                    className={`${styles["BP_navbar-item"]} ${styles[site === "service" ? "activeRef" : ""]} col-4 col-md text-center`}
                    onClick={() =>
                        scrollToSection(sectionRefs.service, "service")
                    }
                >
                    Services
                </div>
                <div
                    className={`${styles["BP_navbar-item"]} ${styles[site === "gallery" ? "activeRef" : ""]} col-4 col-md text-center`}
                    onClick={() =>
                        scrollToSection(sectionRefs.gallery, "gallery")
                    }
                >
                    Gallery
                </div>
                <div
                    className={`${styles["BP_navbar-item"]} ${styles[site === "feedback" ? "activeRef" : ""]} col-4 col-md text-center`}
                    onClick={() =>
                        scrollToSection(sectionRefs.feedback, "feedback")
                    }
                >
                    Feedbacks
                </div>
                <div
                    className={`${styles["BP_navbar-item"]} ${styles[site === "blog" ? "activeRef" : ""]} col-4 col-md text-center`}
                    onClick={() => scrollToSection(sectionRefs.blog)}
                >
                    Blogs
                </div>
            </div>

            <div className="container mt-5">
                {/* EXPLORE */}
                {currentBeach !== null && (
                    <div
                        className={`${styles["BP_section"]}`}
                        ref={sectionRefs.explore}
                    >
                        <div className={`${styles["BP_explore"]}`}>
                            <div className={`${styles["BP_explore-content"]}`}>
                                <img
                                    className={`${styles["BP_explore-content-img"]}`}
                                    src={currentBeach.gallery[3].path}
                                ></img>
                            </div>
                            <div
                                className={`${styles["BP_explore-content-info"]}`}
                            >
                                <div>
                                    <h1>{currentBeach.name}</h1>
                                </div>
                                <div>
                                    <p>{currentBeach.info}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ACTIVITIES */}
                <div
                    className={`${styles["BP_section"]} row g-4`}
                    ref={sectionRefs.activity}
                >
                    <h1 className={`${styles["BP_title"]}`}>Activities</h1>

                    <div className="col col-md-4">
                        {activities !== null &&
                            activities[0]
                                .slice(
                                    startIndex1,
                                    startIndex1 + indexPerPage
                                )
                                .map((activity, index) => (
                                    <div
                                        className={`${styles["BP_activity"]} position-relative`}
                                        key={index}
                                    >
                                        <div
                                            className={`${styles["BP_activity-img"]}`}
                                        >
                                            <img
                                                className="card-img-top"
                                                src={activity.path}
                                            ></img>
                                        </div>
                                        <div
                                            className={`${styles["BP_activity-next"]}`}
                                            onClick={nextAcivity1}
                                        >
                                            Next
                                            <i className="fa-solid fa-arrow-right ms-3"></i>
                                        </div>
                                        <p>{activity.info}</p>
                                    </div>
                                ))}
                    </div>
                    <div className="col col-md-4">
                        {activities !== null &&
                            activities[1]
                                .slice(
                                    startIndex2,
                                    startIndex2 + indexPerPage
                                )
                                .map((activity, index) => (
                                    <div
                                        className={`${styles["BP_activity"]} position-relative`}
                                        key={index}
                                    >
                                        <div
                                            className={`${styles["BP_activity-img"]}`}
                                        >
                                            <img
                                                className="card-img-top"
                                                src={activity.path}
                                            ></img>
                                        </div>
                                        <div
                                            className={`${styles["BP_activity-next"]}`}
                                            onClick={nextAcivity2}
                                        >
                                            Next
                                            <i className="fa-solid fa-arrow-right ms-3"></i>
                                        </div>
                                        <p>{activity.info}</p>
                                    </div>
                                ))}
                    </div>
                    <div className="col col-md-4">
                        {activities !== null &&
                            activities[2]
                                .slice(
                                    startIndex3,
                                    startIndex3 + indexPerPage
                                )
                                .map((activity, index) => (
                                    <div
                                        className={`${styles["BP_activity"]} position-relative`}
                                        key={index}
                                    >
                                        <div
                                            className={`${styles["BP_activity-img"]}`}
                                        >
                                            <img
                                                className="card-img-top"
                                                src={activity.path}
                                            ></img>
                                        </div>
                                        <div
                                            className={`${styles["BP_activity-next"]}`}
                                            onClick={nextAcivity3}
                                        >
                                            Next
                                            <i className="fa-solid fa-arrow-right ms-3"></i>
                                        </div>
                                        <p>{activity.info}</p>
                                    </div>
                                ))}
                    </div>
                </div>

                {/* SERVICES */}
                <div
                    className={`${styles["BP_section"]}`}
                    ref={sectionRefs.service}
                >
                    <h1 className={`${styles["BP_title"]}`}>Service</h1>
                    <div className="d-flex justify-content-evenly">
                        <button
                            className={`${styles["BP_service-btn"]} ${styles[services === "food" ? "BP_service-btn-active" : ""]}`}
                            onClick={() => handleServices("food")}
                        >
                            Food
                        </button>
                        <button
                            className={`${styles["BP_service-btn"]} ${styles[services === "hotel" ? "BP_service-btn-active" : ""]}`}
                            onClick={() => handleServices("hotel")}
                        >
                            Hotel
                        </button>
                        <button
                            className={`${styles["BP_service-btn"]} ${styles[services === "travel" ? "BP_service-btn-active" : ""]}`}
                            onClick={() => handleServices("travel")}
                        >
                            Travel
                        </button>
                    </div>

                    <div className={`${styles["BP_service"]}`}>
                        {/* FOOD */}
                        <div
                            className={`${styles[services === "food" ? "BP_service-food" : "hidden"]}`}
                        >
                            {foods &&
                                foods
                                    .slice(
                                        startService,
                                        startService + indexPerPage
                                    )
                                    .map((food, index) => (
                                        <div key={index}>
                                            <div
                                                className={`${styles["BP_service-content"]}`}
                                            >
                                                <h1>{food.name}</h1>
                                                <p>{food.info}</p>
                                                <a
                                                    href={food.link}
                                                    target="_blank"
                                                >
                                                    <p>
                                                        <i className="fa-solid fa-location-dot"></i>
                                                        {food.location}
                                                    </p>
                                                </a>
                                            </div>
                                            <div
                                                className={`${styles["BP_service-food-img"]}`}
                                            >
                                                <img src={food.path}></img>
                                            </div>
                                        </div>
                                    ))}
                            <div className={`${styles["BP_service-food-btn"]}`}>
                                <button
                                    onClick={() => prevService(foods)}
                                    className="me-3"
                                >
                                    <i className="fa-solid fa-caret-left"></i>
                                </button>
                                <button onClick={() => nextService(foods)}>
                                    <i className="fa-solid fa-caret-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* HOTEL */}
                        <div
                            className={`${styles[services === "hotel" ? "BP_service-hotel" : "hidden"]}`}
                        >
                            {hotels &&
                                hotels
                                    .slice(
                                        startService,
                                        startService + indexPerPage
                                    )
                                    .map((hotel, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between"
                                        >
                                            <div
                                                className={`${styles["BP_service-hotel-img"]}`}
                                            >
                                                <img src={hotel.path}></img>
                                            </div>
                                            <div
                                                className={`${styles["BP_service-content"]}`}
                                            >
                                                <h1>{hotel.name}</h1>
                                                <p className="text-center mb-5">
                                                    <i className="me-1 me-md-3 fa-solid fa-star text-warning"></i>
                                                    <i className="me-1 me-md-3 fa-solid fa-star text-warning"></i>
                                                    <i className="me-1 me-md-3 fa-solid fa-star text-warning"></i>
                                                    <i className="me-1 me-md-3 fa-solid fa-star text-warning"></i>
                                                    <i className="me-1 me-md-3 fa-solid fa-star text-warning"></i>
                                                </p>
                                                <a
                                                    href={hotel.link}
                                                    target="_blank"
                                                >
                                                    <i className="fa-solid fa-location-dot me-3"></i>
                                                    {hotel.location}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                            <div
                                className={`${styles["BP_service-hotel-btn"]}`}
                            >
                                <button
                                    onClick={() => prevService(hotels)}
                                    className="me-3"
                                >
                                    <i className="fa-solid fa-caret-left"></i>
                                </button>
                                <button onClick={() => nextService(hotels)}>
                                    <i className="fa-solid fa-caret-right"></i>
                                </button>
                            </div>
                        </div>

                        {/* TRAVEL */}
                        <div
                            className={`${styles[services === "travel" ? "BP_service-travel" : "hidden"]}`}
                        >
                            {currentBeach && travels &&
                                travels
                                    .slice(
                                        startService,
                                        startService + indexPerPage
                                    )
                                    .map((travel, index) => (
                                        <div
                                            key={index}
                                            className="d-flex justify-content-between"
                                        >
                                            <div
                                                className={`${styles["BP_service-travel-map"]}`}
                                            >
                                                <iframe src={currentBeach.map}></iframe>
                                            </div>
                                            <a
                                                href={travel.link}
                                                target="_blank"
                                            >
                                                <h1>{travel.name}</h1>
                                                <div>
                                                    <img
                                                        src={travel.path}
                                                    ></img>
                                                </div>
                                            </a>
                                            <div
                                                className={`${styles["BP_service-travel-btn"]}`}
                                            >
                                                <button
                                                    onClick={() =>
                                                        prevService(travels)
                                                    }
                                                >
                                                    <i className="fa-solid fa-caret-left"></i>
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        nextService(travels)
                                                    }
                                                >
                                                    <i className="fa-solid fa-caret-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div
                    className={`${styles["BP_section"]}`}
                    ref={sectionRefs.gallery}
                >
                    <h1 className={`${styles["BP_title"]}`}>Gallery</h1>
                    <div
                        className={`${styles["BP_gallery"]} position-relative`}
                    >
                        <button
                            className={`${styles["BP_gallery-btn-left"]}`}
                            onClick={handlePrevImage}
                        >
                            <i className="fa-solid fa-caret-left"></i>
                        </button>
                        <button
                            className={`${styles["BP_gallery-btn-right"]}`}
                            onClick={handleNextImage}
                        >
                            <i className="fa-solid fa-caret-right"></i>
                        </button>
                        <div className={`${styles["BP_gallery-container"]}`}>
                            {gallery && (
                                window.innerWidth < 900 ? (
                                    <div className={styles[`BP_gallery-img`]}>
                                        <img src={gallery[startImage]}></img>
                                    </div>
                                ) : (
                                    gallery
                                    .slice(startImage, startImage + 3)
                                    .map((image, index) => (
                                        <div
                                            key={index}
                                            className={styles[`BP_gallery-img`]}
                                        >
                                            <img src={image}></img>
                                        </div>
                                    ))
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* FEEDBACKS */}
            <div
                className={`${styles["BP_section"]}`}
                ref={sectionRefs.feedback}
            >
                <h1 className={`${styles["BP_title"]}`}>Feedbacks</h1>
                <div className={`${styles["BP_feedback"]}`}>
                    <div className="container-md">
                        <div className={`${styles["BP_feedback-content"]}`}>
                            <button
                                className={`${styles["BP_feedback-left"]}`}
                                onClick={handlePrevFeedback}
                            >
                                <i className="fa-solid fa-caret-left"></i>
                            </button>
                            <button
                                className={`${styles["BP_feedback-right"]}`}
                                onClick={handleNextFeedback}
                            >
                                <i className="fa-solid fa-caret-right"></i>
                            </button>
                            {feedbacks &&
                                feedbacks.map((feedback, index) => (
                                    <div
                                        key={index}
                                        className={`${styles[index % feedbacks.length === currentFeedback ? "active" : "hidden"]}`}
                                    >
                                        <h3 className="text-center">
                                            {feedback.username}
                                        </h3>
                                        <p className="text-center">
                                            {[...Array(5)].map(
                                                (_, starIndex) => (
                                                    <i
                                                        key={starIndex}
                                                        className={`me-3 fa-solid fa-star ${starIndex < feedback.rating ? "text-warning" : ""}`}
                                                    ></i>
                                                )
                                            )}
                                        </p>
                                        <p>{feedback.content}</p>
                                    </div>
                                ))}
                        </div>
                        <button
                            className={`${styles["BP_feedback-btn"]}`}
                            data-bs-toggle="modal"
                            data-bs-target="#feedbackModal"
                            onClick={focusFeedback}
                        >
                            Leave your comment
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="modal fade"
                data-bs-backdrop="static"
                id="feedbackModal"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className={`${styles["BP_modal-header"]}`}>
                            <h1>Share Us Your Thought</h1>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={saveFeedback}>
                                <div
                                    className={`${styles["BP_modal-body-cmt"]}`}
                                >
                                    <label
                                        htmlFor="username"
                                        className="form-label"
                                    >
                                        Your name
                                    </label>
                                    <input
                                        id="username"
                                        className="form-control"
                                        ref={usernameRef}
                                    ></input>
                                    <label
                                        htmlFor="comment"
                                        className="form-label mt-3"
                                    >
                                        Your thought about this place
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="comment"
                                        rows="3"
                                        ref={commentRef}
                                    ></textarea>
                                </div>
                                <div
                                    className={`${styles["BP_modal-body-rating"]} d-flex justify-content-between`}
                                >
                                    <div className="form-label">
                                        Your Rating
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        {[...Array(5)].map((star, index) => {
                                            const rating = index + 1;
                                            return (
                                            <label className={`${styles["BP_rating-star"]}`} key={index}>
                                                <input
                                                type="radio"
                                                name="rating"
                                                value={rating}
                                                onClick={() => setCurrentRating(rating)}
                                                />
                                                <i
                                                    className="me-sm-3 me-0 fa-solid fa-star"
                                                    style={{
                                                        color: currentRating >= rating || (hover && hover >= rating) ? "#ffc107" : "",
                                                    }}
                                                    onMouseEnter={() => setHover(rating)}
                                                    onMouseLeave={() => setHover(null)}
                                                ></i>
                                            </label>
                                            );
                                        })}
                                    </div>
                                    <span>{(hover && ratingMessages[hover - 1]) || (currentRating && ratingMessages[currentRating -1])}</span>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className={`${styles["BP_modal-body-btn"]}`}
                                onClick={saveFeedback}
                                data-bs-dismiss={usernameRef.current?.value && commentRef.current?.value && currentRating ? "modal" : ""}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className={`${styles["BP_modal-body-btn"]}`}
                                data-bs-dismiss="modal"
                                onClick={clearFeedbacks}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* BLOGS */}
                <div
                    className={`${styles["BP_section"]}`}
                    ref={sectionRefs.blog}
                >
                    <h1 className={`${styles["BP_title"]}`}>Blogs</h1>
                    <div className="row g-5">
                    {blogs &&
                        blogs[0].map((blog, index) => (
                            <a
                                href={blog.link}
                                target="_blank"
                                className={`${styles["BP_blog-link"]} col ${blogs[0].length > 1 ? "col-12 col-xl-6" : ""} d-flex`}
                                key={index}
                            >
                                <div className={`${styles["BP_blog-img"]}`}>
                                    <img src={blogs[1][index]} alt={`Blog ${index + 1}`} />
                                </div>
                                <div className={`${styles["BP_blog-content"]}`}>
                                    <h1>{blog.info}</h1>
                                    <p>{blog.content}</p>
                                </div>
                            </a>
                        ))
                    }
                    </div>
                </div>

                {/* OHTER BEACHES */}
                <div className={`${styles["BP_section"]} mb-5 pb-5`}>
                    <h1 className={`${styles["BP_title"]}`}>Other Beaches</h1>
                    <div className={`${styles["BP_service"]} position-relative`}>
                        {beach && (
                            <a
                                href={`/Beach/${data.regions[startRegion].name}/${data.regions[startRegion].id}/beaches/${beach.id}`}
                                className={`${styles["BP_other-beaches"]} d-flex justify-content-between`}
                                key={beach.id}
                            >
                                <div className={`${styles["BP_other"]}`}>
                                    <h1>{beach.name}</h1>
                                    <p>{beach.info}</p>
                                </div>
                                <div className={`${styles["BP_other-img"]}`}>
                                    <img src={beach.gallery[0].path} alt={beach.name} />
                                </div>
                            </a>
                        )}
                        <div className={`${styles["BP_other-btn"]}`}>
                            <button onClick={navigatePreviousBeach}>
                                <i className="fa-solid fa-caret-left"></i>
                            </button>
                            <button onClick={navigateNextBeach}>
                                <i className="fa-solid fa-caret-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Beachpage

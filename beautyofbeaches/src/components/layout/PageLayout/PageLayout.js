import styles from "./PageLayout.module.scss"
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import data from "../../../api/api";

function PageLayout({ children }) {
    
    // Set Layout for pages
    const [isPage, setIsPage] = useState(false);
    const [isMainPage, setIsMainPage] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setIsPage(location.pathname === '/About-us' || location.pathname === '/Blog' || location.pathname === '/Gallery');
        setIsMainPage(location.pathname === '/Mainpage')
    }, [location.pathname]);


    // Handle Button scroll-to-top
    const [isBtnVisible, setIsBtnVisible] = useState(false)

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
        
    const handleScroll = () => {
        const scrollTop = window.scrollY
        if (scrollTop > 800) {
            setIsBtnVisible(true)
        } else {
            setIsBtnVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // Handle search modal
    const [searchModal, setSearchModal] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    let timeoutId;
    const handleSearchModal = () => {
        setSearchModal(prevState => !prevState);
        const inputElement = document.getElementById('searchInput');
        setSearchResults([]);
        if (inputElement) {
            inputElement.value = '';
        }
    };
    
    const handleInputChange = (event) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            handleSearch(event.target.value);
        }, 1000);
        setSearchInput(event.target.value);
    };

    const handleSearch = (input) => {
        let results = [];
        if (input) {
            results = data.regions.flatMap(region => {
                return region.beaches
                    .filter(beach => beach.name.toLowerCase().includes(input.toLowerCase()))
                    .map(beach => ({
                        beach,
                        regionId: region.id,
                        regionName: region.name
                    }));
            });
        }
        console.log(results);
        setSearchResults(results);
    };
    

    // Tooltips
    useEffect(() => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
    }, []);
        
    return (
        <>
            <header className={`${styles[isPage ? 'normal-header' : 'absolute-header']}`}>
                <div className="navbar navbar-expand-xxl p-0">
                    <div className="container-fluid p-0 p-xxl-3">
                        <a className="navbar-brand d-flex" href="/" style={{ width: "20%"}}>
                            <img className={`${styles["PL_header-logo"]}`} src="/logo.png"></img>
                            <span className={`${styles["PL_header-web"]}`}>Beauty of Beach</span>
                        </a>   
                        <div className="d-flex">
                            <button className={`${styles["PL_header-search"]} me-2 d-xxl-none d-block`} onClick={handleSearchModal}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <button
                                className={`${styles["PL_header-search"]} navbar-toggler ms-1`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarHide"
                            >
                                <i className="fa-solid fa-bars"></i>
                            </button>
                        </div>                                         
                        <div className={`${styles["PL_header-navbar-collapse"]} collapse navbar-collapse`} id="navbarHide">
                            <ul className="navbar-nav m-auto">
                                <li className="nav-item ms-5">
                                    <a
                                        className={`${styles["PL_header-font"]}`}
                                        href="/"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item ms-5">
                                    <a
                                        className={`${styles["PL_header-font"]}`}
                                        href="/Mainpage"
                                    >
                                        Travel
                                    </a>
                                </li>
                                <li className="nav-item ms-5">
                                    <a
                                        className={`${styles["PL_header-font"]}`}
                                        href="/Blog"
                                    >
                                        Blogs
                                    </a>
                                </li>
                                <li className="nav-item ms-5">
                                    <a
                                        className={`${styles["PL_header-font"]}`}
                                        href="/Gallery"
                                    >
                                        Gallery
                                    </a>
                                </li>
                                <li className="nav-item ms-5">
                                    <a
                                        className={`${styles["PL_header-font"]}`}
                                        href="/About-us"
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li className="d-xxl-none d-block nav-item ms-5">
                                    <div className="dropdown">
                                        <a className={`${styles["PL_header-font"]} dropdown-toggle`} data-bs-toggle="dropdown" aria-expanded="false">
                                            Contact Us
                                        </a>
                                        <ul className={`dropdown-menu ${styles["PL_header-contact-list"]} bg-transparent border-0`}>
                                            <li className="dropdown-item text-light"><i className="fa-solid fa-phone me-1"></i>0123.456.789</li>
                                            <li className="dropdown-item text-light"><i className="fa-solid fa-envelope me-1"></i>BOB@gmail.com</li>
                                            <li className="dropdown-item text-light"><i className="fa-solid fa-headset me-1"></i>Live chat</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="d-xxl-flex justify-content-end d-none" style={{ width: "20%" }}>
                            <button className={`${styles["PL_header-search"]} me-2`} onClick={handleSearchModal}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                            <span className={`${styles["PL_header-line"]}`}></span>
                            <div className={`${styles["PL_header-contact"]}  position-relative`}>
                                Contact us
                                <i className={`${styles["PL_header-contact-arrow"]} fa-solid fa-caret-down`}></i>
                                <ul className={`${styles["PL_header-contact-list"]} list-group`}>
                                    <li className="list-group-item"><i className="fa-solid fa-phone me-1"></i>0123.456.789</li>
                                    <li className="list-group-item"><i className="fa-solid fa-envelope me-1"></i>BOB@gmail.com</li>
                                    <li className="list-group-item"><i className="fa-solid fa-headset me-1"></i>Live chat</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`${styles[searchModal ? "PL_searchModal" : "hidden"]}`}>
                <div className="d-flex position-relative">
                    <input id="searchInput" className="form-control" placeholder="Search..." onChange={handleInputChange} autoComplete="off"></input>
                    <ul className="list-group">
                        {searchResults && searchResults.map((result, index) => (
                            <li className="list-group-item" key={index}>
                                <a href={`/Beach/${result.regionName}/${result.regionId}/beaches/${result.beach.id}`}>
                                    <img src={result.beach.gallery[3].path}/>
                                    <p>{result.beach.name}</p>   
                                </a>
                            </li>
                        ))}
                    </ul>   
                    <button className="btn border" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Close search" onClick={handleSearchModal}><i className="fa-solid fa-x"></i></button>                                
                </div>
            </div>

            {children}

            <footer className={`${styles[isMainPage ? 'hidden' : '']} pb-4`}>
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-3 mt-4">
                            <p className={`${styles["PL_header-font"]} mb-2`}>
                                Site map
                            </p>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="/">
                                        <i className="fa-solid fa-house me-2"></i>
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="/Mainpage">
                                        <i className="fa-solid fa-paper-plane me-2"></i>
                                        Travel
                                    </a>
                                </li>
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="/Blog">
                                        <i className="fa-solid fa-book me-2"></i>
                                        Blogs
                                    </a>
                                </li>
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="/Gallery">
                                        <i className="fa-solid fa-image me-2"></i>
                                        Gallery
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-3 mt-4">
                            <p className={`${styles["PL_header-font"]} mb-2`}>
                                Links
                            </p>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="/About-us">
                                        About Us
                                    </a>
                                </li>
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="#" onClick={(e) => {e.preventDefault()}}>
                                        FAQ
                                    </a>
                                </li>
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="#" onClick={(e) => {e.preventDefault()}}>
                                        Travel Tips
                                    </a>
                                </li>
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="#" onClick={(e) => {e.preventDefault()}}>
                                        Weather
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-3 mt-4">
                            <p className={`${styles["PL_header-font"]} mb-2`}>
                                Follow Us
                            </p>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="#" onClick={(e) => {e.preventDefault()}}>
                                        <i className="fa-brands fa-square-instagram me-2"></i>
                                        Instagram
                                    </a>
                                </li>
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="#" onClick={(e) => {e.preventDefault()}}>
                                        <i className="fa-brands fa-square-facebook me-2"></i>
                                        Facebook
                                    </a>
                                </li>
                                <li className="nav-item mt-3">
                                    <a className="fs-4" href="#" onClick={(e) => {e.preventDefault()}}>
                                        <i className="fa-brands fa-square-x-twitter me-2"></i>
                                        X-Twitter
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md-3 mt-4">
                            <p className={`${styles["PL_header-font"]} mb-2`}>
                                Address
                            </p>
                            <a href="https://www.google.com/maps/place/Detech+Building/@21.028765,105.781789,14z/data=!4m6!3m5!1s0x313454b3285df81f:0x97be82a66bbe646b!8m2!3d21.0287649!4d105.7817893!16s%2Fg%2F11b7sy4x6v?hl=vi&entry=ttu" target="_blank" className="mt-4 mb-2 fs-4 text-light"><i className="fa-solid fa-location-dot"></i> 8 Tôn Thất Thuyết, Mỹ Đình, Nam Từ Liêm, Hà Nội, Việt Nam</a>
                            <iframe className="rounded-3 d-md-block d-none" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7448.164880305965!2d105.7816318452492!3d21.029387120259692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b3285df81f%3A0x97be82a66bbe646b!2sDetech%20Building!5e0!3m2!1svi!2s!4v1713486964354!5m2!1svi!2s"width="100%" height="60%" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                    <hr className="mt-5 mb-5"></hr>
                    <div>
                        <a className="navbar-brand d-flex justify-content-center me-4" href="/">
                            <img className={`${styles["PL_header-logo"]}`} src="/logo.png"></img>
                            <span className={`${styles["PL_header-web"]}`}>Beauty of Beach</span>
                        </a>
                    </div>
                    <div className="text-center mt-5 fs-4 text-light">
                        @E-Project Semester I - T2310E
                    </div>
                </div>
            </footer>

            <button
                className={`${styles[isBtnVisible ? "topBtn" : "hidden"]} `}
                onClick={scrollToTop}
            >
                <i className="fa-solid fa-arrow-up m-auto"></i>
            </button>
        </>
    )
}

export default PageLayout

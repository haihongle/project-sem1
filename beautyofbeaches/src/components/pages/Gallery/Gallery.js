import styles from "./Gallery.module.scss"
import data from "../../../api/api";
import { useState, useEffect } from "react";
import { all } from "axios";

function Gallery() {

    const [images, setImages] = useState([]);
    const [items, setItems] = useState(8);

    const handleLoadMore = () => {
        setItems(prevItems => prevItems + 32);
    };

    useEffect(() => {
        const extractedData = data.beaches.reduce((accumulator, beach) => {
            const extractedArray = [];
            for (let i = 0; i < beach.gallery.length; i++) {
                extractedArray.push({
                    type: "image",
                    path: beach.gallery[i].path,
                });
            }
            for (let f = 0; f < beach.food.length; f++) {
                extractedArray.push({
                    type: "food",
                    path: beach.food[f].path,
                });
            }
            for (let h = 0; h < beach.hotel.length; h++) {
                extractedArray.push({
                    type: "hotel",
                    path: beach.hotel[h].path,
                });
            }
            return accumulator.concat(extractedArray);
        }, []);
        console.log(extractedData)
        setImages(extractedData);
    }, []);

    return (
        <>
            <div className="container mb-5 position-relative">
                <h1 className={`${styles["Gallerytittle"]}`}>Gallery</h1>
                <div className="row g-xl-5 g-2 mt-3">
                    {images.slice(0, items).map((image, index) => (
                        <div className={`${styles["galleryContainer"]} col-md-6 col-xl-3`} key={index}>
                            {image.type === "image" && <img src={image.path}/>}
                            {image.type === "food" && <img src={image.path}/>}
                            {image.type === "hotel" && <img src={image.path}/>}
                        </div>
                    ))}
                </div>
                {items < images.length && (                  
                    <button className={`${styles["galleryBtn"]}`} onClick={handleLoadMore}>
                        Loading More...
                    </button>
                )}
            </div>
        </>
    );
}

export default Gallery;
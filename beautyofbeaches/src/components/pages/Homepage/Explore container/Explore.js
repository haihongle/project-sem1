import styles from "./Explore.module.scss"
import data from "../../../../api/api"

function Explore() {
    return (
        <div className={`${styles["exploreContainer"]}`}>
            <div className="row g-2 g-md-4">
                {data.images.slice(0, 6).map((image, index) => (
                    <div className="col-6 col-md-4" key={index}>
                        <a className="position-relative" href={`/Beach/${image.regionName}/${image.regionID}/beaches/${image.beachID}`}>
                            <img
                                src={image.path}
                                alt={image.name}
                                className={`${styles["HP_explore-img"]}`}
                            />
                            <span className={`${styles["HP_explore-img-name"]}`}>{image.name}</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Explore;


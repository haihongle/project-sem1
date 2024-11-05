import styles from "./Services.module.scss"
import data from "../../../../api/api"

function Services() {
    return (
        <div className={`${styles["serviceContainer"]}`}>
            <div className="row g-2 g-md-4">
                {data.services.slice(0, 4).map((service, index) => (
                    <div className="col-md-3 col-6" key={index}>
                        <a className="position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                            <img
                                src={service.pathFood}
                                className={`${styles["HP_service-img"]}`}
                                alt={`Service ${index + 1}`}
                            />
                            <span className={`${styles["HP_service-img-name"]}`}>{service.nameFood}</span>
                        </a>
                    </div>
                ))}
                {data.services.slice(4, 8).map((service, index) => (
                    <div className="col-md-3 col-6" key={index + 4}>
                        <a className="position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                            <img
                                src={service.pathHotel}
                                className={`${styles["HP_service-img"]}`}
                                alt={`Service ${index + 5}`}
                            />
                            <span className={`${styles["HP_service-img-name"]}`}>{service.nameHotel}</span>
                        </a>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Services

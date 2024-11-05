import styles from "./Activities.module.scss"
import data from "../../../../api/api"

function Activities() {

    const activity = data.activities;

    return (
        <div className={`${styles["activityContainer"]}`}>
            <div className="row g-2 g-md-4">
                <div className="col-6">
                    <a className="position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                        <img
                            src={activity[0].path}
                            className={`${styles["HP_activity-img"]}`}
                        ></img>
                        <span className={`${styles["HP_activity-img-name"]}`}>{activity[0].info}</span>
                    </a>
                </div>
                <div className="col-6 d-none d-md-block">
                    <div className="row">
                        <a className="col position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                            <img
                                src={activity[1].path}
                                className={`${styles["HP_activity-img"]}`}
                            ></img>
                            <span className={`${styles["HP_activity-img-name"]}`}>{activity[1].info}</span>
                        </a>
                        <a className="col position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                            <img
                                src={activity[2].path}
                                className={`${styles["HP_activity-img"]}`}
                            ></img>
                            <span className={`${styles["HP_activity-img-name"]}`}>{activity[2].info}</span>
                        </a>
                    </div>
                </div>
                <div className="col-6 d-md-none">
                    <a className="col position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                        <img
                            src={activity[1].path}
                            className={`${styles["HP_activity-img"]}`}
                        ></img>
                        <span className={`${styles["HP_activity-img-name"]}`}>{activity[1].info}</span>
                    </a>
                </div>
                <div className="col-6 d-md-none">
                    <a className="col position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                        <img
                            src={activity[2].path}
                            className={`${styles["HP_activity-img"]}`}
                        ></img>
                        <span className={`${styles["HP_activity-img-name"]}`}>{activity[2].info}</span>
                    </a>
                </div>
                <div className="col-6">
                    <a className="position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                        <img
                            src={activity[3].path}
                            className={`${styles["HP_activity-img"]}`}
                        ></img>
                        <span className={`${styles["HP_activity-img-name"]}`}>{activity[3].info}</span>
                    </a>
                </div>
                <div className="col-6 d-none d-md-block">
                    <div className="row">
                        <a className="col position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                            <img
                                src={activity[4].path}
                                className={`${styles["HP_activity-img"]}`}
                            ></img>
                            <span className={`${styles["HP_activity-img-name"]}`}>{activity[4].info}</span>
                        </a>
                        <a className="col position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                            <img
                                src={activity[5].path}
                                className={`${styles["HP_activity-img"]}`}
                            ></img>
                            <span className={`${styles["HP_activity-img-name"]}`}>{activity[5].info}</span>
                        </a>
                    </div>
                </div>
                <div className="col-6 d-md-none">
                    <a className="col position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                        <img
                            src={activity[4].path}
                            className={`${styles["HP_activity-img"]}`}
                        ></img>
                        <span className={`${styles["HP_activity-img-name"]}`}>{activity[4].info}</span>
                    </a>
                </div>
                <div className="col-6 d-md-none">
                    <a className="col position-relative" href="#" onClick={(e) => {e.preventDefault()}}>
                        <img
                            src={activity[5].path}
                            className={`${styles["HP_activity-img"]}`}
                        ></img>
                        <span className={`${styles["HP_activity-img-name"]}`}>{activity[5].info}</span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Activities

import styles from "./Mainpage.module.scss"

function Mainpage() {

    return (
        <>
            <div className={`${styles["MP-container"]}`}>
                <div className="row g-0">
                    <div className="col-12 col-sm-6 col-lg-3 overflow-hidden">
                        <a className={`${styles["MP-link"]}`} href="/Beach/Western/1/beaches/1">
                            <h2 className={`${styles["MP-text"]}`}>To Western Region</h2>
                            <img className={`${styles["MP-img"]}`} src="/images/Mainpage image (1).jpg"></img>
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 overflow-hidden">
                        <a className={`${styles["MP-link"]}`} href="/Beach/Northern/2/beaches/1">
                            <h2 className={`${styles["MP-text"]}`}>To Northern Region</h2>
                            <img className={`${styles["MP-img"]}`} src="/images/Mainpage image (2).jpg"></img>
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 overflow-hidden">
                        <a className={`${styles["MP-link"]}`} href="/Beach/Southern/3/beaches/1">
                            <h2 className={`${styles["MP-text"]}`}>To Southern Region</h2>
                            <img className={`${styles["MP-img"]}`} src="/images/Mainpage image (3).jpg"></img>
                        </a>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 overflow-hidden">
                        <a className={`${styles["MP-link"]}`} href="/Beach/Eastern/4/beaches/1">
                            <h2 className={`${styles["MP-text"]}`}>To Eastern Region</h2>
                            <img className={`${styles["MP-img"]}`} src="/images/Mainpage image (4).jpg"></img>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Mainpage;
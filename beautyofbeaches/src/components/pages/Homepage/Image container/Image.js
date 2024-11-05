import styles from './Image.module.scss'
import data from '../../../../api/api';

function Image() {
    return (
        <div className={`${styles['imageContainer']}`}>
            <div id="HP-img-carousel" className="carousel slide carousel-fade">
                <div className="carousel-inner position-relative">
                    {data.images.map((image, index) => (
                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                            <img src={image.path} className={`${styles['HP_image-img']}`}></img>
                        </div>
                    ))}
                    <button className={`${styles['HP_image-change']} position-absolute start-0 d-flex align-items-center ps-2`} type="button" data-bs-target="#HP-img-carousel" data-bs-slide="prev">
                        <i className="fa-solid fa-caret-left"></i>
                    </button>
                    <button className={`${styles['HP_image-change']} position-absolute end-0 d-flex align-items-center justify-content-end pe-4 pe-sm-5`} type="button" data-bs-target="#HP-img-carousel" data-bs-slide="next">
                        <i className="fa-solid fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Image;
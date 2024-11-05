import data from "../../../api/api";
import styles from "./Blog.module.scss"
import { useState, useEffect } from "react";

function Blog() {

    const [blogs, setBlogs] = useState([]);
    const [items, setItems] = useState(6);

    const handleLoadMore = () => {
        setItems(prevItems => prevItems + 6);
    };

    useEffect(() => {
        const extractedData = data.beaches.reduce((accumulator, beach) => {
            const extractedArray = [];
            for (let i = 0; i < beach.blog.length; i++) {
                extractedArray.push({
                    image: beach.gallery[i].path,
                    blogName: beach.blog[i].info,
                    blogContent: beach.blog[i].content,
                    blogPath: beach.blog[i].link,
                });
            }
            return accumulator.concat(extractedArray);
        }, []);
        setBlogs(extractedData);
    }, []);

    return (
        <>
            <div className="container mb-5 position-relative">
                <h1 className={`${styles["Blogtittle"]}`}>Blogs</h1>
                <div className="row g-xl-5 g-2 mt-3">
                    {blogs.slice(0, items).map((blog, index) => (
                        <div className={`${styles["blogContainer"]} col-md-6 col-xl-4`} style={{ animationDelay: `${index * 0.08}s` }}>
                            <a target="_blank" className={`${styles["blogLink"]}`} href={blog.blogPath}>
                                <img src={blog.image}></img>
                                <div>
                                    <h2>{blog.blogName}</h2>
                                    <p>{blog.blogContent}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                {items < blogs.length && (                  
                    <button className={`${styles["blogBtn"]}`} onClick={handleLoadMore}>
                        Loading More...
                    </button>
                )}
            </div>
        </>
    );
}

export default Blog;
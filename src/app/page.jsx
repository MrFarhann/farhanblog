import style from './page.module.css';
import {blogs} from "@/utils/data";
import BlogCard from "@/components/blogCard/BlogCard";

export default function Home(){
    return(
        <div className={style.container}>
            <h1 className={style.title}>وبلاگ برنامه نویسی</h1>
            <div className={style.wrapper}>
                {blogs.map((blog)=>(
                    <BlogCard key={blog.title} blog={blog}/>
                ))}
            </div>
        </div>
    )
}
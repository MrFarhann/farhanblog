import style from "./blogCard.module.css";
import Link from "next/link";
import Image from "next/image";
import {AiFillLike, AiOutlineLike} from "react-icons/ai";
function BlogCard({ blog: {title, desc, img, authorId} }){
    const isLike = true;
    return(
        <div className={style.container}>
            <div className={style.wrapper}>
                <Link href="/" className={style.imgContainer}>
                    <Image src={img} alt={title} width={350} height={350}/>
                </Link>
                <div className={style.blogData}>
                    <div className={style.left}>
                        <h3>{title}</h3>
                        <p>{desc.substring(0, 60)}...</p>
                        <span>
                            ایجاد شده توسط:
                            <span>{authorId}</span>
                        </span>
                    </div>
                    <div className={style.right}>
                        <div className={style.like}>
                            { isLike
                            ? (
                                <AiFillLike size={20}/>
                            )
                            : (
                                <AiOutlineLike size={20}/>
                            )}
                            <span>{12}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard;
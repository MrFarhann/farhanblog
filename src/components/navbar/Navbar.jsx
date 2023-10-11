"use client"
import style from "./navbar.module.css";
import Image from "next/image"
import {useState} from "react"
import {AiOutlineClose} from "react-icons/ai";
import Link from "next/link";

function Navbar(){
    const [showDropdown, setShowDropdown] = useState(false);

    const loggedIn = true;
    return(
        <div className={style.container} dir="ltr">
            <div className={style.wrapper}>
                <h2 className={style.left}>Farhan Blog</h2>
                <div className={style.right}>
                    {
                        loggedIn
                            ? (
                                <div className={style.profile}>
                                    <Image src="/person.jpg" onClick={()=>setShowDropdown(!showDropdown)} alt="" width={45} height={45}/>
                                    {showDropdown && (
                                        <div className={style.dropdown}>
                                            <AiOutlineClose className={style.closeIcon} onClick={()=>setShowDropdown(false)}/>
                                            <button className={style.logout}>خروج</button>
                                            <Link href="/create-post" className={style.create}>پست جدید</Link>
                                        </div>
                                    )}
                                </div>
                            )
                            : (
                                <>
                                    <button className={style.login}>ورود</button>
                                    <Link href="/register" className={style.register}>ثبت نام</Link>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
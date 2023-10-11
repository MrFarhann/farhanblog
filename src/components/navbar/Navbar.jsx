"use client"
import style from "./navbar.module.css";
import Image from "next/image"
import {useState} from "react"
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import Link from "next/link";

function Navbar(){
    const [showDropdown, setShowDropdown] = useState(false);

    const loggedIn = true;
    return(
        <div className={style.container} dir="ltr">
            <div className={style.wrapper}>
                <h2 className={style.logo}>Farhan Blog</h2>
                <div className={style.right}>
                    {
                        loggedIn
                            ? (
                                <div className={style.profile}>
                                    <span className={style.username}>Farhan</span>
                                    {showDropdown && (
                                        <div className={style.dropdown}>
                                            <AiOutlineClose className={style.closeIcon} size={28} onClick={()=>setShowDropdown(false)}/>
                                            <button className={style.logout}>خروج</button>
                                            <Link href="/create-post" className={style.create}>پست جدید</Link>
                                        </div>
                                    )}
                                    <AiOutlineMenu className={style.menu} size={28} onClick={()=>setShowDropdown(!showDropdown)}/>
                                </div>

                            )
                            : (
                                <div>
                                    <Link href="/login" className={style.login}>ورود</Link>
                                    <Link href="/register" className={style.register}>ثبت نام</Link>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
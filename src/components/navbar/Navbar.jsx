"use client"
import style from "./navbar.module.css";
import Image from "next/image"
import {useState} from "react"
import {AiOutlineClose, AiOutlineMenu} from "react-icons/ai";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";

function Navbar(){
    const [showDropdown, setShowDropdown] = useState(false);
    const {data: session} = useSession();


    function handleDropdown(){
        setShowDropdown(!showDropdown);
    }

    const loggedIn = false;
    return(
        <div className={style.container} dir="ltr">
            <div className={style.wrapper}>
                <h2 className={style.logo}>Farhan Blog</h2>
                <div className={style.right}>
                    <Link href="/" className={style.HP}>صفحه اصلی</Link>
                    {
                        session?.user
                            ? (
                                <div className={style.profile}>
                                    <span className={style.username}>Farhan</span>
                                    {showDropdown && (
                                        <div className={style.dropdown}>
                                            <AiOutlineClose className={style.closeIcon} size={28} onClick={()=>setShowDropdown(false)}/>

                                            <button
                                                className={style.logout}
                                                onClick={()=>{
                                                signOut();
                                                handleDropdown()
                                            }}>خروج</button>

                                            <Link href="/create-blog" className={style.create} onClick={handleDropdown}>پست جدید</Link>
                                        </div>
                                    )}
                                    <AiOutlineMenu className={style.menu} size={28} onClick={handleDropdown}/>
                                </div>

                            )
                            : (
                                <div>
                                    <Link href="/register" className={style.register}>ثبت نام</Link>
                                    <button className={style.login} onClick={()=>{signIn()}}>ورود</button>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;
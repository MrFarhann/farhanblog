'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import style from "./pageLogin.module.css";
import { signIn } from 'next-auth/react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false);
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password === '' || email === '') {
            toast.error("ایمیل و رمز خودرا وارد کنید")
            return
        }

        if (password.length < 6) {
            toast.error("رمز عبور باید حداقل 6 کاراکتر باشد")
            return
        }

        try {
            const res = await signIn('credentials', { email, password, redirect: false })

            if (res?.error == null) {
                router.push("/")
            } else {
                toast.error("هنگام ورود به سیستم خطایی رخ داد")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.container}>

            <div className={style.wrapper}>

                <h2>ورود</h2>

                <form onSubmit={handleSubmit}>

                    <div className={style.inputContainer}>
                        <input
                            type="email"
                            placeholder='ایمیل'
                            className={style.input}
                            onChange={(e) =>
                                setEmail(e.target.value)}
                        />
                    </div>

                    <div className={style.inputContainer}>
                        <input
                            type={show ? "text" : "password"}
                            placeholder='رمز عبور'
                            className={style.input}
                            onChange={
                            (e) =>
                                setPassword(e.target.value)}
                        />
                        {show
                            ? (
                                <AiOutlineEye className={style.eye} size={22} onClick={()=> setShow(!show)}/>
                            )
                            : (
                                <AiOutlineEyeInvisible className={style.eye} size={22} onClick={()=> setShow(!show)}/>
                            )}
                    </div>

                    <button className={style.submitButton}>ورود</button>

                    <Link className={style.loginNow} href='/register'>
                        حساب کاربری ندارید؟ ثبت نام کنید
                    </Link>


                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login;
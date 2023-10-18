'use client'

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from "./pageRegister.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (username === '' || email === '' || password === '') {
            toast.error("نام کاربری، ایمیل و رمز خودرا وارد کنید")
            return
        }

        if (password.length < 6) {
            toast.error("رمز عبور باید حداقل 6 کاراکتر باشد")
            return
        }

        try {
            const res = await fetch('http://localhost:3000/api/register', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({username, email, password})
            })

            console.log(await res.json())
            if (res.ok) {
                toast.success("کاربر با موفقیت ثبت شد")
                setTimeout(() => {
                    signIn()
                }, 1500)
                return
            } else {
                toast.error("هنگام ثبت نام خطایی رخ داد")
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.container}>

            <div className={style.wrapper}>

                <h2>ثبت نام</h2>

                <form onSubmit={handleSubmit}>

                    <div className={style.inputContainer}>
                        <input
                            type="text"
                            placeholder='نام کاربری'
                            className={style.input}
                            onChange={(e) => setUsername(e.target.value)}/>
                    </div>

                   <div className={style.inputContainer}>
                       <input
                           type="email"
                           placeholder='ایمیل'
                           className={style.input}
                           onChange={(e) => setEmail(e.target.value)}/>
                   </div>

                   <div className={style.inputContainer}>
                       <input
                           type={show ? "text" : "password"}
                           placeholder='رمز عبور'
                           className={style.input}
                           onChange={(e) => setPassword(e.target.value)}/>
                       {show
                           ? (
                               <AiOutlineEye className={style.eye} size={22} onClick={()=> setShow(!show)}/>
                           )
                           : (
                               <AiOutlineEyeInvisible className={style.eye} size={22} onClick={()=> setShow(!show)}/>
                           )}
                   </div>

                    <button className={style.submitButton}>ثبت نام</button>

                    <button className={style.registerNow} onClick={() => signIn()}>
                        حساب کاربری دارید؟ وارد شوید
                    </button>


                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Register;
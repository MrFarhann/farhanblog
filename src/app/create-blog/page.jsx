'use client'

import { useRouter } from 'next/navigation'
import React, {useEffect, useState} from 'react'
import { BsFillImageFill } from 'react-icons/bs'
import { BiError } from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSession } from 'next-auth/react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import style from "./pageCreateBlog.module.css";

const CreateBlog = () => {
    const CLOUD_NAME = 'dtiw5qeav';
    const UPLOAD_PRESET = 'farhanblog';

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("React");
    const [photo, setPhoto] = useState('');

    const { data: session, status } = useSession();
    const router = useRouter();

    // useEffect(()=>{
    //     localStorage.setItem("desc", desc);
    // }, [desc])

    // localStorage.getItem("desc")

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        return (
            <div className={style.accessDenied}>
                <div>
                    <span><BiError size={42}/></span>
                    <p>
                        شما دسترسی به صفحه را ندارید
                    </p>
                </div>
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!photo || !title || !category || !desc){
            toast.error("همه فیلدها الزامی است")
            return
        }

        try {
            const imageUrl = await uploadImage()

            const res = await fetch("http://localhost:3000/api/blog", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user?.accessToken}`
                },
                method: 'POST',
                body: JSON.stringify({title,desc,category,imageUrl,authorId: session?.user?._id})
            })

            if(!res.ok){
                throw new Error("خطایی رخ داد")
            }

            const blog = await res.json()

            router.push(`/blog/${blog?._id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async () => {
        if (!photo) return

        const formData = new FormData()

        formData.append("file", photo)
        formData.append("upload_preset", UPLOAD_PRESET)

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            })

            const data = await res.json()

            const imageUrl = data['secure_url']

            return imageUrl
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={style.container}>

            <div className={style.wrapper}>

                <h2>پست جدید</h2>

                <form onSubmit={handleSubmit}>

                    <input type="text" placeholder='عنوان' onChange={(e) => setTitle(e.target.value)} />

                    <ReactQuill theme="snow" value={desc} onChange={setDesc} placeholder="توضیحات" />

                    <div className={style.selectContainer}>
                        <span>دسته بندی:</span>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="React">React</option>
                            <option value="Next">Next</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="TypeScript">TypeScript</option>
                            <option value="CSS">CSS</option>
                            <option value="HTML">HTML</option>
                        </select>
                    </div>

                    <label htmlFor='image'>
                        آپلود تصویر
                        <BsFillImageFill/>
                    </label>

                    <input id='image' type="file" style={{ display: 'none' }} onChange={(e) => setPhoto(e.target.files[0])} />

                    <button className={style.createBlog}>پست کردن</button>

                </form>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateBlog;
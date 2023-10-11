import style from "./footer.module.css";
import Link from "next/link";
function Footer(){
    return(
        <footer className={style.footer}>
            <div className={style.wrapper}>
                <div className={style.col}>
                    <h2>درباره</h2>
                    <p>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد
                    </p>
                </div>
                <div className={style.col}>
                    <h2>شکبه های اجتماعی</h2>
                    <Link href="https://github.com/MrFarhann/">گیت هاب</Link>
                    <Link href="https://t.me/ImMrFarhan/">تلگرام</Link>
                    <Link href="https://www.linkedin.com/in/farhan-goodarzi-a4a264192/">لینکدین</Link>
                </div>
                <div className={style.col}>
                    <h2>تگ ها</h2>
                    <Link href="/">React JS</Link>
                    <Link href="/">Next JS</Link>
                    <Link href="/">JavaScript</Link>
                    <Link href="/">TypeScript</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
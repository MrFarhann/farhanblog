import './globals.css';
import localFont from 'next/font/local';
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Provider from "@/SessionProvider";

const samim = localFont({
  src: [
    {
      path: './Samim.ttf',
      weight: '400',
      style: 'normal'
    },
  ],
  variable: '--font-samim'
})

export const metadata = {
  title: 'Farhan Blog',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={samim.className}>
        <Provider>
          <div className="container">
            <div className="wrapper">
              <Navbar/>
              {children}
              <Footer/>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  )
}

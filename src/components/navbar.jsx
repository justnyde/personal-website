import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { RiMoonClearLine, RiSunLine } from "react-icons/ri"

export default function Navbar(){

    const [theme, setTheme] = useState(false)

    useEffect(() => {
        
        if (localStorage.getItem("theme")) {
            setTheme(true)
        } else {
            setTheme(false)
        }
        
    }, [])
    
    useEffect(() => {

        if (!theme && !localStorage.getItem("theme")) {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }

    }, [theme])

    return (<>
        <div className="flex justify-between items-center max-w-8xl mx-auto w-full sm:w-9/12 p-9">
            <div>
                <img src="/image/nyde.png" className="h-16 w-16 rounded-full"/>
            </div>
            <div className="flex items-center space-x-5">
                <Link to="/"><h1 className="text-base text-purple font-sans text-black dark:text-white">Home</h1></Link>
                <Link to="/blog"><h1 className="text-base text-purple font-sans text-black dark:text-white">Blog</h1></Link>
                <Link to="/projects"><h1 className="text-base text-purple font-sans text-black dark:text-white">Projects</h1></Link>
                <div onClick={() => {
                    if (theme == false) {
                        localStorage.setItem("theme", true)
                    } else {
                        localStorage.removeItem("theme")
                    }
                    setTheme(!theme)
                }} className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-800 flex justify-center items-center text-black dark:text-white">{(!theme) ? (<RiSunLine/>) : (<RiMoonClearLine/>)}</div>
            </div>
        </div>
    </>)

}

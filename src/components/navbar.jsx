import { Link } from "react-router-dom"

export default function Navbar(){

    return (<>
        <div className="flex justify-between items-center max-w-8xl mx-auto w-full sm:w-9/12 p-9">
            <div>
                <img src="/image/nyde.png" className="h-16 w-16 rounded-full"/>
            </div>
            <div className="flex items-center space-x-5">
                <Link to="/"><h1 className="text-base text-purple font-sans text-black dark:text-white">Home</h1></Link>
                <Link to="/blog"><h1 className="text-base text-purple font-sans text-black dark:text-white">Blog</h1></Link>
                <Link to="/projects"><h1 className="text-base text-purple font-sans text-black dark:text-white">Projects</h1></Link>
            </div>
        </div>
    </>)

}
import { Link } from "react-router-dom"
import { SiReact } from "react-icons/si"
import UserData from "../data/user.js"

export default function Footer(){

    return (
    <div align="center">
        <div className="w-9/12 space-y-6">
            <hr className="divider w-full"></hr>
            <div className="block space-y-4 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
                <h1 className="font-sans text-gray-900 dark:text-white text-base">Copyright © 2022</h1>
                <h1 className="font-sans text-gray-900 dark:text-white text-base flex gap-2 items-center">Made with <SiReact color="AQUA"/> React by <a href={`https://github.com/${UserData.github}`}>Just Nyde</a></h1>
            </div>
        </div>
        <br/>
    </div>)

}

import Projects from "../data/projects"
import { useState, useEffect } from "react"
import { TbHeartHandshake } from "react-icons/tb"
import { SiDiscord } from "react-icons/si"
import UserData from "../data/user.js"

export default function Project(){

    const [projects, setProjects] = useState(undefined)

    useEffect(() => {

        setProjects(Object.keys(Projects).map(s => Projects[s]))

    }, [Projects])

    return (
        <div className="mt-3 max-w-8xl w-11/12 sm:w-8/12 mx-auto">
            <title>Projects | Just Nyde</title>
            <h1 className="font-bold font-sans text-slate-900 dark:text-white text-4xl">Projects</h1>
            <br/>
            {(!projects) ? (<>
            </>) : ((projects.length == 0) ? (<></>) : (<>
                <div className="grid grid-cols-1 gap-4 grid-flow-row auto-rows-max px-3 sm:px-0 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                    {projects.map((data) => (
                        <a href={data.link}>
                            <div data-aos="fade-right" className="block h-full w-full p-4 bg-gray-200 dark:bg-slate-900 hover:bg-gray-400 dark:hover:bg-slate-800 transition rounded-md group">
                                <div className="w-full overflow-hidden h-32 rounded-lg border-2 border-solid border-slate-900 dark:border-white relative"><img className="transition w-full h-full rounded-lg group-hover:scale-125" src={data.thumbnail}/></div>
                                <br/>
                                <h1 className="text-black dark:text-white text-xl font-sans font-bold">{data.name}</h1>
                                <h1 className="text-gray-800 dark:text-gray-200 text-base font-sans">{data.description}</h1>
                            </div>
                        </a>
                    ))}
                </div>
            </>))}
            <br/><br/>

            <div className="flex items-center gap-4">
                <div className="p-4 rounded-full bg-rose-400 dark:bg-gray-800 hover:bg-rose-600-400 hover:border-red-900 border-2 border-solid border-red-600 transition">
                    <TbHeartHandshake className="text-black dark:text-white" size={"25px"}/>
                </div>
                <h1 className="text-2xl text-gray-900 dark:text-white font-bold font-sans">Work with me.</h1>
            </div>

            <br/>

            <a href={UserData.connections.discord.server}>
                <div className="block bg-gradient-to-r from-[#4C62EF] to-[#374ac2] w-full sm:w-4/12 p-5 rounded-lg group">
                    <div className="flex items-center gap-4 w-full">
                        <div className="w-16 h-16 flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-lg border-2 border-solid border-white"><SiDiscord className="group-hover:scale-125 transition" color="WHITE" size="25px"/></div>
                        <div>
                            <h1 className="font-sans text-white text-lg">Discord</h1>
                            <h1 className="font-sans text-gray-200 text-base">{UserData.connections.discord.name}</h1>
                        </div>
                    </div>
                </div>
            </a>

        </div>
    )

}

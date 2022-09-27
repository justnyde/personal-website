import Projects from "../data/projects"
import { useState, useEffect } from "react"

export default function Project(){

    const [projects, setProjects] = useState(undefined)

    useEffect(() => {

        //if (typeof Projects !== "object") return setProjects([]);

        setProjects(Object.keys(Projects).map(s => Projects[s]))

    }, [Projects])

    return (
        <div className="mt-3 max-w-8xl w-11/12 sm:w-8/12 mx-auto">
            <div className="font-bold font-sans text-slate-900 dark:text-white text-4xl">Projects</div>
            <br/>
            {(!projects) ? (<>
            </>) : ((projects.length == 0) ? (<></>) : (<>
                <div className="grid grid-cols-1 gap-4 grid-flow-row auto-rows-max px-3 sm:px-0 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
                    {projects.map((data) => (
                        <a href={data.link}>
                            <div data-aos="fade-right" className="block w-full p-4 bg-gray-200 dark:bg-slate-900 hover:bg-gray-400 dark:hover:bg-slate-800 transition rounded-md group">
                                <div className="w-full overflow-hidden h-32 rounded-lg border-2 border-solid border-slate-900 dark:border-white relative"><img className="transition w-full h-full rounded-lg group-hover:scale-125" src={data.thumbnail}/></div>
                                <br/>
                                <h1 className="text-black dark:text-white text-xl font-sans font-bold">{data.name}</h1>
                                <h1 className="text-gray-800 dark:text-gray-200 text-base font-sans">{data.description}</h1>
                            </div>
                        </a>
                    ))}
                </div>
            </>))}
        </div>
    )

}
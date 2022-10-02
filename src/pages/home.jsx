import { useEffect, useState } from "react"
import { BsSpotify, BsGithub } from "react-icons/bs"
import { SiTwitter, SiInstagram, SiYoutube, SiVisualstudiocode, SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss3, SiExpress, SiBootstrap, SiCodefactor, SiVercel } from "react-icons/si"
import { IoFlower } from "react-icons/io5"
import { ImStarFull } from "react-icons/im"
import { HiOutlineAcademicCap, HiAcademicCap, HiLink } from "react-icons/hi"
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import UserData from "../data/user.js"
import moment from "moment"
import "moment-duration-format"
import useSWR from "swr"

export default function Main(){

    const [user, setUser] = useState({})
    const [averageColor, setAverageColor] = useState(null)
    const [repos, setRepos] = useState(undefined)
    const fetchData = (url) => fetch(url).then(r => r.json())
    const {data, error} = useSWR('https://api.github.com/users/' + UserData.github + '/repos',fetchData,{refreshInterval:5000})

    useEffect(() => {

        setRepos(data)

    }, [data])

    useEffect(() => {

        const websocket = new WebSocket("wss://api.lanyard.rest/socket")
        
        websocket.onmessage = data => {
            var message = JSON.parse(data.data)
            if (message.op) { 
                if (message.op == 1) {
                    setInterval(() => {
                        websocket.send(JSON.stringify({ op: 3 }))
                    }, message.d.heartbeat_interval)
                    websocket.send(JSON.stringify({ op: 2,  d: {subscribe_to_ids: [UserData.userId]} }))
                }
            }
            if (message.t && (message.t == "INIT_STATE" || message.t == "PRESENCE_UPDATE")) {
                setUser((message.t == "PRESENCE_UPDATE") ? message.d : message.d[UserData.userId])
            }
        }

    }, [])

    return (<div className="mt-3 max-w-8xl w-11/12 sm:w-8/12 mx-auto">
        <title>Home | Just Nyde</title>
        <SkeletonTheme baseColor="rgba(0,0,0,0.40)">
        <div className="block sm:flex space-y-4 sm:space-y-0 items-center flex-row gap-4">
            <div className="relative shrink-0 w-48 h-48">
                <img src={`https://cdn.discordapp.com/avatars/${(user.discord_user) ? user.discord_user.id : "642752306441617417"}/${(user.discord_user) ? user.discord_user.avatar : "1"}.png?size=4096`} className={`h-48 w-48 rounded-full border-2 border-solid ${{idle: "bg-amber-400", dnd: "bg-rose-600", online: "bg-emerald-600", offline: "bg-gray-600"}[user.discord_status]} rounded-full border-4 border-solid ${{idle: "border-amber-500", dnd: "border-rose-600", online: "border-emerald-600", offline: "border-gray-600"}[user.discord_status]}`}/>
                {(user.discord_status) ? (<div className={`absolute transition bottom-2 right-2 p-5 ${{idle: "bg-amber-400", dnd: "bg-rose-600", online: "bg-emerald-600", offline: "bg-gray-600"}[user.discord_status]} rounded-full border-4 border-solid ${{idle: "border-amber-200", dnd: "border-rose-300", online: "border-emerald-300", offline: "border-gray-300"}[user.discord_status]}`}></div>) : (<></>)}
            </div>
            <div>
                <h1 className="text-gray-900 dark:text-white font-sans text-4xl font-bold">{(user.discord_user) ? user.discord_user.username : (<Skeleton height={"50px"} width={"25%"}/>)}</h1>
                <h1 className="mt-2 text-gray-700 dark:text-gray-400 font-sans text-lg">{(user.discord_user) ? UserData.description : (<Skeleton count={2}/>)}</h1>
            </div>
        </div>
        <br/><br/>
        <div className="relative w-full rounded-lg p-7" style={{backgroundImage: `linear-gradient(to right,#16a34a,#166534)`}}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                <BsSpotify size={"50px"} color="WHITE"/>
                <div>
                    <h1 className="font-sans text-lg font-bold text-white">Listening to Spotify</h1>
                    <h1 className="font-sans text-base font-semibold text-white">{(user.listening_to_spotify == true) ? user.spotify.song : ((user.listening_to_spotify == false) ? "I am not listening anything right now." : "Loading...")}</h1>
                </div>
                </div>
                <img src={(user.listening_to_spotify == true) ? user.spotify.album_art_url : ""} className="absolute w-48 h-full right-0 hidden opacity-40 blur-sm sm:block"/>
            </div>
        </div>
        {(user.activities && user.activities.find(s => s.type == 0)) ? (
            <>
                <br/>
                <div className="relative w-full rounded-lg p-7" style={{backgroundImage: `linear-gradient(to right,#000C18,#001830)`}}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                        <SiVisualstudiocode size={"50px"} color="WHITE"/>
                        <div>
                            <h1 className="font-sans text-lg font-bold text-white">{(user.activities.find(s => s.type == 0).assets.large_text)}</h1>
                            <h1 className="font-sans text-base font-semibold text-white">{(user.activities.find(s => s.type == 0).details)}</h1>
                        </div>
                        </div>
                        <img src={`https://cdn.discordapp.com/app-assets/383226320970055681/${user.activities.find(s => s.type == 0).assets.large_image}.png`} className="absolute w-48 h-full right-0 hidden opacity-60 blur-sm sm:block"/>
                    </div>
                </div>
            </>
        ) : (<></>)}

        <br/><br/>
    
        <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-gray-400 hover:bg-purple-400 hover:border-purple-700 dark:bg-gray-800 border-2 border-solid border-gray-500 dark:border-gray-900 transition">
                <SiCodefactor className="text-black dark:text-white" size={"25px"}/>
            </div>
            <h1 className="text-2xl text-gray-900 dark:text-white font-bold font-sans">Technologies I Use</h1>
        </div>
        <br/>
        <div className="block space-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:space-y-0" data-aos="fade-up">
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <SiReact size="25px" color="#61DBFB"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">React</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <SiNextdotjs size="25px" color="BLACK"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">Next.js</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <SiTailwindcss size="25px" color="#36B7F0"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">TailwindCSS</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <SiHtml5 size="25px" color="#FF4B00"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">HTML</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <SiCss3 size="25px" color="#264DE4"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">CSS</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <SiExpress size="25px" color="BLACK"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">Express.js</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <SiBootstrap size="25px" color="#8411F6"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">Bootstrap</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <SiVercel size="25px" color="BLACK"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">Vercel</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-gray-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <BsGithub size="25px" color="BLACK"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">Github</h1>
                </div>
            </div>
            <div className="py-4 px-6 w-full sm:w-48 font-sans text-base font-bold bg-gray-200 hover:bg-gray-300 border-2 border-solid border-gray-400 cursor-pointer hover:border-gray-600 dark:bg-slate-900 dark:border-slate-700 dark:hover:border-gray-900 rounded-lg transition">
                <div className="flex justify-between items-center w-full h-full">
                    <IoFlower size="25px" color="YELLOW"/>
                    <h1 className="font-sans text-gray-900 dark:text-white text-base">Daisy UI</h1>
                </div>
            </div>
        </div>

        <br/><br/>

        <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-gray-400 dark:bg-gray-800 hover:bg-purple-400 hover:border-purple-700 border-2 border-solid border-gray-500 dark:border-gray-900 transition">
                <BsGithub className="text-black dark:text-white" size={"25px"}/>
            </div>
            <h1 className="text-2xl text-gray-900 dark:text-white font-bold font-sans">Github Repositories</h1>
        </div>

        <br/>

        <div className="grid grid-cols-1 gap-4 grid-flow-row auto-rows-max px-3 sm:px-0 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
            {(!repos) ? (<div className="flex items-center gap-3"></div>) : ((repos.length == 0) ? (<></>) : (repos.map((data) => (
            <a href={data.html_url} target="_blank">
            <div data-aos="fade-right" className="block w-full p-4 bg-gray-200 dark:bg-slate-900 hover:bg-gray-400 dark:hover:bg-slate-800 transition rounded-md relative">
                <div className="absolute right-5 top-5 flex items-center gap-2">
                    <ImStarFull color="YELLOW" size="20px"/>
                    <h1 className="text-base text-gray-800 dark:text-gray-300">{data.stargazers_count || 0}</h1>
                </div>
                <div className="flex items-center gap-3">
                    <img className="w-16 h-16 rounded-md" src={data.owner.avatar_url}/>
                    <div>
                        <h1 className="font-bold font-sans text-lg text-black dark:text-white">{data.owner.login}</h1>
                        <h1 className="font-sans text-base text-black dark:text-white">{moment(data.created_at).fromNow()}</h1>
                    </div>
                </div>
                <br/>
                <h1 className="font-sans font-bold text-2xl text-black dark:text-white">{data.name}</h1>
                <h1 className="font-sans text-base text-gray-800 dark:text-gray-300">{data.description || "There is no description here."}</h1>
            </div>
            </a>
            ))))}
        </div>

        <br/><br/>

        <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-gray-400 dark:bg-gray-800 hover:bg-purple-400 hover:border-purple-700 border-2 border-solid border-gray-500 dark:border-gray-900 transition">
                <HiOutlineAcademicCap className="text-black dark:text-white" size={"25px"}/>
            </div>
            <h1 className="text-2xl text-gray-900 dark:text-white font-bold font-sans">Education</h1>
        </div>

        <br/>
        <div className="block sm:space-y-0 sm:flex sm:flex-wrap sm:justify-between sm:items-center w-full sm:gap-y-4">
            <div className="block relative w-full sm:w-6/12" data-aos="zoom-in">
                <div className="flex items-center space-x-5">
                    <div className="relative shrink-0 p-3">
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-slate-900 dark:text-white text-black font-sans rounded-md">1</div>
                        <div className="-rotate-45 h-9 w-9 absolute left-0 top-0"><HiAcademicCap size={"100%"} color="AQUA"/></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3"><h1 className="font-sans font-bold text-gray-900 dark:text-white text-lg sm:text-xl">{UserData.education.primary.name}</h1><div className="hidden sm:block px-3 py-1 font-sans text-blue-600 text-sm rounded-lg bg-gray-200 dark:bg-slate-900">Primary School</div></div>
                        <h1 className="font-sans text-base sm:text-lg text-gray-700 dark:text-gray-200">Location: {UserData.education.primary.location}</h1>
                    </div>
                </div>
            </div>
            <div className="block relative w-full sm:w-6/12" data-aos="zoom-in">
                <div className="flex items-center space-x-5">
                    <div className="relative shrink-0 p-3">
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-slate-900 dark:text-white text-black font-sans rounded-md">2</div>
                        <div className="-rotate-45 h-9 w-9 absolute left-0 top-0"><HiAcademicCap size={"100%"} color="AQUA"/></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3"><h1 className="font-sans font-bold text-gray-900 dark:text-white text-lg sm:text-xl">{UserData.education.secondary.name}</h1><div className="hidden sm:block px-3 py-1 font-sans text-blue-600 text-sm rounded-lg bg-gray-200 dark:bg-slate-900">Secondary School</div></div>
                        <h1 className="font-sans text-base sm:text-lg text-gray-700 dark:text-gray-200">Location: {UserData.education.secondary.location}</h1>
                    </div>
                </div>
            </div>
            <div className="block relative w-full sm:w-6/12" data-aos="zoom-in">
                <div className="flex items-center space-x-5">
                    <div className="relative shrink-0 p-3">
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-slate-900 dark:text-white text-black font-sans rounded-md">3</div>
                        <div className="-rotate-45 h-9 w-9 absolute left-0 top-0"><HiAcademicCap size={"100%"} color="AQUA"/></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3"><h1 className="font-sans font-bold text-gray-900 dark:text-white text-lg sm:text-xl">{UserData.education.high.name}</h1><div className="hidden sm:block px-3 py-1 font-sans text-blue-600 text-sm rounded-lg bg-gray-200 dark:bg-slate-900">High School</div></div>
                        <h1 className="font-sans text-base sm:text-lg text-gray-700 dark:text-gray-200">Location: {UserData.education.high.location}</h1>
                    </div>
                </div>
            </div>
            <div className="block relative w-full sm:w-6/12" data-aos="zoom-in">
                <div className="flex items-center space-x-5">
                    <div className="relative shrink-0 p-3">
                        <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-slate-900 dark:text-white text-black font-sans rounded-md">4</div>
                        <div className="-rotate-45 h-9 w-9 absolute left-0 top-0"><HiAcademicCap size={"100%"} color="AQUA"/></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-3"><h1 className="font-sans font-bold text-gray-900 dark:text-white text-lg sm:text-xl">{UserData.education.university.name}</h1><div className="hidden sm:block px-3 py-1 font-sans text-blue-600 text-sm rounded-lg bg-gray-200 dark:bg-slate-900">University</div></div>
                        <h1 className="font-sans text-base sm:text-lg text-gray-700 dark:text-gray-200">Location: {UserData.education.university.location}</h1>
                    </div>
                </div>
            </div>
        </div>
        
        <br/>

        <div className="flex items-center gap-4">
            <div className="p-4 rounded-full bg-gray-400 dark:bg-gray-800 hover:bg-purple-400 hover:border-purple-700 border-2 border-solid border-gray-500 dark:border-gray-900 transition">
                <HiLink className="text-black dark:text-white" size={"25px"}/>
            </div>
            <h1 className="text-2xl text-gray-900 dark:text-white font-bold font-sans">Connections</h1>
        </div>

        <br/>

        <div className="grid grid-cols-1 gap-4 grid-flow-row auto-rows-max px-3 sm:px-0 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
            <div data-aos="zoom-in" className="block bg-gradient-to-r from-[#FF0000] to-[#9c0101] hover:backdrop-blur-md w-full p-5 rounded-lg group">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-16 h-16 flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-lg border-2 border-solid border-white"><SiYoutube className="group-hover:scale-125 transition" color="WHITE" size="25px"/></div>
                    <div>
                        <h1 className="font-sans text-white text-lg">YouTube</h1>
                        <h1 className="font-sans text-gray-200 text-base">{UserData.connections.youtube}</h1>
                    </div>
                </div>
            </div>
            <div data-aos="zoom-in" className="block instagram hover:backdrop-blur-md w-full p-5 rounded-lg group">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-16 h-16 flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-lg border-2 border-solid border-white"><SiInstagram className="group-hover:scale-125 transition" color="WHITE" size="25px"/></div>
                    <div>
                        <h1 className="font-sans text-white text-lg">Instagram</h1>
                        <h1 className="font-sans text-gray-200 text-base">{UserData.connections.instagram}</h1>
                    </div>
                </div>
            </div>
            <div data-aos="zoom-in" className="block bg-gradient-to-r from-[#1DA1F2] to-[#02568a] hover:backdrop-blur-md w-full p-5 rounded-lg group">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-16 h-16 flex items-center justify-center bg-[rgba(0,0,0,0.40)] rounded-lg border-2 border-solid border-white"><SiTwitter className="group-hover:scale-125 transition" color="WHITE" size="25px"/></div>
                    <div>
                        <h1 className="font-sans text-white text-lg">Twitter</h1>
                        <h1 className="font-sans text-gray-200 text-base">{UserData.connections.twitter}</h1>
                    </div>
                </div>
            </div>
        </div>

        <br/><br/>

        </SkeletonTheme>


    </div>)
 
}

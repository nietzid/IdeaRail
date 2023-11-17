import React, { useState } from 'react'
import ProjectsLeft from './ProjectsLeft';
import ProjectsRight from './ProjectsRight';

export default function ProjectsLayout({Center, CenterRight, Navbar, HideMob}) {
    const [currentProject, setCurrentProject] = useState();
    return (
        <>
            <Navbar/>

        <div className="flex md:flex-row flex-col min-h-screen w-full mx-auto dark:bg-gray-800 h-screen">
                {/* Left Layout */}
                <div className={`w-full px-6 md:px-12 max-h-1/3 md:w-1/2 bg-white mx-auto md:order-1 dark:bg-gray-800 mt-1 `}>
                    <ProjectsLeft currentProject={currentProject} setCurrentProject={setCurrentProject}/>
                </div>
                {/* Right Layout */}
                <div className={`w-full px-6 md:px-12 max-h-2/3 md:w-1/2 bg-white mx-auto md:order-2 dark:bg-gray-800 mt-1 self-center hidden md:block`}>
                    <ProjectsRight currentProject={currentProject} setCurrentProject={setCurrentProject}/>
                </div>
        </div>
        </>
    )
}

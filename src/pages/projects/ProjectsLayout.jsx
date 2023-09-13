import React, { useState } from 'react'
import ProjectsLeft from './ProjectsLeft';
import ProjectsRight from './ProjectsRight';

export default function ProjectsLayout({Center, CenterRight, Navbar, HideMob}) {
    const [currentProject, setCurrentProject] = useState();
    return (
        <div className="container flex flex-col min-h-screen min-w-full mx-auto dark:bg-gray-800 max-h-screen">
            <Navbar/>
            <div className={`flex flex-col md:flex-row min-h-full min-w-screen p-0 m-0 dark:bg-gray-800 ${Center? 'md:my-auto' : ''}`}>
                {/* Left Layout */}
                <div className={`w-full px-6 md:px-12 max-h-1/3 md:w-1/2 bg-white md:h-full mx-auto md:order-1 dark:bg-gray-800 mt-1`}>
                    <ProjectsLeft currentProject={currentProject} setCurrentProject={setCurrentProject}/>
                </div>
                {/* Right Layout */}
                <div className={`w-full px-6 md:px-12 max-h-2/3 md:w-1/2 bg-white md:h-full mx-auto md:order-2 dark:bg-gray-800 mt-1 ${CenterRight? 'md:my-auto' : ''} ${HideMob? 'hidden md:block' : ''}`}>
                    <ProjectsRight currentProject={currentProject} setCurrentProject={setCurrentProject}/>
                </div>
            </div>
        </div>
    )
}

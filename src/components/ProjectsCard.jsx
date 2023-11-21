import React from 'react'

export default function ProjectsCard({title, description, progress}) {
    
    return (
        <div role='button' className="relative flex w-full h-36 md:h-40 flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border p-1 overflow-hidden">
            <div className="p-2 w-full md:p-6 flex flex-col overflow-hidden">
                <h1 className="block font-bold text-lg md:text-xl font-medium leading-relaxed text-blue-gray-900 antialiased ">
                    {title}
                </h1>
                <p className="block font-sans text-base font-normal leading-normal text-gray-900 antialiased opacity-75 line-clamp-2 md:whitespace-normal">
                    {description}
                </p>
                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div className="flex flex-col justify-center overflow-hidden bg-blue-500" role="progressbar" aria-valuenow={{progress}} aria-valuemin="0" aria-valuemax="100" style={{width: progress+"%"}}></div>
                </div>
                <p className="md:mb-3 font-normal text-lg text-gray-700 ">
                    {progress}%
                </p>
            </div>
        </div>
    )
}

import {EnvelopeIcon, PlusCircleIcon, PlusIcon} from '@heroicons/react/24/outline'
import React from 'react'
import ProjectsCard from '../../components/ProjectsCard'
import Modal from './Modal'

export default function ProjectsLeft() {
    return (
        <div className='p-1'>
            <div className='flex justify-between my-4'>
                <h1 className='text-4xl font-bold max-w-fit my-auto'>
                    Projects
                </h1>
                <button type="button" className="hidden md:inline-flex my-auto justify-end items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <PlusCircleIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true"/>
                    New Project
                </button>
                <button type="button" className="block md:hidden inline-flex justify-end items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <PlusCircleIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true"/>
                    New Project
                </button>
            </div>
            <div className='overflow-y-auto md:max-h-[45rem] no-scrollbar'>
                <ProjectsCard/>
                <ProjectsCard/>
                
            </div>
        </div>
    )
}

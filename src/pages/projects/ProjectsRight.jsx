import {ArrowRightIcon, ChevronRightIcon, PlusCircleIcon} from '@heroicons/react/24/outline'
import React from 'react'
import Modal from './Modal'

export default function ProjectsRight() {
    return (
        <div className='border shadow rounded-xl p-6 md:p-12 mx-auto my-auto'>
            <h1 className='text-4xl font-bold'>
                Judul Project
            </h1>
            <h1 className='text-3xl font-bold mt-8'>
                Spesific
            </h1>
            <p className='text-lg mt-2'>
                Spesific text, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus saepe numquam, quos laboriosam modi cumque, vel quaerat voluptate reprehenderit ut perspiciatis porro voluptatem deleniti tempore odio. Hic at odio laboriosam.
            </p>
            <h1 className='text-3xl font-bold mt-8'>
                Measurable
            </h1>
            <div className='flex col mt-2'>
                <p className='text-lg max-w-5/12 text-justify'>
                    Spesific text, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus saepe numquam, quos laboriosam modi
                </p>
                <ArrowRightIcon className='max-w-2/12 max-h-24 px-4 my-auto'/>
                <p className='text-lg max-w-5/12 text-justify'>
                    Spesific text, Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus saepe numquam, quos laboriosam modi
                </p>
            </div>
            <h1 className='text-3xl font-bold mt-8'>
                Timely
            </h1>
            <p className='text-lg mt-2'>
                2 Bulan
            </p>
            <h1 className='text-3xl font-bold mt-8'>
                Kalimat Challange
            </h1>
            <p className='text-lg mt-2'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit ab minus numquam, est cumque perspiciatis eius tenetur dolor odio laudantium. Recusandae doloremque aspernatur mollitia consequuntur sed atque distinctio fugit? Est.
            </p>
            <div className='flex justify-end mt-2'>
                <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Resume
                    <ChevronRightIcon className="-ml-1 ml-3 h-5 w-5" aria-hidden="true"/>
                </button>
            </div>
        </div>
    )
}

import {Progress} from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import Modal from '../pages/projects/Modal';

export default function ProjectsCard() {

    const [percentage, setPercentage] = useState(50);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(()=>{
        console.log(isOpen);
    },[isOpen])

    // const modals () => {

    // }
    const handleChange = (flag) => {
        setIsOpen(flag);        
    }


    return (
        <div onClick={()=>setIsOpen(true)} className="relative flex w-full h-25 md:h-40 flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border my-2 p-1 md:my-4 overflow-hidden">
            <div className="p-2 w-full md:p-6 flex-col overflow-hidden">
                <h1 className="block font-bold text-lg md:text-xl font-medium leading-relaxed text-blue-gray-900 antialiased ">
                    Judul Materi
                </h1>
                <p className="block font-sans text-sm font-normal leading-normal text-gray-900 antialiased opacity-75 truncate md:whitespace-normal">
                    Deskripsi Materi 2 lorem ipsum lorem ipsumlorem ipsum lorem ipsum
                </p>
                <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div className="flex flex-col justify-center overflow-hidden bg-blue-500" role="progressbar" aria-valuenow="{{percentage}}" aria-valuemin="0" aria-valuemax="100" style={{width: percentage+"%"}}></div>
                </div>
                <p className="md:mb-3 font-normal text-gray-700 ">
                    {percentage}%
                </p>
            </div>
            <Modal open={isOpen} setOpen={handleChange}/>
        </div>
    )
}

import {ArrowRightIcon, ChevronRightIcon, RocketLaunchIcon} from '@heroicons/react/24/outline'
import React, {useEffect, useState} from 'react'
import supabase from '../../Supabase';
import {Link} from 'react-router-dom';
import Lottie from "lottie-react";
import RocketAnimation from '../../assets/lottie/rocket.json';

export default function ProjectsRight({currentProject, setCurrentProject}) {
    const [projectsData, setProjectsData] = useState(null);

    useEffect(() => {
        if(currentProject != null)
            getProjects();
    }, [currentProject])

    async function getProjects() {
        await supabase.from('projects').select('*').eq('id', currentProject).then((res) => {
            console.log(res);
            if (res.error) 
                console.log(error);
             else 
                setProjectsData(res?.data[0]);
            
        });
    }

    if(currentProject != null){
        return (
            <>{console.log(projectsData)} 
            {
                projectsData?.progress != 0? 
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
                : 
                <div className='border shadow rounded-xl p-6 md:p-12 mx-auto my-auto'>
                    <Lottie animationData={RocketAnimation} loop={true} className='h-64 w-auto'/>
                    <h6 className="mb-4 text-xl font-bold text-center text-gray-800 md:text-3xl">
                        <p className="font-extra-bold">Project {projectsData?.title} belum dimulai!</p>
                    </h6>

                    <div className='flex justify-center mt-2'>
                        <Link to={`/sprint-one`} state={{ projectId: {currentProject} }}>
                        <button type="button" className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Mulai
                            <ChevronRightIcon className="-ml-1 ml-3 h-5 w-5" aria-hidden="true"/>
                        </button>
                        </Link>
                    </div>
                </div> 
            } </>
        )
    }else{
        return(
            <div className='border shadow rounded-xl p-6 md:p-12 mx-auto my-auto'>
                {/* <div >
                    <img class="rounded-t-lg max-h-60" src="img/projects_banner.png" alt="" />
                    <img class="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800" src="img/projects_banner.png" alt="image description"/>

                </div> */}
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Kamu belum memilih project!</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Pilih salah satu project yang sudah kamu buat untuk memulai</p>
            </div>
        )
    }
}

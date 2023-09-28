import {PlusCircleIcon} from '@heroicons/react/24/outline'
import React, {useEffect, useState} from 'react'
import ResponseCard from './Card'
import {useLocation} from 'react-router-dom'
import supabase from '../../Supabase';
import SprintForm from './SprintForm';
import Lottie from "lottie-react";
import EmptyAnimation from '../../assets/lottie/empty.json';
import {Typography} from '@material-tailwind/react';
// import { NotificationDialog } from '../layout/NotificationDialog'

export default function SprintOne() {

    let [sprintData, setSprintData] = useState(null);
    let [voteData, setVoteData] = useState(null);
    let [category, setCategory] = useState(null);
    let [isOpen, setIsOpen] = useState(false);

    const location = useLocation()
    let {projectId} = location.state
    projectId = projectId.currentProject ? projectId.currentProject : ReactSession.get("projectId");

    useEffect(() => {
        getSprintData();
        subscribeSprints();
        getVoteData();
        subscribeVote();
    }, [])

    async function getSprintData() {
        await supabase.from('sprint').select('*').eq('project_id', projectId).eq('sprint_id', 1).then((res) => {
            if (res.error) 
                console.log(res.error);
             else 
                setSprintData(res.data);
        })
    }

    const subscribeSprints = () => supabase.channel('sprint-one-channel').on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'sprint',
        filter: `project_id=eq.${projectId}`
    }, (payload) => {
        getSprintData()
    }).subscribe();

    async function getVoteData() {
        await supabase.from('votes').select('*').eq('project_id', projectId).then((res) => {
            if (res.error) 
                console.log(res.error);
             else 
                setVoteData(res.data);
        })
    }

    const subscribeVote = () => supabase.channel('votes-one-channel').on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'votes',
        filter: `project_id=eq.${projectId}`
    }, (payload) => {
        getVoteData();
    }).subscribe();

    function handleAdd(category) {
        setCategory(category);
        setIsOpen(true);
    }

    return (
        <>
            <header className="bg-white mx-4 md:mx-16 mt-4">
                <div className="mx-auto max-w-screen py-6">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sprint Kesatu</h1>
                    <p className="text-lg py-2 tracking-tight text-gray-900">Pada Sprint ini kamu harus menentukan ...</p>
                </div>
            </header>
            <main className='mx-4 md:mx-16'>
                <div className="mx-auto max-w-full mx-8 py-6 sm:px-6 lg:px-8 flex flex-col border-4 border-dashed rounded-3xl border-gray-200 mx-4 px-4">
                    <div className="flex flex-row rounded-lg max-h-24">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">Yuk Sampaikan Idemu!</h1>
                        <div className='max-h-full my-auto'>
                            <button type="button"
                                onClick={
                                    () => handleAdd('spesific')
                                }
                                className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Tambah
                                <PlusCircleIcon className="ml-2 -mr-0.5 h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 rounded-lg min-h-[320px] mt-4">
                        {
                        sprintData ?. filter((data) => {
                            return data.category == 'spesific'
                        }).length != 0 ? sprintData ?. map((data) => {
                            let votes=voteData?.filter(vote => {
                                return vote.sprint_id==data.id
                            });
                            return data.category == 'spesific' && 
                            <ResponseCard 
                                key={data.id}
                                data={data}
                                votes={votes}/>
                        }) : <div className='mx-auto'>
                            <Lottie animationData={EmptyAnimation}
                                loop={true}
                                className='h-64 w-auto '/>
                            <Typography as='h1' color='gray' className='text-2xl font-bold text-center'>Belum ada data</Typography>
                        </div>
                    } </div>
                </div>

                {/* <div className="mx-auto max-w-full mt-8 mx-8 py-6 sm:px-6 lg:px-8 flex flex-col border-4 border-dashed rounded-3xl border-gray-200 mx-4 px-4">
                    <div className="flex flex-row rounded-lg max-h-24">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">Tentukan Measurable!</h1>
                        <div className='max-h-full my-auto'>
                            <button type="button"
                                onClick={
                                    () => handleAdd('measurable')
                                }
                                className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Tambah
                                <PlusCircleIcon className="ml-2 -mr-0.5 h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row rounded-lg max-h-fit ml-0 overflow-x-scroll no-scrollbar min-h-[320px]">
                        {
                        sprintData ?. filter((data) => {
                            return data.category == 'measurable'
                        }).length != 0 ? sprintData ?. map((data) => {
                            let votes=voteData?.filter((vote)=>{
                                return vote.sprint_id==data.id
                            });
                            return data.category == 'measurable' && <ResponseCard 
                                key={data.id}
                                data={data}
                                votes={votes}
                                />
                        }) : <div className='mx-auto'>
                            <Lottie animationData={EmptyAnimation}
                                loop={true}
                                className='h-64 w-auto '/>
                            <Typography as='h1' color='gray' className='text-2xl font-bold text-center'>Belum ada data</Typography>
                        </div>
                    } </div>
                </div>

                <div className="mx-auto max-w-full mt-8 mx-8 py-6 sm:px-6 lg:px-8 flex flex-col border-4 border-dashed rounded-3xl border-gray-200 mx-4 px-4">
                    <div className="flex flex-row rounded-lg max-h-24">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">Tentukan Timely!</h1>
                        <div className='max-h-full my-auto'>
                            <button type="button"
                                onClick={
                                    () => handleAdd('timely')
                                }
                                className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Tambah
                                <PlusCircleIcon className="ml-2 -mr-0.5 h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row rounded-lg max-h-fit ml-0 overflow-x-scroll no-scrollbar min-h-[320px]">
                        {
                        sprintData ?. filter((data) => {
                            return data.category == 'timely'
                        }).length != 0 ? sprintData ?. map((data) => {
                            let votes=voteData?.filter((vote)=>{
                                return vote.sprint_id==data.id
                            }).length;
                            return data.category == 'timely' && <ResponseCard 
                                key={data.id}
                                data={data}
                                votes={votes}/>
                        }) : <div className='mx-auto'>
                            <Lottie animationData={EmptyAnimation}
                                loop={true}
                                className='h-64 w-auto '/>
                            <Typography as='h1' color='gray' className='text-2xl font-bold text-center'>Belum ada data</Typography>
                        </div>
                    } </div>
                </div>

                <div className="mx-auto max-w-full mt-8 mx-8 py-6 sm:px-6 lg:px-8 flex flex-col border-4 border-dashed rounded-3xl border-gray-200 mx-4 px-4">
                    <div className="flex flex-row rounded-lg max-h-24">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">Tentukan Challange!</h1>
                        <div className='max-h-full my-auto'>
                            <button type="button"
                                onClick={
                                    () => handleAdd('challange')
                                }
                                className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Tambah
                                <PlusCircleIcon className="ml-2 -mr-0.5 h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row rounded-lg max-h-fit ml-0 overflow-x-scroll no-scrollbar min-h-[320px]">
                        {
                        sprintData ?. filter((data) => {
                            return data.category == 'challange'
                        }).length != 0 ? sprintData ?. map((data) => {
                            let votes=voteData?.filter((vote)=>{
                                return vote.sprint_id==data.id
                            });
                            return data.category == 'challange' && <ResponseCard 
                                key={data.id}
                                data={data}
                                votes={votes}/>
                        }) : <div className='mx-auto'>
                            <Lottie animationData={EmptyAnimation}
                                loop={true}
                                className='h-64 w-auto '/>
                            <Typography as='h1' color='gray' className='text-2xl font-bold text-center'>Belum ada data</Typography>
                        </div>
                    } </div>
                </div> */}
            </main>
            <SprintForm isOpen={isOpen}
                setIsOpen={setIsOpen}
                category={category}
                projectId={projectId}
                sprintId={1}/>
        </>
    )
}

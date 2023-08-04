import { PlusCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import ResponseCard from '../sprintone/Card'

export default function SprintFour() {
  return (
    <>
            <header className="bg-white">
                <div className="mx-auto max-w-screen py-6 mx-4 md:mx-16">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sprint Keempat</h1>
                    <p className="text-lg py-2 tracking-tight text-gray-900">Pada Sprint ini kamu harus menentukan ...</p>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-full mx-8 py-6 sm:px-6 lg:px-8 flex flex-col border-4 border-dashed rounded-3xl border-gray-200 mx-4 md:mx-16 px-4">
                    <div className="flex flex-row rounded-lg max-h-24">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">Sampaikan List Gain Dari Hasil Wawancara!</h1>
                        <div className='max-h-full my-auto'>
                            <button type="button" className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Tambah
                                <PlusCircleIcon className="ml-2 -mr-0.5 h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row rounded-lg max-h-fit ml-0 overflow-x-scroll no-scrollbar min-h-[320px]">
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                    </div>
                </div>


                <div className="mx-auto max-w-full mx-8 py-6 sm:px-6 lg:px-8 flex flex-col border-4 border-dashed rounded-3xl border-gray-200 mx-4 md:mx-16 px-4 mt-4 md:mt-8">
                    <div className="flex flex-row rounded-lg max-h-24">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 my-auto">Sampaikan List Pain Dari Hasil Wawancara!</h1>
                        <div className='max-h-full my-auto'>
                            <button type="button" className="ml-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Tambah
                                <PlusCircleIcon className="ml-2 -mr-0.5 h-6 w-6" aria-hidden="true"/>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row rounded-lg max-h-fit ml-0 overflow-x-scroll no-scrollbar min-h-[320px]">
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                        <ResponseCard/>
                    </div>
                </div>            
            </main>
        </>
  )
}

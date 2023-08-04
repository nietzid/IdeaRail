import React from 'react'

export default function SprintSix() {
    return (
        <div className="flex flex-col h-screen">
            <header className="bg-white mx-4">
                <div className="mx-auto max-w-screen py-6 mx-4 md:mx-16">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sprint Keenam</h1>
                    <p className="text-lg py-2 tracking-tight text-gray-900">Pada Sprint ini kamu harus menentukan ...</p>
                </div>
            </header>
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-1/2">
                <div className="flex flex-col w-full md:w-auto md:border-b-2 border-black flex items-center justify-center h-full p-4">
                    <h1 className='text-xl items-left mb-2 font-bold'>
                        Arfiansyah Sucitra
                    </h1>
                    <div className='flex flex-row'>
                        <div className='border border-black border-1 p-2'>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                        <div className='border border-black border-1 p-2'>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div className='border border-black border-1 p-2'>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                        <div className='border border-black border-1 p-2'>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-auto md:border-l-2 md:border-b-2 border-black flex items-center justify-center h-full p-4">
                    <div className='flex flex-row'>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 h-1/2 ">
                <div className="flex flex-col w-full md:w-auto flex items-center justify-center h-full p-4">
                    <div className='flex flex-row'>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-auto md:border-l-2 border-black flex items-center justify-center h-full p-4">
                    <div className='flex flex-row'>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                    </div>
                    <div className='flex flex-row'>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                        <div>
                            <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import ResourceCard from '../../components/ResourceCard'

export default function ResourceLeft() {
    return (
        <>
            <div>
                <h1 className='text-left text-4xl font-bold mt-6 mb-0 md:ml-1'>
                    Resources
                </h1>
                <p className='my-2 text-left text-lg md:ml-1'>
                    Berikut merupakan video pembelajaran untuk membantu kamu memahami materi!
                </p>
            </div>
            <div className='overflow-y-auto md:max-h-[45rem] p-0 my-2 md:m-0 no-scrollbar'>
                <ResourceCard/>
                <ResourceCard/>
                <ResourceCard/>
                <ResourceCard/>
                <ResourceCard/>
                <ResourceCard/>
                <ResourceCard/>
                <ResourceCard/>
            </div>
        </>
    )
}

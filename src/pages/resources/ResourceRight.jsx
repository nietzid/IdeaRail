import React from 'react'
import ResourceCard from '../../components/ResourceCard'

export default function ResourceRight() {
    return (
        <>

            <div className=' max-h-[20rem] md:max-h-[45rem] overflow-y-auto no-scrollbar mt-12'>
                <div class="aspect-w-16 aspect-h-9">
                    <iframe className='rounded-xl' src="https://www.youtube.com/embed/b3ootXSAaqE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <h1 class="font-bold text-4xl leading-relaxed text-blue-gray-900 mx-1 my-4">
                    Judul Materi
                </h1>
                <p class="block font-sans text-md font-normal leading-normal text-black antialiased m-2">
                    Deskripsi Materi 2
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                    <br/>lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum
                </p>
            </div>
        </>
    )
}

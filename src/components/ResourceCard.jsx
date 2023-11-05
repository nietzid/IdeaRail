import React from 'react'

export default function ResourceCard() {
    return (
        <div class="relative flex w-full h-20 md:h-40 flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md border mt-2 p-1 md:my-4 overflow-hidden">
            <div class="p-2 md:p-6 flex-col overflow-hidden w-9/12">
                <h1 class="block font-sans text-lg md:text-xl font-medium leading-relaxed text-blue-gray-900 antialiased ">
                    Judul Materi
                </h1>
                <p class="block font-sans text-sm font-normal leading-normal text-gray-900 antialiased opacity-75 truncate md:whitespace-normal">
                    Deskripsi 
                </p>
            </div>
            <div class="overflow-hidden rounded-xl bg-white bg-clip-border w-3/12 m-2 md:m-4">
                <img src="https://picsum.photos/500/200" class="h-full w-full object-cover"/>
            </div>
        </div>
    )
}

import React from 'react'

export default function LeftAndRightLayout({Navbar, LeftLayout, RightLayout}) {
    return (
        <div className="container flex flex-col max-h-screen min-w-full mx-auto">
                <Navbar/>
            <div className="flex flex-col md:flex-row h-screen">
                {/* Left Layout */}
                <div className="w-full h-1/3 md:w-1/2 bg-gray-200 md:h-full md:order-1">
                    <LeftLayout/>
                </div>

                {/* Right Layout */}
                <div className="w-full h-2/3 md:w-1/2 bg-gray-300 md:h-full md:order-2">
                    <RightLayout/>
                </div>
            </div>
        </div>
    )
}

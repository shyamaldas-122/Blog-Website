import React from 'react'
import {Link} from 'react-router-dom'
import img1 from './Images/img1.png'

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl pt-20">
            <aside className="relative text-black rounded-lg  mx-2 sm:py-10">
                <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-3 lg:px-4">
                    <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
                        <h2 className="text-4xl font-bold sm:text-5xl mr-2 text-blue-500">
                            Welcome To Our Blog
                            <span className="hidden sm:block text-sm my-2 font-normal text-left ml-20 mt-3 text-black">Start your blog today and join a community of writers and readers who are passionate about sharing their stories and ideas. We offer everything you need to get started, from helpful tips and tutorials.</span>
                        </h2>
                        
                        <Link
                            className="inline-flex text-white float-left text-center ml-56 items-center px-6 py-3 font-medium bg-red-600 rounded-lg hover:opacity-75 transition ease-in-out delay-150 -translate-y-1 scale-110"
                            to="/login"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>

                            &nbsp; Login to read blogs
                        </Link>
                    </div>
                </div>

                <div className="absolute inset-0 w-full h-full " style={{marginTop:"-20px"}}>
                    {/* <img className="w-96" src={img1} alt="image1" /> */}
                    <img style={{width:"40%"}} src={img1} alt="image1" />
                </div>
            </aside>

            <div className="grid  place-items-center sm:mt-20">
            </div>

        </div>
        
        
    );
}

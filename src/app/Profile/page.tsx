"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";
import Link from "next/link";

export default  function Profile(){
    const router = useRouter()
    const [data, setdata] = useState("nothing")

    const logout = ()=>{
       try {
           axios.get('api/users/logout',{
             withCredentials:true,
         })
         toast.success("Logout successful");
         router.push('/login')
       } catch (error:any) {
         return NextResponse.json(
             {error:error.message},
             {status:500});
       }
    }

    const getUserDetails =async ()=>{
        try {
            const res = await axios.get('/api/users/me',{
                withCredentials:true,
            })
            console.log(res.data)
            setdata(res.data.data._id)
            router.push(`/Profile/${res.data.data._id}`)

        } catch (error:any) {
            return NextResponse.json(
                {error:error.message},
                {status:500});
        }
    }
    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/Profile/${data}`}>{data}
            </Link>}</h2>

            <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Logout
            </button>

            <button 
            onClick={getUserDetails}
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                Who AM I?
            </button>
        </div>
        
    )
}
"use client"

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { NextResponse } from "next/server";

export default function Profile(){
    const router = useRouter()

    const logout =()=>{
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

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-20"
            >Profile Page</h1>

            <hr />

            <button 
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <a href="/api/users/logout">Logout</a>
            </button>
        </div>
        
    )
}
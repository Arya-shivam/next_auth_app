
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

//fucntion to find username from params.userId


export default async function UserProfile(props: any) {
    const { params }=await props;
    const user = await User.findOne({_id:params.userId}).select("-password");
    const userName = user.username;

    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-screen py-2">
            <p className="text-4xl mb-10">Profile :
            <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
                {userName}
            </span>
            </p>

        </div>
    )
}
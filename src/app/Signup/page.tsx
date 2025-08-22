"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

export default function Signup() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setloading] = useState(false)
  const [buttonDisabled, setbuttonDisabled] = useState(false)

  // if user changes email or password or username, then button should be enabled
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setbuttonDisabled(false)
    }else{
      setbuttonDisabled(true)
    }
  }, [user])
  


  const onSignUp = async () => {
    try {
      setloading(true)
      const response = await axios.post("/api/users/signup", user) // (path to signup fucntion in api , route )
      toast.success("User created successfully")
      router.push("/login")
      console.log(response)
    } catch (error:any) {
      console.log("Signup error:", error)
      toast.error(error.response?.data?.error || error.message || "Something went wrong")
    }
    finally{
      setloading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-light text-white mb-8">SIGN UP</h1>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSignUp(); }}>
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full px-4 py-3 bg-black border rounded-2xl border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 bg-black border rounded-2xl border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 bg-black border rounded-2xl border-gray-400 text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />

          <button
            type="submit"
            disabled={buttonDisabled}
            className=" w-full py-3 mt-6 rounded-4xl font-bold bg-white text-black border bor der-gray-400  hover:bg-gray-200 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center">
          <Link href="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
            Already have an account?
          </Link>
        </div>
      </div>
    </div>
  );
}

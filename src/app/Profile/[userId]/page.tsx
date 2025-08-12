export default function UserProfile({params}:any){
    return(
        <div>
            <h1 className="text-3xl font-bold text-center mt-20"
            >User <span className="p-2 rounded bg-orange-500 text-white ml-2">{params.userId}</span></h1>
        </div>
    )
}
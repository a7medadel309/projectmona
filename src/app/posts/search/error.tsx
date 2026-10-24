"use client"
import  Link  from 'next/link';
interface ErrorProps {
    error: Error;
    reset: () => void;
}


const error = ({error , reset}: ErrorProps) => {
    return (
        <>
            <h1>error</h1>
            <p>{error?.message}</p>
            <button className="btn btn-primary" onClick={()=>reset()}>Try again</button>
            <Link href={"/"} >
                Go back home
            </Link>
        </>
    )
}

export default error

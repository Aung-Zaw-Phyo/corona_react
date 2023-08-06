import React, { Suspense } from "react";
import { Await, defer, json, useAsyncError, useLoaderData } from "react-router-dom";
import Info from "../components/profile/Info";
import { getToken } from "../utils/auth";

const ComponentError = () => {
    const error = useAsyncError()
    console.log(error)
    const message = error.message || 'Something wrong!' 
    return <p className="text-center py-6 text-[red]">{message}</p>
}

const Profile = () => {
    const loadedData = useLoaderData()
    return (
        <Suspense fallback={<p className="py-6 text-center">Loading ... </p>}>
            <Await resolve={loadedData.profile} errorElement={<ComponentError/>}>
                {(data) => <Info data={data.data} />}
            </Await>
        </Suspense>
    );
};

export default Profile;

const profileLoader = async () => {
    const response = await fetch('http://localhost:8000/api/profile', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })

    if(response.status === 401) {
        const resData = await response.json()
        throw resData
    }

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = await response.json()
    return resData
}

export const loader = () => {
    return defer({
        profile: profileLoader()
    })
}

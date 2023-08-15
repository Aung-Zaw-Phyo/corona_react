import React, { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import Info from "../components/profile/Info";
import { getToken } from "../utils/auth";
import ComponentError from "../components/UI/ComponentError";
import ComponentLoading from "../components/UI/ComponentLoading";

const Profile = () => {
    const loadedData = useLoaderData()
    return (
        <Suspense fallback={<ComponentLoading/>}>
            <Await resolve={loadedData.profile} errorElement={<ComponentError/>}>
                {(data) => <Info data={data.data} />}
            </Await>
        </Suspense>
    );
};

export default Profile;

export const action = async ({request, params}) => {
    const formData = await request.formData()

    const response = await fetch('http://localhost:8000/api/profile/update', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: formData
    })

    if(response.status === 422) {
        const resData = await response.json()
        return resData
    }

    if(!response.ok) {
        throw json({message: 'Something wrong.'}, {status: 500})
    }

    const resData = await response.json()

    return resData;
}

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

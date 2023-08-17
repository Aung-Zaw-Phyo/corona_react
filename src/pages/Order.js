import React, { Suspense } from "react";
import { getToken } from "../utils/auth";
import { Await, defer, json, useFetcher, useLoaderData } from "react-router-dom";
import OrderList from "../components/order/OrderList";
import ComponentLoading from "../components/UI/ComponentLoading";
import ComponentError from "../components/UI/ComponentError";

const Order = () => {
    const fetcher = useFetcher()
    const loadedData = useLoaderData()
    const resolveData = fetcher.data && fetcher.data.order ? fetcher.data.order : loadedData.order
    return (
        <Suspense fallback={<ComponentLoading/>}>
            <Await resolve={resolveData} errorElement={<ComponentError/>}>
                {(data) => <OrderList data={data} fetcher={fetcher}/>}
            </Await>
        </Suspense>
    );
};

export default Order;

const orderLoader = async (request) => {
    let url = 'http://localhost:8000/api/order'
    const paginateLink = request.url.split('link=')[1]
    if (paginateLink) {
        url = paginateLink
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
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

export const loader = ({request, params}) => {
    return defer({
        order: orderLoader(request)
    })
}
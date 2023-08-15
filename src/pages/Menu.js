import React, { Suspense } from "react";
import { getToken } from "../utils/auth";
import { Await, defer, json, useFetcher, useLoaderData } from "react-router-dom";
import MenuList from "../components/menu/MenuList";
import ComponentLoading from "../components/UI/ComponentLoading";
import ComponentError from "../components/UI/ComponentError";

const Menu = () => {
    const fetcher = useFetcher()
    const loadedData = useLoaderData()
    const resolveData = fetcher.data && fetcher.data.menu ? fetcher.data.menu : loadedData.menu
    return (
      <Suspense fallback={<ComponentLoading/>}>
        <Await resolve={resolveData} errorElement={<ComponentError/>}>
          {(data) => <MenuList data={data} fetcher={fetcher}/>}
        </Await>
      </Suspense>
    )
};

export default Menu;


const menuLoader = async (request) => {
  let url = 'http://localhost:8000/api/product'
  const paginateLink = request.url.split('link=')[1]
  if (paginateLink) {
      url = paginateLink
  }
  const response = await fetch(url, {
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

export const loader = ({request, params}) => {
  return defer({
    menu: menuLoader(request)
  })
}
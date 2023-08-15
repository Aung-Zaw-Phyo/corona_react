import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { useFetcher } from "react-router-dom";
import ComponentLoading from "../UI/ComponentLoading";
import Input from "../UI/Input";

const MenuList = (props) => {
    const [searchInput, setSearchInput] = useState('');
    const products = props.data.data
    const categories = props.data.categories
    const next = props.data.links.next
    const prev = props.data.links.prev

    const loadHandler = (link) => {
      props.fetcher.load(`/menu?index&link=${link}`)
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const searchInputChangeHandler = (event) => {
      if (event.key === 'Enter') {
        searchRequest()
      } else {
        setSearchInput((prev) => event.target.value)
      }
    }

    const searchRequest = () => {
      if(searchInput.trim() === '') {
        return
      }
      loadHandler(`http://localhost:8000/api/product?search=${searchInput}`)
    }

    const categoryFilterRequest = (link) => {
      setSearchInput('')
      loadHandler(link)
    }

    return (
        <div className="container py-16">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <div className="mb-3">
                <button onClick={categoryFilterRequest.bind(null, 'http://localhost:8000/api/product')} className="outline_btn">All</button>
                {
                  categories.map(category => (
                      <button onClick={categoryFilterRequest.bind(null, `http://localhost:8000/api/product?category=${category.id}`)} 
                        className="outline_btn" key={category.id}>
                          {category.name}
                      </button>
                  ))
                }
              </div>
              <div className="flex mb-3">
                <input className=" block rounded w-full outline-none border-[1px] border-r-0 border-[#ffbe33] h-[42px] p-2 focus:border-[#ffbe33] duration-300"
                  placeholder="Search menu"
                  value={searchInput}
                  onChange={searchInputChangeHandler}
                  onKeyDown={searchInputChangeHandler}
                />
                <button className="w-auto ml-[-5px] rounded-s-none"
                  onClick={searchRequest}  
                >
                  Search
                </button>
              </div>
            </div>
            {props.fetcher.state === 'loading' && <ComponentLoading/>}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                  products.map(product => (
                    <MenuItem key={product.id} product={product} />
                  ))
                }
            </div>

            <div className="text-center mt-6">
              {
                prev && 
                <button onClick={loadHandler.bind(null, prev)} className="outline_btn">Prev</button>
              }
              {
                next && 
                <button onClick={loadHandler.bind(null, next)} className="outline_btn">Next</button>
              }
            </div>
        </div>
      );
};

export default MenuList;

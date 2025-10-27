import React, { useState } from "react"
import searchIcon from "@/assets/icons/search.png" // adjust the path if needed

export default function SearchBar({ placeholder = "Search...", onChange, value, onSearch }) {


  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(value.trim())
  }

  return (
    <form
      onSubmit={handleSubmit}
      // className="flex items-center w-[510px] py-3 px-4 bg-white shadow-sm dark:bg-gray-800 border border-[Filters] rounded-[8px]"
        className="flex items-center w-[510px] py-3 px-4 bg-gray-500/30 shadow-sm border border-gray-600 rounded-[8px]"
    >
      <button
        type="submit"
        className="flex items-center justify-center focus:outline-none"
      >
        <img
          src={searchIcon}
          alt="Search"
          className="w-5 h-5 opacity-70 hover:opacity-90 transition-opacity duration-150"
        />
      </button>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full ml-[10px] bg-transparent text-gray-100 text-sm focus:outline-none"
      />
      
    </form>
  )
}


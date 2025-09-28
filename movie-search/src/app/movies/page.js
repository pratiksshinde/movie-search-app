"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import axiosInstance from "../api/axios";
import Image from "next/image";
export default function MoviesPage() {
const [query, setQuery] = useState('');
const [movies, setMovies] = useState([]);

useEffect(() => {
    // fetch initial data (first page of all shows)
    handleSearch();
}, []);

const handleSearch = async () => {
    try{
        let response;
    if (!query.trim()) {
      // no query → fetch first page of all shows
      response = await axiosInstance.get('/shows', { params: { page: 0 } });
    } else {
      // search query
      response = await axiosInstance.get('/search/shows', { params: { q: query } });
      // for search, response is array of {score, show}
      response = response.map(item => item.show);
    }
    console.log('Fetched shows:', response);
    const mapped = response.map(s => ({
      id: s.id,
        image: s.image,
      name: s.name,
      language: s.language || 'N/A',
      premiered: s.premiered || 'N/A',
      rating: s.rating?.average ?? 'N/A',
    }));

        setMovies(mapped);
    }catch(error){
        console.error('Error fetching movies:', error);
        setMovies([]);
    }
}

const columns = [
     { 
    name: 'Poster',
    sortable: false,
    cell: row =>
      row.image?.medium ? (
        <Image
          src={row.image.medium}
          alt={row.name}
          width={50}   // specify width
          height={75}  // specify height
          className="rounded"
        />
      ) : (
        'N/A'
      ),
  },
    { name: 'Title', selector: row => row.name, sortable: true },
    { name: 'Language', selector: row => row.language, sortable: true },
    { name: 'Premiered', selector: row => row.premiered, sortable: true },
    { name: 'Rating', selector: row => row.rating, sortable: true},
];



    return (
    <div className="p-6 mx-[14vw]">
      <h1 className="text-2xl font-bold mb-4">Movies Page</h1>

      <div className="flex flex-col w-full max-w-3xl items-center justify-center px-4 py-10 gap-4">
  <div className="flex w-full h-16 rounded-lg overflow-hidden mb-4">
    <Input
  type="text"
  placeholder="Search movies..."
  className="flex-1 h-16 text-lg px-4 py-2"  // override height & padding
  value={query}
  onChange={e => setQuery(e.target.value)}
/>

    <Button
  type="button"
  variant="outline"
  size="lg"          // large button
  className="px-6"   // extra horizontal padding if needed
  onClick={handleSearch}
>
  Search
</Button>
  </div>
  <DataTable
    title="Movies List"
    columns={columns}
    data={movies}
    pagination
    className="w-full"
  />
</div>

    </div>
  );
}

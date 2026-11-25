import React, { useEffect, useState } from 'react'
import './App.css'
import { getCountries } from './api/countries'
import type { Country } from './types/country'
import { CountryCard } from './components/CountryCard'
import { PagesButton } from './components/PagesButton'

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [query, setQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const filteredList = countries.filter((country) => 
    country.names.common.toLowerCase().includes(query.toLowerCase()))

  const pagesNumber = Math.ceil(filteredList.length / 12)
  const pagesNumbers = Array.from({length: pagesNumber}, (_, index) => index + 1)

  
  async function loadCountries() {
    setIsLoading(true)
    setErrorMessage(null)

    try{
      const loadedCountries = await getCountries()
      setCountries(loadedCountries)
    } catch (error) {
        setErrorMessage("Could not load countries. Check your connection and try again")
    } finally {
        setIsLoading(false)
       }
    }


  useEffect(() => {
      loadCountries()
  },[])

  if(isLoading) {
    return <p>Loading countries...</p>
  }

  if(errorMessage) {
    return (
      <div role='alert'>
        <p>{errorMessage}</p>
        <button onClick={loadCountries}>Try again</button>
      </div>
    )
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
    setCurrentPage(1)
  }

  return (
    <div className='px-4 sm:px-6 max-w-6xl mx-auto flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <h1 className="text-7xl font-extrabold font-stretch-extra-condensed mt-6 text-paper">Countries</h1>
        <p className='text-subtitle max-w-[46ch]'>Every country and territory, with it's flag, capital, region and population.</p>
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='search-input' className='text-paper font-extrabold'>Search by name</label>
        <input 
          id="search-input"
          type='search'
          placeholder='Romania, Japan, Peru...'
          className=' bg-paper rounded-xs text-xs py-3 px-4 w-full' 
          value={query}
          onChange={handleSearchChange}
        />
      </div>
      
      
      <div >
        <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
          {filteredList.slice((currentPage - 1) * 12, currentPage * 12).map((country, index) => (
            <li 
              key={country.names.common}
              className={`bg-paper p-1.5 text-ink aspect-3/4 ${index % 2 === 0 ? "-rotate-1" : "rotate-1"}`}
            >
              <CountryCard country={country}></CountryCard>
            </li>
          ))}
      </ul>
      </div>
      <div className='flex flex-wrap gap-2'>
        {pagesNumbers.map((number) => (
          <PagesButton key={number} number={number} onPageChange={setCurrentPage}/>
        ))}
    </div>
    </div>
  )
}

export default App

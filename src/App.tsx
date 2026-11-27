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
  const [selectedRegion, setSelectedRegion] = useState<string>("")


  const filteredList = countries.filter((country) => 
    country.names.common.toLowerCase().includes(query.toLowerCase()) && (selectedRegion === "" || country.region === selectedRegion))

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

  function handleRegionChange(event: React.ChangeEvent<HTMLSelectElement>) {
   setSelectedRegion(event.target.value)
   setCurrentPage(1)
  }

  const regionsArr = ["Europe", "Oceania", "Americas", "Africa", "Oceania", "Antarctic", "Asia"] 

  const VISIBLE_PAGE_BUTTONS = 5

  const lastPossibleStart = Math.max(0, pagesNumber - VISIBLE_PAGE_BUTTONS)
  const pagesStartNumber = Math.min(Math.max(currentPage - 3, 0), lastPossibleStart)
  const pagesEndNumber = pagesStartNumber + VISIBLE_PAGE_BUTTONS

  return (
    <div className='px-4 sm:px-6 max-w-6xl mx-auto flex flex-col gap-5'>
      <div className='flex flex-col gap-2'>
        <h1 className="text-7xl font-extrabold font-stretch-extra-condensed mt-6 text-paper">Countries</h1>
        <p className='text-subtitle max-w-[46ch]'>Every country and territory, with it's flag, capital, region and population.</p>
      </div>
      
      <div className='flex items-end gap-4 flex-wrap justify-between'>

        <div className='flex flex-col w-full sm:flex-[0.75]'>
          <label htmlFor='search-input' className='text-paper font-bold'>Search by name</label>
          <input 
            id="search-input"
            type='search'
            placeholder='Romania, Japan, Peru...'
            className=' bg-paper rounded-xs text-xs h-10 px-4' 
            value={query}
            onChange={handleSearchChange}
          />
        </div>


        <div className='flex flex-col w-full sm:flex-[0.25]'>
          <label htmlFor='Region' className='text-paper font-bold'>Region</label>
          <select id="Region" value={selectedRegion} onChange={handleRegionChange} className='bg-paper text-xs h-10 px-4'>
            <option value={""}>All regions</option>
            {regionsArr.map((region) => (
              <option id='region' key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>
      
      
      <div >
        {filteredList.length > 0 && (
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
      )}
      {filteredList.length === 0 && (
        <p>{`There are no results for "${query}"${selectedRegion === "" ? ", try searching for a different country." : ` in ${selectedRegion}, try searching for a different country or changing the region.`}`}</p>
      )}
      </div>
      <div className='flex justify-center'>
        <button>Previous</button>
        <nav aria-label='Countries list pages' className='flex flex-wrap gap-2'>
          {pagesNumbers.slice(pagesStartNumber, pagesEndNumber).map((number) => (
            <PagesButton key={number} number={number} currentPage={currentPage} onPageChange={setCurrentPage}/>
          ))}
        <button>Next</button>
        </nav>
    </div>
    </div>
  )
}

export default App

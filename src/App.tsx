import { useEffect, useState } from 'react'
import './App.css'
import { getCountries } from './api/countries'
import type { Country } from './types/country'
import { CountryCard } from './components/CountryCard'
import { PagesButton } from './components/PagesButton'

function App() {
  const [countries, setCountries] = useState<Country[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)

  const pagesNumber = Math.ceil(countries.length / 12)
  
  const pagesNumbers = Array.from({length: pagesNumber}, (_, index) => index + 1)

  useEffect(() => {
   async function loadCountries() {
       const loadedCountries = await getCountries()
       setCountries(loadedCountries)
    }
    loadCountries()
  },[])

  return (
    <div>
      <h1 className='text-green-700'>Countries</h1>
      <div >
        <ul className='grid sm:grid-cols-2 xl:grid-cols-6 gap-4'>
          {countries.slice((currentPage - 1) * 12, currentPage * 12).map((country, index) => (
            <li 
              key={country.names.common}
              className={`bg-paper p-1.5 text-ink ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
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

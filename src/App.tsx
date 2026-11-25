import { useEffect } from 'react'
import './App.css'
import { fetchAllCountries, getCountries } from './api/countries'

function App() {

  useEffect(() => {
    getCountries()
    console.log(getCountries())
    
  }, [])

  return (
    <h1 className='text-green-700'>Countries</h1>
  )
}

export default App

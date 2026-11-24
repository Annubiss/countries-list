import { useEffect } from 'react'
import './App.css'
import { fetchAllCountries } from './api/countries'

function App() {

  useEffect(() => {
    console.log(fetchAllCountries())
  }, [])

  return (
    <h1 className='text-green-700'>Countries</h1>
  )
}

export default App

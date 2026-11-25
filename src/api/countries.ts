
import type { Country } from "../types/country"


const COUNTRIES_CACHE_KEY = "countries-cache"

export async function fetchAllCountries(): Promise<Country[]> {
    const apiKey = import.meta.env.VITE_REST_COUNTRIES_API_KEY
    
    const allCountries: Country[] = []
    let offset = 0
    let hasMorePages = true


    while(hasMorePages) {
        const url = `https://api.restcountries.com/countries/v5?limit=100&offset=${offset}&response_fields=names.common,capitals.name,flag.url_svg,region,population,codes.alpha_3`


        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            },
        })
    

    if(!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
    }

    const result = await response.json()

    allCountries.push(...result.data.objects)
    hasMorePages = result.data.meta.more
    offset = offset + 100

    }
    return allCountries
}

type countriesCache = {
    countries: Country[];
    date: string;
}

export async function getCountries(): Promise<Country[]> {
    const savedCountries = localStorage.getItem(COUNTRIES_CACHE_KEY)
    const today = new Date().toDateString()
    if(savedCountries !== null) {
        const saved:countriesCache = JSON.parse(savedCountries)
        
        if(saved.date === today) {
            return saved.countries
        }
    }

    const countriesList = await fetchAllCountries()

    localStorage.setItem(COUNTRIES_CACHE_KEY, JSON.stringify({date: today, countries: countriesList}))

    return countriesList
}

import type { Country } from "../types/country"

export async function fetchAllCountries(): Promise<Country[]> {
    const apiKey = import.meta.env.VITE_REST_COUNTRIES_API_KEY
    const url = "https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,capitals.name,flag.url_svg,region,population,codes.alpha_3"
    
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        },
    })

    if(!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
    }

    const result = await response.json()

    return result.data.objects
}
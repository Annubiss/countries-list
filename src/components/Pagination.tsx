import { PagesButton } from "./PagesButton"
import type { Country } from "../types/country"
import { getCountries } from "../api/countries"

 

export function Pagination({currentPage, filteredList, setCurrentPage} : {
    currentPage: number,
    filteredList: Country[],
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}) {

    const VISIBLE_PAGE_BUTTONS = 5

    const pagesNumber = Math.ceil(filteredList.length / 12)
    const pagesNumbers = Array.from({length: pagesNumber}, (_, index) => index + 1)
    const lastPossibleStart = Math.max(0, pagesNumber - VISIBLE_PAGE_BUTTONS)
    const pagesStartNumber = Math.min(Math.max(currentPage - 3, 0), lastPossibleStart)
    const pagesEndNumber = pagesStartNumber + VISIBLE_PAGE_BUTTONS

    function previousPage() {
        if(currentPage === 1) return
        setCurrentPage(currentPage - 1)
        console.log(currentPage)
    }

    function nextPage() {
        if(currentPage === pagesNumber) return
        setCurrentPage(currentPage + 1)
        console.log(pagesNumber)
    }

    function getShownRange() {
    const lastShownNumber = currentPage * 12
    const firstShownNumber = lastShownNumber - 11

    const rangeText = `${firstShownNumber} - ${lastShownNumber}`

    return rangeText
}

    return (
    <div>
        <div className='flex justify-center mb-5'>
        <button className="border-2 border-ink-muted rounded-3xl px-3.5 text-subtitle h-11 hidden sm:inline mr-2" onClick={previousPage}>Previous</button>
        <button className="border-2 border-ink-muted rounded-3xl px-3.5 text-subtitle h-11 sm:hidden" onClick={previousPage}>«</button>
        <nav aria-label='Countries list pages' className='flex flex-wrap gap-2'>
          {pagesNumbers.slice(pagesStartNumber, pagesEndNumber).map((number) => (
            <PagesButton key={number} number={number} currentPage={currentPage} onPageChange={setCurrentPage}/>
          ))}
        <button className="border-2 border-paper rounded-3xl px-3.5 text-paper h-11 hidden sm:inline" onClick={nextPage}>Next</button>
        <button className="border-2 border-paper rounded-3xl px-3.5 text-paper h-11 sm:hidden" onClick={nextPage}>»</button>
        </nav>
        </div>
        <p className="flex justify-center mb-20 text-subtitle">{`Showing ${getShownRange()} of ${filteredList.length}`}</p>
    </div>
    
    )
}

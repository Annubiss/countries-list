import { PagesButton } from "./PagesButton"
import type { Country } from "../types/country"

 

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

    

    return (
    <div className='flex justify-center'>
        <button>Previous</button>
        <nav aria-label='Countries list pages' className='flex flex-wrap gap-2'>
          {pagesNumbers.slice(pagesStartNumber, pagesEndNumber).map((number) => (
            <PagesButton key={number} number={number} currentPage={currentPage} onPageChange={setCurrentPage}/>
          ))}
        <button>Next</button>
        </nav>
    </div>
    )
}
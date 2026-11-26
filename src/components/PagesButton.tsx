
type PagesButtonProps = {
    number: number;
    onPageChange: (page: number) => void;
    currentPage: number;
}

export function PagesButton({number, currentPage, onPageChange} : PagesButtonProps) {
    return (
            <button 
            aria-current={currentPage === number ? "page" : undefined } 
            onClick={() => onPageChange(number)}
            className={`border-2 border-ink-muted ${currentPage === number ? "bg-highlight text-ink" : "text-paper"} rounded-full text-xs size-11 ` +
                "font-semibold"}
            >
            {number}
            </button>
    )
}
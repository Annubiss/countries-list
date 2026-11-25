
type PagesButtonProps = {
    number: number;
    onPageChange: (page: number) => void;
}

export function PagesButton({number, onPageChange} : PagesButtonProps) {
    return (
            <button onClick={() => onPageChange(number)}>{number}</button>
    )
}
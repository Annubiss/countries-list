import type { Country } from "../types/country"

type CountryCardProps = {
    country: Country;
}

const regionBorderColor: Record<string, string> = {
    Oceania: "border-region-Oceania",
    Europe: "border-region-Europe",
    Asia: "border-region-Asia",
    Africa: "border-region-Africa",
    Americas: "border-region-Americas",
    Antarctic: "border-region-Antarctic"

}

export function CountryCard({country}: CountryCardProps) {

    return (
        <article className="bg-paper h-full p-2.5">
            <div className={`border-2 ${regionBorderColor[country.region]} h-full p-2.5 flex flex-col gap-3`}>
                            <div className="flex flex-wrap">
                                {country.flag?.url_svg && (
                                <img 
                                    alt={`Flag of ${country.names.common}`}
                                    className="w-full aspect-3/2 object-contain bg-paper" src={`${country.flag?.url_svg}`} />
                                )}
                                {!country.flag?.url_svg && (
                                    <p>Flag: not available</p>
                                )}
                        </div>
                        <h2 className="text-2xl font-extrabold leading-none">{country.names.common}</h2>
                        <p className="text-sm text-ink-muted">Capital: {country.capitals.map((capital) => capital.name)}</p> 
                        <div className="flex justify-between items-end border-t border-ink/20 pt-2 mt-auto">
                            <p>{country.region}</p>
                            <p>Population: {country.population}</p>
                        </div>
            </div>
        </article>
    )
}
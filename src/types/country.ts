
export type Country = {
    names:{
        common: string;
    },
    capitals:{
        name: string;
    }[],
    flag:{
        url_svg: string;
    },
    region: string;
    population: number;
    codes:{
        alpha_3: string;
    },
}
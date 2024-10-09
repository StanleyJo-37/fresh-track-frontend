export type Nutrient = {
    vitaminA: number;
    vitaminB: number;
    vitaminC: number;
    vitaminD: number;
    vitaminE: number;
};

export type Food = {
    name: string;
    nutrients: Nutrient;
    imageSrc: string;
};
export interface CategoryItem {
    id: number;
    name: {
        [key: string]: string;
    };
    serverImageUrl: string | null;
    smallImageUrl: string | null;
    blurhash: string | null;
    priority: number;
    hide: boolean;
    productsCount: number;
    hasDiscount: boolean;
    supportDynamicPricing: boolean;
    marketSubcategories: SubCategory[];
}

export interface SubCategory {
    id: number;
    name: {
        [key: string]: string;
    };
    products?: Product[];
}

export interface Product {
    id: number;
    name: {
        [key: string]: string;
    };
    description: {
        [key: string]: string;
    };
    price: number;
    imageUrl: string | null;
}

export interface SectionData {
    title: string;
    categoryId: number;
    subcategoryId: number;
    data: Product[];
}
export type ProductResponse={
    content:Product[];
    totalPages:number;
}

export type Product={
    id:number;
    name:string;
    description:string;
    price:number;
    image:string;
    date:string;
    imgUrl:string;
    categories:Category[];
}

export type Category={
    id:number;
    name:string;

}
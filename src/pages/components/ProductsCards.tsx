        import React, { useEffect, useState } from 'react';

        type Product = {
            name: string;
            price: number;
            description: string;
            quantityInStock: number;
            categoryEnums: string;
            photoLink: string;
            offPrice: number;
            stars: number;
        };

        export default function ProductsCards(): JSX.Element {
            const [products, setProducts] = useState<Product[]>([]);

            useEffect(() => {
                const fetchData = async () => {
                    try {
                        const response = await fetch('http://localhost:8093/products/getAllProducts');

                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }

                        const data = await response.json();
                        setProducts(data);
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                };

                fetchData();
            }, []);

            function createProductTags(
                name: string,
                price: number,
                description: string,
                quantityInStock: number,
                photoLink: string,
                offPrice: number,
                stars: number
            ): JSX.Element {

                const discountedPrice = (price - (price * offPrice / 100)).toFixed(2);
                console.log(stars)
                return (
                    <div id='products-cards' className="flex flex-col items-center justify-center p-6 text-center hover:scale-105">
                        <img src={photoLink} className="p-1 rounded-lg" alt={name} />
                        <h1 className="font-bold mt-2">{name}</h1>
                        <p className="text-xs text-gray-500 line-through">R${price}</p>
                        <p className="text-md">R${discountedPrice}</p>
                        <div className="flex space-x-4 mt-2">
                            <button className="bg-blue-700 bg-opacity-75 text-md text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-blue-500">
                                COMPRAR
                            </button>
                            <button className="bg-green-500 bg-opacity-75 text-md text-white px-2 py-1 md:px-4 md:py-2 rounded-md hover:bg-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </button>
                        </div>
                        <div className='flex justify-center items-center gap-1 mt-2'>
                            <div className="text-3xl text-yellow-400">
                                {Array(Math.min(5, Math.max(1, Math.floor(stars)))).fill('★').join('')}
                            </div>
                            <span className="text-xs"> ({Math.floor(stars)}) </span>
                        </div>

                    </div>
                );
            }

            return (
                <div className="py-4 mx-auto mt-1 mb-6 flex flex-col items-center justify-center text-gray-200">
                    <div id="products-list" className="flex flex-col justify-center items-center md:grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {products.map((product, index) => (
                            <div key={index}>
                                {createProductTags(
                                    product.name,
                                    product.price,
                                    product.description,
                                    product.quantityInStock,
                                    product.photoLink,
                                    product.offPrice,
                                    product.stars
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
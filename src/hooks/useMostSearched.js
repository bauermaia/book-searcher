import { useEffect, useState } from "react";

export function useMostSearched() {
    const [mostSearched, setMostSearched] = useState([]);
    

    useEffect(() => {
        fetch("https://openlibrary.org/trending/daily.json")
            .then(response => response.json())
            .then(data => {
                data.works.forEach(book => {
                    const formattedBook = {
                        autorId: book.author_key?.[0] || "Unknown",
                        autorName: book.author_name?.[0] || "Unknown",
                        coverId: book.cover_i || null,
                        name: book.title,
                        key: book.key
                    };

                    // Agregar el libro al estado sin sobrescribir los anteriores
                    setMostSearched(prevBooks => [...prevBooks, formattedBook]);
                });
            })
            .catch(error => console.error("Error fetching most searched books: ", error));
    }, []);

    return { mostSearched };
}


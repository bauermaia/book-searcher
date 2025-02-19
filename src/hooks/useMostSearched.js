import { useEffect, useState } from "react";

export function useMostSearched() {
    const [mostSearched, setMostSearched] = useState([]);
    const [mostLoading, setMostLoading] = useState(false)
    

    useEffect(() => {
        setMostLoading(true)

        fetch("https://openlibrary.org/trending/daily.json")
            .then(response => response.json())
            .then (data=> {
                const formattedBooks = data.works.map(book=> ({
                    autorId: book.author_key?.[0] || "Unknown",
                    autorName: book.author_name?.[0] || "Unknown",
                    coverId: book.cover_i || null,
                    name: book.title,
                    key: book.key   
                }))

                setMostSearched(formattedBooks)
            })
            .catch(error => console.error("Error fetching most searched books: ", error))
            .finally(()=> setMostLoading(false));
    }, []);

    return { mostSearched, mostLoading};
}


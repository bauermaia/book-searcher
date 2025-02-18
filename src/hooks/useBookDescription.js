import { useEffect, useState } from "react"

export function useBookDescription (bookKey) {    

const DESCRIPTION_ENDPOINT = 'https://openlibrary.org'
const [description, setDescription] = useState('Loading description')

useEffect(()=> {
  if(!bookKey) return

  fetch(`${DESCRIPTION_ENDPOINT}${bookKey}.json`)
  .then(res => res.json())
  .then( data => {
    if (typeof data.description === "string") {
      setDescription(data.description)
    } else if (typeof data.description === "object" && data.description?.value) {
      setDescription(data.description.value)
    } else {
      setDescription("No description available 😕")
    }
  } )

},[bookKey])


return {description}
}
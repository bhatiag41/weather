import React,{useState} from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

const Search = ({onSearchChange}) => {
    const[search,setSearch]=useState(null);

    const loadOptions=(inputValue)=>{
        return( 
            try {
                const response = await fetch(GEO_API_URL, GeoApiOptions);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        )
    }
    const handleOnChange=(searchData)=>{
        setSearch(searchData)
    }
  return (
   <AsyncPaginate
   placeholder="search for city"
   debounceTimeout={600}
   value={search}
   onChange={handleOnChange}

   loadOptions={loadOptions}

   />

  )
}

export default Search
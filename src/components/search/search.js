import React,{useState} from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL,GeoApiOptions } from '../../api';
const Search = ({ onSearchChange }) => {
    const[search,setSearch]=useState(null);

    const loadOptions=(inputValue)=>{
        return fetch(`${GEO_API_URL}/cities?namePrefix=${inputValue}`, GeoApiOptions)
        .then(response=>response.json())
    .then(response=>{
        return{
            options: response.data.map((city)=>{
                return{
                    value:`${city.latitude} ${city.longitude}` ,
                    label: `${city.name} ${city.countryCode}`,
                }
            })
        }
    })
    .catch(err=>console.error(err))
        
    }
    const handleOnChange=(searchData)=>{
        setSearch(searchData)
        onSearchChange(searchData)
    }
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: '5px',
            border: '2px solid #ccc',
            boxShadow: state.isFocused ? '0 0 0 2px #212121' : '#757575',
            width:'50vw',
            margin:"1rem"
        
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#212121' : null,
            color: state.isFocused ? 'white' : null,
            
        }),
    }
  return (
   <AsyncPaginate
   placeholder="search for city"
   debounceTimeout={600}
   value={search}
   onChange={handleOnChange}
   styles={customStyles}
   loadOptions={loadOptions}

   />

  )
}

export default Search
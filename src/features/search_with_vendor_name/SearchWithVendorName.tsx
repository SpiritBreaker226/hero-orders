import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  defaultOptions,
  selectSearchWithVendorName,
  updateSearchWithVendorName,
} from './searchWithVendorNameSlice'

const SearchWithVendorName = () => {
  const dispatch = useDispatch()
  const { value, options } = useSelector(selectSearchWithVendorName)

  const handleChangeSearchBox = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSearchWithVendorName(e.target.value))
  }
  const handleClickResetFilter = () => {
    dispatch(updateSearchWithVendorName(defaultOptions[0].value))
  }

  return (
    <section>
      <p>
        <label htmlFor="searchWithVendorName">Suppliers</label>
      </p>
      <select
        id="searchWithVendorName"
        name="searchWithVendorName"
        data-testid="searchWithVendorName"
        onChange={handleChangeSearchBox}
        value={value}
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        })}
      </select>

      <button onClick={handleClickResetFilter} data-testid="searchResetButton">
        X Reset Filter
      </button>
    </section>
  )
}

export default SearchWithVendorName

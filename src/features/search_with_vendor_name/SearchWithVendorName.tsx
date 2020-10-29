import React, { ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  defaultOptions,
  selectSearchWithVendorName,
  updateSearchWithVendorName,
} from './searchWithVendorNameSlice'

import styles from './SearchWithVendorName.module.scss'

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
    <section className={styles.searchWithVendorName}>
      <div className={styles.searchWithVendorNameForum}>
        <div className={styles.fieldLabelItem}>
          <label className={styles.fieldLabel} htmlFor="searchWithVendorName">
            Suppliers
          </label>
        </div>

        <div className={styles.fieldItem}>
          <div className={styles.fieldLabelItemForDesktop}>
            <label className={styles.fieldLabel} htmlFor="searchWithVendorName">
              Suppliers
            </label>
          </div>

          <select
            id="searchWithVendorName"
            name="searchWithVendorName"
            data-testid="searchWithVendorName"
            onChange={handleChangeSearchBox}
            value={value}
            className={styles.select}
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )
            })}
          </select>
        </div>

        <div className={styles.fieldItem}>
          <button
            onClick={handleClickResetFilter}
            data-testid="searchResetButton"
            className={styles.button}
          >
            X Reset Filter
          </button>
        </div>
      </div>
    </section>
  )
}

export default SearchWithVendorName

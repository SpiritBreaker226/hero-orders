import React from 'react'
import { useSelector } from 'react-redux'

import { Datum } from '../../types/Order'

import { selectFetch } from '../fetch_data/fetchDataSlice'

import TableField from './table_field/TableField'

import { columHeaders, selectOrders } from './tableSlice'
import styles from './Table.module.scss'

const Table = () => {
  const fetchState = useSelector(selectFetch)
  const orders = useSelector(selectOrders)

  if (fetchState.isLoading || fetchState.errorMessage) {
    return null
  }

  if (orders.length === 0) {
    return (
      <section data-testid="no-orders" className={styles.noOrdersFound}>
        <h4>No orders Found</h4>
      </section>
    )
  }

  return (
    <section data-testid="orders-table" className={styles.table}>
      <header className={styles.columHeaderContainerForDesktop}>
        {columHeaders.map((columHeader: string) => (
          <h4 className={styles.columHeaderForDesktop} key={columHeader}>
            {columHeader}
          </h4>
        ))}
      </header>

      {orders.map((order: Datum) => (
        <section
          key={order.id}
          role="row"
          className={styles.fieldContainerForDesktop}
        >
          {columHeaders.map((columHeader: string) => (
            <span
              key={`${columHeader}${order.id}`}
              className={styles.fieldItem}
            >
              <section className={styles.fieldContainer} aria-hidden="true">
                <h4 className={styles.columHeader}>{columHeader}</h4>
                <TableField
                  order={order}
                  columHeader={columHeader}
                  className={styles.fieldItem}
                />
              </section>

              <TableField
                order={order}
                columHeader={columHeader}
                className={styles.fieldItemForDesktop}
              />
            </span>
          ))}
        </section>
      ))}
    </section>
  )
}

export default Table

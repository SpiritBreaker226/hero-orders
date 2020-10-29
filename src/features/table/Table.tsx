import React from 'react'
import { useSelector } from 'react-redux'

import { Datum } from '../../types/Order'

import { selectFetch } from '../fetch_data/fetchDataSlice'

import TableField from './table_field/TableField'

import { columHeaders, selectOrders } from './tableSlice'
import styles from './Table.module.scss'

const Table = () => {
  const fetchState = useSelector(selectFetch)
  const { filterOrders } = useSelector(selectOrders)

  if (fetchState.isLoading || fetchState.errorMessage) {
    return null
  }

  if (filterOrders.length === 0) {
    return (
      <section data-testid="no-orders" className={styles.noOrdersFound}>
        <h4>No orders Found</h4>
      </section>
    )
  }

  const MobileOnly = ({
    order,
    columHeader,
  }: {
    order: Datum
    columHeader: string
  }) => (
    <section className={styles.fieldContainer} aria-hidden="true">
      <h4 className={styles.columHeader}>{columHeader}</h4>
      <TableField
        order={order}
        columHeader={columHeader}
        className={styles.fieldItem}
      />
    </section>
  )

  return (
    <section data-testid="orders-table" className={styles.table}>
      <header className={styles.columHeaderContainerForDesktop}>
        {columHeaders.map((columHeader: string) => (
          <h4 className={styles.columHeaderForDesktop} key={columHeader}>
            {columHeader}
          </h4>
        ))}
      </header>

      {filterOrders.map((order: Datum) => (
        <section
          key={order.id}
          role="row"
          className={styles.fieldContainerForDesktop}
        >
          {columHeaders.map((columHeader: string) => (
            <span
              data-testid={`${columHeader}${order.vendorName}`}
              key={`${columHeader}${order.id}`}
              className={styles.fieldItem}
            >
              <MobileOnly order={order} columHeader={columHeader} />

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

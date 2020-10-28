import React from 'react'
import { useSelector } from 'react-redux'

import { Datum } from '../../types/Order'

import { selectFetch } from '../fetch_data/fetchDataSlice'

import TableField from './table_field/TableField'

import { columHeaders, selectOrders } from './tableSlice'

const Table = () => {
  const fetchState = useSelector(selectFetch)
  const orders = useSelector(selectOrders)

  if (fetchState.isLoading || fetchState.errorMessage) {
    return null
  }

  if (orders.length === 0) {
    return (
      <section data-testid="no-orders" className="no-orders-found">
        <h4>No orders Found</h4>
      </section>
    )
  }

  return (
    <section data-testid="orders-table">
      <header>
        {columHeaders.map((columHeader: string) => (
          <h4 key={columHeader}>{columHeader}</h4>
        ))}
      </header>

      {orders.map((order: Datum) => (
        <section key={order.id} role="row">
          {columHeaders.map((columHeader: string) => (
            <span key={`${columHeader}${order.id}`}>
              <section aria-hidden="true">
                <h4>{columHeader}</h4>
                <TableField order={order} columHeader={columHeader} />
              </section>

              <TableField order={order} columHeader={columHeader} />
            </span>
          ))}
        </section>
      ))}
    </section>
  )
}

export default Table

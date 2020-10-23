import React from 'react'
import { useSelector } from 'react-redux'

import { Datum } from '../../types/Order'

import { selectFetch } from '../fetch_data/fetchDataSlice'

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
    <section>
      <table data-testid="orders-table">
        <thead>
          <tr>
            {columHeaders.map((columHeader: string) => (
              <th key={columHeader}>{columHeader}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {orders.map((order: Datum) => (
            <tr key={order.id}>
              {columHeaders.map(
                (columHeader: string, columnHeaderIndex: number) => (
                  <td key={`${columHeader}${columnHeaderIndex}`}>
                    {order.deliveryDay}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Table

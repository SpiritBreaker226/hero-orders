import React from 'react'

import moment from 'moment'

import { Datum } from '../../../types/Order'

interface TableFieldProps {
  order: Datum
  columHeader: string
  className?: string
}

const TableField = ({
  order,
  columHeader,
  className = '',
}: TableFieldProps) => {
  const field = () => {
    if (columHeader === 'Delivery Day') {
      return moment(order.deliveryDay).format('MMM D, YYYY')
    } else if (columHeader === 'Supplier') {
      return (
        <>
          {order.vendorName}
          {!order.isBYOS && <span className="table-byos">Market</span>}
          {order.isPendingVendorOnboarding && (
            <span className="table-field-pending-vendor-onboarding">1st</span>
          )}
        </>
      )
    } else if (columHeader === 'Total') {
      return !order.total ? '' : `$${order.total.toLocaleString()}`
    }

    return order.orderBuyerStatus
  }
  const props = className === '' ? {} : { className }

  return <div {...props}>{field()}</div>
}

export default TableField

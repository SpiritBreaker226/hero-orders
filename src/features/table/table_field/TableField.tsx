import React from 'react'

import moment from 'moment'

import { Datum } from '../../../types/Order'

import styles from './TableField.module.scss'

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
        <div className={styles.vendorContainer}>
          <div className={styles.vendorItem}>{order.vendorName}</div>
          <div className={styles.tags}>
            {!order.isBYOS && <span className={styles.tagMarket}>Market</span>}
            {order.isPendingVendorOnboarding && (
              <span className={styles.tagFirst}>1st</span>
            )}
          </div>
        </div>
      )
    } else if (columHeader === 'Total') {
      return !order.total ? '' : `$${order.total.toLocaleString()}`
    }

    return (
      <span className={styles[`tagStatus${order.orderBuyerStatus}`]}>
        {order.orderBuyerStatus}
      </span>
    )
  }
  const props = className === '' ? {} : { className }

  return <div {...props}>{field()}</div>
}

export default TableField

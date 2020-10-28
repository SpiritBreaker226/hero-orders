import React from 'react'
import { render, screen } from '@testing-library/react'

import orders from '../../helpers/test_data_orders.json'

import TableField from './TableField'

describe('TableField', () => {
  describe('for the status field', () => {
    it('should return a In Route in the status', () => {
      render(
        <TableField
          order={{ ...orders.data[0], orderBuyerStatus: 'In Route' }}
          columHeader="Status"
        />
      )

      expect(
        screen.queryByText('In Route', { exact: false })
      ).toBeInTheDocument()
    })
  })

  describe('for the delivery day field', () => {
    it('should return a delivery day in a [MMM D, YYYY] format', () => {
      render(
        <TableField
          order={{ ...orders.data[0], deliveryDay: '1980-07-01' }}
          columHeader="Delivery Day"
        />
      )

      expect(
        screen.queryByText('Jul 1, 1980', { exact: false })
      ).toBeInTheDocument()
    })
  })

  describe('for the Supplier field', () => {
    it('should return the vendor name', () => {
      render(
        <TableField
          order={{
            ...orders.data[0],
            vendorName: 'Faker',
            isBYOS: true,
            isPendingVendorOnboarding: false,
          }}
          columHeader="Supplier"
        />
      )

      expect(screen.queryByText('Faker', { exact: false })).toBeInTheDocument()
      expect(
        screen.queryByText('Market', { exact: false })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText('1st', { exact: false })
      ).not.toBeInTheDocument()
    })

    describe('when pedning vendor onboarding', () => {
      it('should return the vendor name & 1st', () => {
        render(
          <TableField
            order={{
              ...orders.data[0],
              vendorName: 'Faker',
              isBYOS: true,
              isPendingVendorOnboarding: true,
            }}
            columHeader="Supplier"
          />
        )

        expect(
          screen.queryByText('Faker', { exact: false })
        ).toBeInTheDocument()
        expect(
          screen.queryByText('Market', { exact: false })
        ).not.toBeInTheDocument()
        expect(screen.queryByText('1st', { exact: false })).toBeInTheDocument()
      })
    })

    describe('when BYOS', () => {
      it('should return the vendor name & market', () => {
        render(
          <TableField
            order={{
              ...orders.data[0],
              vendorName: 'Faker',
              isBYOS: false,
              isPendingVendorOnboarding: false,
            }}
            columHeader="Supplier"
          />
        )

        expect(
          screen.queryByText('Faker', { exact: false })
        ).toBeInTheDocument()
        expect(
          screen.queryByText('Market', { exact: false })
        ).toBeInTheDocument()
        expect(
          screen.queryByText('1st', { exact: false })
        ).not.toBeInTheDocument()
      })
    })

    describe('when BYOS & pedning vendor onboarding', () => {
      it('should return the vendor name, market & 1st', () => {
        render(
          <TableField
            order={{
              ...orders.data[0],
              vendorName: 'Faker',
              isBYOS: false,
              isPendingVendorOnboarding: true,
            }}
            columHeader="Supplier"
          />
        )

        expect(
          screen.queryByText('Faker', { exact: false })
        ).toBeInTheDocument()
        expect(
          screen.queryByText('Market', { exact: false })
        ).toBeInTheDocument()
        expect(screen.queryByText('1st', { exact: false })).toBeInTheDocument()
      })
    })
  })

  describe('for the total field', () => {
    it('should return a total in a number format', () => {
      render(
        <TableField
          order={{ ...orders.data[0], total: 99.99 }}
          columHeader="Total"
        />
      )

      expect(screen.queryByText('$99.99', { exact: false })).toBeInTheDocument()
    })

    describe('when total is 0 or nothing', () => {
      it('should return a nothing', () => {
        render(
          <TableField
            order={{ ...orders.data[0], total: 0 }}
            columHeader="Total"
          />
        )

        expect(
          screen.queryByText('$0', { exact: false })
        ).not.toBeInTheDocument()
      })
    })
  })
})

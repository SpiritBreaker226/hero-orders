export interface Order {
  totalCount: number
  limit: number
  data: Datum[]
}

export interface Datum {
  disputeComment: string
  grandTotal: number
  orderBuyerStatus: string
  shippingAddress: ShippingAddress
  isConfirmed: boolean
  isVendorEmailSent: boolean
  isAutoPayByCard: boolean
  tax: number
  addOnOrderFor: string
  addOnOrders: any[]
  statementEndAt: Date
  debitTotalAmount: number
  isTestOrder: boolean
  skippedAt: string
  customerUrlsafe: string
  paidAmount: number
  id: number
  paidAt: Date
  statementStartAt: Date
  total: number
  disputedStatus: string
  invoiceURL: string
  outstandingAmount: number
  debitNoteTotal: number
  urlsafe: string
  grandSubtotal: number
  invoices: Invoice[]
  numberItems: number
  grandPaidAmount: number
  disputedItems: any[]
  cancelledAt: string
  deliveryDay: Date
  deliveryRequests: string
  vendorUrlsafe: string
  isOnHold: boolean
  vendorName: string
  invoiceSentAt: Date
  invoiceMemos: any[]
  isShortedOrder: boolean
  orderPayments: OrderPayment[]
  isBYOS: boolean
  paidDebitNoteAmount: number
  placedAt: Date
  creditTotalAmount: number
  isInShoppingCart: boolean
  isPendingVendorOnboarding: boolean
  buyer: Buyer
  receivedByVendorAt: string
  invoiceNumber: number
  subtotal: number
  replacementOrderFor: string
  isReadyForQC: boolean
  dueAt: Date
  QCedAt: Date
  isPaid: boolean
  isAddOnOrder: boolean
  isReplacementOrder: boolean
  isDeliveryConfirmed: boolean
  items: Item[]
  notes: string
  vendorRegionID: string
  chefheroServicesFee: number
  paymentsTerms: number
  modifiedAt: Date
  isBuyingGroupOrder: number
  numberDisputedItems: number
  sentAt: Date
  isOrderReviewSubmitted: boolean
  billingAddress: BillingAddress
}

export interface BillingAddress {
  city: string
  state: string
  geocode: Geocode
  name: string
  zip: string
  country: string
  formatted: string
  id: string
  line1: string
  line2: string
}

export interface Geocode {
  lat: number
  lng: number
}

export interface Buyer {
  isPaymentEnabled: boolean
  statementStartDate: Date
  hasSuppliersSetup: boolean
  tax: Tax
  isResidential: boolean
  accountingEmails: string[]
  id: number
  createdAt: Date
  paymentTerms: number
  urlsafe: string
  isSuspended: boolean
  email: string
  fax: Fax
  referralVendorID: string
  isSelfOnboarded: boolean
  shippingAddresses: ShippingAddress[]
  stripeCustomerID: string
  phone: Fax
  statementEndDate: Date
  billingAddress: BillingAddress
  creditLimit: number
  paymentPreferredMethod: string
  testingBuyer: boolean
  displayName: string
  name: string
  numberOrders: number
}

export interface Fax {
  link: string
  formatted: string
  value: string
}

export interface ShippingAddress {
  city: string
  name: string
  zip: string
  deliveryContactNumber: string
  country: string
  formatted: string
  line1: string
  line2: string
  state: string
  geocode: Geocode
  locationID: string
  deliveryContactName: string
  driveInstructions: string
  id: string
}

export interface Tax {
  taxIDNum: string
  resaleCertNum: string
}

export interface Invoice {
  adjustmentTax: number
  tax: number
  id: string
  total: number
  dueDate: Date
  createdAt: Date
  itemsSubtotal: number
  deliveryFeeSubtotal: number
  deliveryFeeTax: number
  issueDate: Date
  itemsTax: number
  adjustmentSubtotal: number
  serviceFeeSubtotal: number
  createdBy: string
  invoiceNumber: number
  subtotal: number
  serviceFeeTax: number
  costTotal: number
  url: string
  paidAt: Date
  modifiedAt: Date
  isPrimaryInvoice: boolean
}

export interface Item {
  isBYOS: boolean
  genericItem: GenericItem
  isOrganic: string
  isPreOrder: boolean
  description: string
  unitName: string
  sourceID: number
  disputedDescription: string
  originalQuantity: number
  pricePerUnit: string
  totalQuantity: string
  taxPercentage: number
  sourceUrlsafe: string
  createdBy: string
  total: number
  categories: any[]
  unitDescription: string
  productCode: string
  taxAmount: number
  name: string
  isLocal: string
  disputedFlow: string
  notes: string
  urlsafe: string
  createdAt: string
  priceTotal: number
  salesUnit: string
  modifiedAt: Date
  isTaxable: boolean
  salesQuantity: number
  modifiedBy: string
  price: number
  quantity: number
}

export interface GenericItem {
  name: string
  imageURL: string
  urlsafe: string
  createdAt: string
  deletedAt: string
  categories: any[]
  description: string
}

export interface OrderPayment {
  paymentType: string
  amount: number
  isLoss: boolean
  modifiedAt: string
  orderUrlsafe: string
  deletedAt: string
  urlsafe: string
  createdAt: Date
}

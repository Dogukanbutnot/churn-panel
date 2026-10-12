export interface Customer {
  customerID: string
  gender: 'Male' | 'Female'
  tenure: number
  Contract: 'Month-to-month' | 'One year' | 'Two year'
  InternetService: 'DSL' | 'Fiber optic' | 'No'
  PaymentMethod: string
  MonthlyCharges: number
  TotalCharges: number
  Churn: 'Yes' | 'No'
}
export const CONTRACTS = ['Month-to-month', 'One year', 'Two year'] as const
export const INTERNET = ['DSL', 'Fiber optic', 'No'] as const
export const PAYMENTS = ['Electronic check', 'Mailed check', 'Bank transfer (automatic)', 'Credit card (automatic)']

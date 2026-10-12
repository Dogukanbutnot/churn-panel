import { useEffect, useState } from 'react'
import seed from '../data/customers.json'
import type { Customer } from '../interfaces/Customer'

const KEY = 'customers'
const load = (): Customer[] => {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* bozuk veri: seed'e dön */ }
  return seed as Customer[]
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(load)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(customers)) }, [customers])
  return {
    customers,
    add: (c: Customer) => setCustomers(p => [c, ...p]),
    update: (c: Customer) => setCustomers(p => p.map(x => (x.customerID === c.customerID ? c : x))),
    remove: (id: string) => setCustomers(p => p.filter(x => x.customerID !== id)),
    reset: () => setCustomers(seed as Customer[]),
  }
}

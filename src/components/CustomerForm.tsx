import { useState } from 'react'
import { CONTRACTS, INTERNET, PAYMENTS, type Customer } from '../interfaces/Customer'

const empty: Customer = { customerID: '', gender: 'Male', tenure: 0, Contract: 'Month-to-month', InternetService: 'DSL', PaymentMethod: PAYMENTS[0], MonthlyCharges: 0, TotalCharges: 0, Churn: 'No' }
const input = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none'

export default function CustomerForm({ initial, existingIds, onSubmit, onCancel }: {
  initial?: Customer; existingIds: string[]; onSubmit: (c: Customer) => void; onCancel: () => void
}) {
  const editing = !!initial
  const [f, setF] = useState<Customer>(initial ?? empty)
  const [error, setError] = useState('')
  const set = <K extends keyof Customer>(k: K, v: Customer[K]) => setF(p => ({ ...p, [k]: v }))

  const submit = () => {
    const id = f.customerID.trim()
    if (!id) return setError('Müşteri ID zorunlu.')
    if (!editing && existingIds.includes(id)) return setError('Bu ID zaten var.')
    if (f.MonthlyCharges < 0 || f.tenure < 0) return setError('Değerler negatif olamaz.')
    onSubmit({ ...f, customerID: id, TotalCharges: +(f.MonthlyCharges * f.tenure).toFixed(2) })
  }

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <label className="block text-sm font-medium text-slate-700">{label}{children}</label>
  )
  return (
    <div className="grid grid-cols-2 gap-4">
      <Field label="Müşteri ID"><input className={input} value={f.customerID} disabled={editing} onChange={e => set('customerID', e.target.value)} /></Field>
      <Field label="Cinsiyet"><select className={input} value={f.gender} onChange={e => set('gender', e.target.value as Customer['gender'])}><option>Male</option><option>Female</option></select></Field>
      <Field label="Abonelik süresi (ay)"><input type="number" className={input} value={f.tenure} onChange={e => set('tenure', +e.target.value)} /></Field>
      <Field label="Aylık ücret"><input type="number" step="0.01" className={input} value={f.MonthlyCharges} onChange={e => set('MonthlyCharges', +e.target.value)} /></Field>
      <Field label="Sözleşme"><select className={input} value={f.Contract} onChange={e => set('Contract', e.target.value as Customer['Contract'])}>{CONTRACTS.map(c => <option key={c}>{c}</option>)}</select></Field>
      <Field label="İnternet"><select className={input} value={f.InternetService} onChange={e => set('InternetService', e.target.value as Customer['InternetService'])}>{INTERNET.map(c => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Ödeme yöntemi"><select className={input} value={f.PaymentMethod} onChange={e => set('PaymentMethod', e.target.value)}>{PAYMENTS.map(c => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Churn"><select className={input} value={f.Churn} onChange={e => set('Churn', e.target.value as Customer['Churn'])}><option>No</option><option>Yes</option></select></Field>
      {error && <p className="col-span-2 text-sm text-red-600">{error}</p>}
      <div className="col-span-2 flex justify-end gap-2">
        <button onClick={onCancel} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">Vazgeç</button>
        <button onClick={submit} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">{editing ? 'Güncelle' : 'Ekle'}</button>
      </div>
    </div>
  )
}

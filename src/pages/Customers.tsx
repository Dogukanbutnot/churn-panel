import { useState } from 'react'
import CustomerForm from '../components/CustomerForm'
import Modal from '../components/Modal'
import type { Customer } from '../interfaces/Customer'

interface Props { customers: Customer[]; add: (c: Customer) => void; update: (c: Customer) => void; remove: (id: string) => void }

export default function Customers({ customers, add, update, remove }: Props) {
  const [q, setQ] = useState('')
  const [churn, setChurn] = useState('all')
  const [modal, setModal] = useState<{ mode: 'add' } | { mode: 'edit'; c: Customer } | null>(null)

  const rows = customers.filter(c =>
    c.customerID.toLowerCase().includes(q.toLowerCase()) && (churn === 'all' || c.Churn === churn))

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input placeholder="ID ara..." value={q} onChange={e => setQ(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        <select value={churn} onChange={e => setChurn(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="all">Tümü</option><option value="Yes">Ayrılanlar</option><option value="No">Kalanlar</option>
        </select>
        <button onClick={() => setModal({ mode: 'add' })} className="ml-auto rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">+ Yeni müşteri</button>
      </div>
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>{['ID', 'Cinsiyet', 'Süre', 'Sözleşme', 'İnternet', 'Aylık', 'Churn', ''].map(h => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map(c => (
              <tr key={c.customerID} className="border-t border-slate-100">
                <td className="px-4 py-2 font-mono">{c.customerID}</td>
                <td className="px-4 py-2">{c.gender}</td>
                <td className="px-4 py-2">{c.tenure} ay</td>
                <td className="px-4 py-2">{c.Contract}</td>
                <td className="px-4 py-2">{c.InternetService}</td>
                <td className="px-4 py-2">${c.MonthlyCharges.toFixed(2)}</td>
                <td className="px-4 py-2"><span className={`rounded-full px-2 py-0.5 text-xs ${c.Churn === 'Yes' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{c.Churn === 'Yes' ? 'Ayrıldı' : 'Aktif'}</span></td>
                <td className="px-4 py-2 text-right whitespace-nowrap">
                  <button onClick={() => setModal({ mode: 'edit', c })} className="mr-3 text-indigo-600 hover:underline">Düzenle</button>
                  <button onClick={() => confirm(`${c.customerID} silinsin mi?`) && remove(c.customerID)} className="text-red-600 hover:underline">Sil</button>
                </td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-400">Kayıt bulunamadı.</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-400">{rows.length} / {customers.length} kayıt</p>
      {modal && (
        <Modal title={modal.mode === 'add' ? 'Yeni müşteri' : 'Müşteriyi düzenle'} onClose={() => setModal(null)}>
          <CustomerForm
            initial={modal.mode === 'edit' ? modal.c : undefined}
            existingIds={customers.map(c => c.customerID)}
            onCancel={() => setModal(null)}
            onSubmit={c => { (modal.mode === 'add' ? add : update)(c); setModal(null) }}
          />
        </Modal>
      )}
    </div>
  )
}

import StatCard from '../components/StatCard'
import { CONTRACTS, type Customer } from '../interfaces/Customer'

export default function Dashboard({ customers }: { customers: Customer[] }) {
  const n = customers.length
  const churned = customers.filter(c => c.Churn === 'Yes').length
  const avg = n ? customers.reduce((s, c) => s + c.MonthlyCharges, 0) / n : 0
  const rate = (list: Customer[]) => (list.length ? (list.filter(c => c.Churn === 'Yes').length / list.length) * 100 : 0)
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Toplam müşteri" value={n} />
        <StatCard label="Ayrılan müşteri" value={churned} />
        <StatCard label="Churn oranı" value={`%${rate(customers).toFixed(1)}`} />
        <StatCard label="Ort. aylık ücret" value={`$${avg.toFixed(2)}`} />
      </div>
      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <h2 className="mb-4 font-semibold">Sözleşme tipine göre churn oranı</h2>
        {CONTRACTS.map(ct => {
          const r = rate(customers.filter(c => c.Contract === ct))
          return (
            <div key={ct} className="mb-3">
              <div className="mb-1 flex justify-between text-sm"><span>{ct}</span><span>%{r.toFixed(1)}</span></div>
              <div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-indigo-500" style={{ width: `${r}%` }} /></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

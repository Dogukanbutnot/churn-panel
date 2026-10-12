import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Customers from './pages/Customers'
import Dashboard from './pages/Dashboard'
import { useCustomers } from './hooks/useCustomers'

const link = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`

export default function App() {
  const { customers, add, update, remove, reset } = useCustomers()
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3">
            <h1 className="mr-4 text-lg font-bold">📡 Telekom Churn Paneli</h1>
            <NavLink to="/" end className={link}>Dashboard</NavLink>
            <NavLink to="/musteriler" className={link}>Müşteriler</NavLink>
            <button onClick={() => confirm('Veri ilk haline dönsün mü?') && reset()} className="ml-auto text-xs text-slate-400 hover:text-slate-700">Veriyi sıfırla</button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">
          <Routes>
            <Route path="/" element={<Dashboard customers={customers} />} />
            <Route path="/musteriler" element={<Customers customers={customers} add={add} update={update} remove={remove} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

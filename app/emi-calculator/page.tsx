'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, RefreshCcw, Info, Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { calculateEMI, formatRs } from '@/lib/emi-utils'
import { getBanks } from '@/api/services/emi.service'
import { getPageBySlug } from '@/api/services/page.service'
import type { EmiBank } from '@/api/types/emi.types'
import type { Page } from '@/api/types/page.types'
import { Slider } from '@/components/ui/slider'
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { BankMark } from '@/components/global_ui/BankMark'
import { BannerCarousel } from '@/components/global_ui/BannerCarousel'
import dynamic from 'next/dynamic'

const BlogContent = dynamic(() => import('@/components/page_ui/BlogContent.client'))

type Tab = 'emi' | 'eligibility'
type CreditScore = 'excellent' | 'good' | 'fair' | 'poor'

const NAVY = '#0f2557'
const RED = '#cd2028'
const PIE_COLORS = [NAVY, RED]

function creditRate(s: CreditScore) {
  return s === 'excellent' ? 10 : s === 'good' ? 13 : s === 'fair' ? 16 : 20
}

function rawEmi(p: number, annualRate: number, n: number) {
  if (annualRate === 0) return p / n
  const r = annualRate / 100 / 12
  return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function SectionCard({
  label,
  right,
  children,
}: {
  label: string
  right?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#e8edf5] px-5 py-3">
        <p className="text-[11px] font-bold uppercase tracking-[.07em] text-[#0f2557]">{label}</p>
        {right}
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )
}

function Row({
  label,
  value,
  bold,
}: {
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#e8edf5] last:border-none">
      <span className={cn('text-xs', bold ? 'font-bold text-[#0f2557]' : 'text-[#5a6e8a]')}>{label}</span>
      <span className={cn('text-xs tabular-nums', bold ? 'font-extrabold text-[#cd2028]' : 'font-semibold text-[#0f2557]')}>
        {value}
      </span>
    </div>
  )
}

export default function EmiCalculatorPage() {
  const [tab, setTab] = useState<Tab>('emi')

  // EMI state
  const [banks, setBanks] = useState<EmiBank[]>([])
  const [loading, setLoading] = useState(true)
  const [loanAmount, setLoanAmount] = useState<number | ''>(500000)
  const [interestRate, setInterestRate] = useState(0)
  const [selectedBankId, setSelectedBankId] = useState<string | null>(null)
  const [tenure, setTenure] = useState<number | null>(null)

  // Eligibility state
  const [income, setIncome] = useState<number | ''>(50000)
  const [eligLoan, setEligLoan] = useState<number | ''>(300000)
  const [eligTenure, setEligTenure] = useState(12)
  const [obligations, setObligations] = useState<number | ''>(0)
  const [creditScore, setCreditScore] = useState<CreditScore>('good')

  const [pageData, setPageData] = useState<Page | null>(null)

  useEffect(() => {
    getBanks().then(setBanks).catch(() => {}).finally(() => setLoading(false))
    getPageBySlug("emi-calculator").then(setPageData).catch(() => {})
  }, [])

  const selectedBank = useMemo(
    () => banks.find((b) => b.id === selectedBankId) ?? null,
    [banks, selectedBankId],
  )
  const tenureOptions = useMemo(
    () => selectedBank?.tenure_options ?? [],
    [selectedBank],
  )
  useEffect(() => { setTenure(null) }, [selectedBankId])

  const loan = loanAmount || 0
  const inc = income || 0
  const eLoan = eligLoan || 0
  const oblig = obligations || 0

  const emiResult = useMemo(() => {
    if (!loan || !tenure) return null
    return calculateEMI(loan, interestRate, tenure)
  }, [loan, interestRate, tenure])

  const pieData = useMemo(() => [
    { name: 'Principal', value: loan || 1 },
    { name: 'Interest', value: emiResult ? Math.max(emiResult.totalInterest, 0) : 0 },
  ], [emiResult, loan])

  const hasInterest = (emiResult?.totalInterest ?? 0) > 0
  const canApply = !!selectedBank && !!tenure && loan > 0

  const resetCalc = useCallback(() => {
    setLoanAmount(500000)
    setInterestRate(0)
    setSelectedBankId(null)
    setTenure(null)
  }, [])

  const eligibility = useMemo(() => {
    const rate = creditRate(creditScore)
    const monthlyEmi = rawEmi(eLoan, rate, eligTenure)
    const totalOblig = oblig + monthlyEmi
    const dti = inc > 0 ? (totalOblig / inc) * 100 : 100
    const maxAffordable = inc > 0
      ? Math.max(0, (inc * 0.4 - oblig) * eligTenure / (1 + (rate / 100 / 12) * eligTenure))
      : 0
    const incomeOk = inc >= 15000
    const creditOk = creditScore === 'excellent' || creditScore === 'good'
    const dtiOk = dti <= 40
    const eligible = incomeOk && creditOk && dtiOk
    return { rate, monthlyEmi, dti, maxAffordable, incomeOk, creditOk, dtiOk, eligible }
  }, [inc, eLoan, eligTenure, oblig, creditScore])

  const fieldCls = 'h-10 w-full rounded-lg border border-[#e8edf5] bg-[#f8fafd] pl-9 pr-3 text-sm font-bold text-[#0f2557] placeholder:text-[#b0bdd0] hover:border-[#b0bdd0] focus:border-[#0f2557] focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#cd2028]/20 focus:shadow-sm transition-all'
  const selectCls = 'h-10 w-full appearance-none rounded-lg border border-[#e8edf5] bg-[#f8fafd] pl-3 pr-9 text-sm font-semibold text-[#0f2557] focus:border-[#0f2557] focus:outline-none transition cursor-pointer'
  const selectWrap = (sel: React.ReactNode) => (
    <div className="relative">
      {sel}
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-[#5a6e8a]" />
    </div>
  )

  const TABS: { id: Tab; label: string }[] = [
    { id: 'emi', label: 'EMI Calculator' },
    { id: 'eligibility', label: 'Eligibility Check' },
  ]

  return (
    <div className="min-h-screen bg-[#f4f6fb] mb-4">

      {/* Page hero */}
      <div className="bg-[#0f2557] pt-25 ">
        <div className="mx-auto max-w-6xl px-6  ">
          <p className="text-[11px] font-semibold uppercase tracking-[.14em] text-[#8fa8d8]">
            Horizon Nepal · Finance
          </p>
          <h1 className="mt-1.5 text-2xl font-bold text-white leading-snug">
            {pageData?.title || 'EMI Calculator & Eligibility'}
          </h1>
          <p className="mt-2 text-sm text-[#8fa8d8] max-w-lg leading-relaxed">
            Plan your construction project financing. Estimate monthly
            payments or check loan eligibility instantly.
          </p>

          {/* Tabs — inside hero, flush to bottom */}
          <div className="flex gap-1 mt-8 border-t border-white/10">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  'px-5 py-3 text-xs font-semibold border-b-2 transition-colors',
                  tab === t.id
                    ? 'text-white border-[#cd2028]'
                    : 'text-[#6e8ec4] border-transparent hover:text-[#a8c0e0]',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-6">

        {/* ── EMI TAB ── */}
        {tab === 'emi' && (
          <div className="grid gap-5 lg:grid-cols-2 items-start">
            <div className="space-y-3">

              <SectionCard label="Loan Amount">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#5a6e8a] select-none">
                    Rs.
                  </span>
                  <input
                    type="number"
                    min={0}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                    className={cn(fieldCls, 'text-lg')}
                    placeholder="0"
                  />
                </div>
              </SectionCard>

              <SectionCard
                label="Interest Rate"
                right={
                  <span className="bg-[#0f2557] text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    {interestRate}%
                  </span>
                }
              >
                <div className="[&_[data-slot=slider-thumb]]:bg-[#cd2028] [&_[data-slot=slider-thumb]]:border-[#cd2028] [&_[data-slot=slider-range]]:bg-[#cd2028]">
                  <Slider
                    value={[interestRate]}
                    onValueChange={([v]) => setInterestRate(v)}
                    min={0}
                    max={24}
                    step={0.5}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-medium text-[#5a6e8a]">
                  <span>0%</span><span>12%</span><span>24%</span>
                </div>
              </SectionCard>

              <SectionCard label="Partner Bank">
                {loading ? (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {Array.from({ length: 4 }, (_, i) => (
                      <div key={i} className="h-14 animate-pulse rounded-lg bg-[#f0f4fb]" />
                    ))}
                  </div>
                ) : banks.length === 0 ? (
                  <p className="py-6 text-center text-sm text-[#5a6e8a]">No banks available</p>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {banks.map((bank) => {
                      const active = bank.id === selectedBankId
                      return (
                        <button
                          key={bank.id}
                          onClick={() => setSelectedBankId(bank.id)}
                          className={cn(
                            'flex items-center gap-3 rounded-lg border p-3 text-left transition',
                            active
                              ? 'border-[#0f2557] bg-[#ebf0fb] ring-1 ring-[#0f2557]/20'
                              : 'border-[#e8edf5] bg-[#f8fafd] hover:border-[#b0bdd0] hover:bg-white',
                          )}
                        >
                          <div className="size-9 shrink-0 overflow-hidden rounded-lg border border-[#e8edf5] bg-white flex items-center justify-center">
                            {bank.logo ? (
                              <Image
                                src={bank.logo}
                                alt={bank.name}
                                width={36}
                                height={36}
                                className="size-full object-contain p-0.5"
                              />
                            ) : (
                              <BankMark name={bank.name} />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={cn('truncate text-xs font-semibold', active ? 'text-[#0f2557]' : 'text-[#3d526e]')}>
                              {bank.name}
                            </p>
                            <p className="text-[10px] text-[#5a6e8a]">
                              {bank.tenure_options?.length ?? 0} plans
                            </p>
                          </div>
                          {active && <Check className="size-3 shrink-0 text-[#0f2557]" />}
                        </button>
                      )
                    })}
                  </div>
                )}
              </SectionCard>

              <SectionCard
                label="Repayment Tenure"
                right={
                  tenure
                    ? <span className="bg-[#e8edf5] text-[#0f2557] text-xs font-bold px-2.5 py-1 rounded-md">{tenure}m</span>
                    : undefined
                }
              >
                {tenureOptions.length === 0 ? (
                  <p className="text-xs text-[#5a6e8a]">
                    {selectedBank ? 'No plans configured' : 'Select a bank to continue'}
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {tenureOptions.map((m) => (
                      <button
                        key={m}
                        onClick={() => setTenure(m)}
                        className={cn(
                          'h-8 rounded-lg border px-3 text-xs font-semibold transition',
                          tenure === m
                            ? 'border-[#0f2557] bg-[#0f2557] text-white'
                            : 'border-[#e8edf5] bg-white text-[#3d526e] hover:border-[#0f2557]/40 hover:text-[#0f2557]',
                        )}
                      >
                        {m}m
                      </button>
                    ))}
                  </div>
                )}
              </SectionCard>
            </div>

            {/* Summary panel */}
            <div className="space-y-3 lg:sticky lg:top-4">
              <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden">
                <div className="bg-[#0f2557] px-5 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#8fa8d8]">
                    Monthly EMI
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-white tracking-tight">
                    {emiResult ? formatRs(emiResult.emi) : 'Rs. —'}
                  </p>
                  <p className="mt-1.5 text-xs text-[#8fa8d8]">
                    {tenure && selectedBank
                      ? `${tenure} months · ${selectedBank.name}`
                      : 'Select amount, bank and tenure'}
                  </p>
                </div>

                {/* Donut */}
                <div className="flex items-center gap-4 px-5 pt-4">
                  <div className="size-20 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={18}
                          outerRadius={36}
                          dataKey="value"
                          strokeWidth={0}
                        >
                          {pieData.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[
                      { color: NAVY, label: 'Principal', val: formatRs(loan) },
                      { color: RED, label: 'Interest', val: emiResult ? formatRs(emiResult.totalInterest) : 'Rs. 0' },
                    ].map(({ color, label, val }) => (
                      <div key={label} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5 text-[#5a6e8a]">
                          <span className="size-2 rounded-sm shrink-0" style={{ background: color }} />
                          {label}
                        </div>
                        <span className="font-semibold text-[#0f2557] tabular-nums">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-5 pt-2 pb-1">
                  <Row label="Loan amount" value={formatRs(loan)} />
                  {hasInterest && (
                    <Row label="Total interest" value={formatRs(emiResult!.totalInterest)} />
                  )}
                  <Row
                    label="Total payable"
                    value={emiResult ? formatRs(emiResult.totalPayment) : formatRs(loan)}
                    bold
                  />
                </div>

                <div className="mx-5 mb-3 flex items-start gap-2 rounded-lg border border-[#e8edf5] bg-[#f8fafd] px-3 py-2.5">
                  <Info className="mt-0.5 size-3 shrink-0 text-[#5a6e8a]" />
                  <p className="text-[10px] text-[#5a6e8a] leading-relaxed">
                    {interestRate === 0
                      ? 'Final rates subject to bank terms. Estimate only.'
                      : `Calculated at ${interestRate}% annual interest rate.`}
                  </p>
                </div>

                <div className="flex gap-2 px-5 pb-4 border-t border-[#e8edf5] pt-3">
                  <button
                    disabled={!canApply}
                    className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#cd2028] text-xs font-bold text-white transition hover:bg-[#b01c22] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Apply for EMI <ArrowRight className="size-3.5" />
                  </button>
                  <button
                    onClick={resetCalc}
                    className="flex size-10 items-center justify-center rounded-lg border border-[#e8edf5] bg-white text-[#5a6e8a] transition hover:border-[#0f2557] hover:text-[#0f2557]"
                  >
                    <RefreshCcw className="size-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ── ELIGIBILITY TAB ── */}
        {tab === 'eligibility' && (
          <div className="grid gap-5 lg:grid-cols-2 items-start">
            <div className="space-y-3">

              <SectionCard label="Employment">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0f2557]">Employment type</label>
                    {selectWrap(
                      <select
                        className={selectCls}
                        onChange={(e) => {}}
                      >
                        <option>Salaried</option>
                        <option>Self-employed</option>
                        <option>Business owner</option>
                      </select>
                    )}
                  </div>
                    <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0f2557]">Monthly income</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#5a6e8a] select-none">Rs.</span>
                      <input
                        type="number"
                        min={0}
                        value={income}
                        onChange={(e) => setIncome(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                        className={fieldCls}
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard label="Loan Details">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0f2557]">Requested amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#5a6e8a] select-none">Rs.</span>
                      <input
                        type="number"
                        min={0}
                        value={eligLoan}
                        onChange={(e) => setEligLoan(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                        className={fieldCls}
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0f2557]">Loan tenure</label>
                    {selectWrap(
                      <select
                        className={selectCls}
                        value={eligTenure}
                        onChange={(e) => setEligTenure(Number(e.target.value))}
                      >
                        {[6, 12, 18, 24, 36].map((m) => (
                          <option key={m} value={m}>{m} months</option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0f2557]">Existing monthly obligations</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#5a6e8a] select-none">Rs.</span>
                      <input
                        type="number"
                        min={0}
                        value={obligations}
                        onChange={(e) => setObligations(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                        className={fieldCls}
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard label="Credit Profile">
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#0f2557]">Approximate credit score</label>
                    {selectWrap(
                      <select
                        className={selectCls}
                        value={creditScore}
                        onChange={(e) => setCreditScore(e.target.value as CreditScore)}
                      >
                        <option value="excellent">Excellent (750+)</option>
                        <option value="good">Good (650–750)</option>
                        <option value="fair">Fair (550–650)</option>
                        <option value="poor">Poor (below 550)</option>
                      </select>
                    )}
                </div>
              </SectionCard>
            </div>

            {/* Eligibility result */}
            <div className="space-y-3 lg:sticky lg:top-4">
              <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden">
                <div
                  className={cn(
                    'px-5 py-5',
                    eligibility.eligible
                      ? 'bg-[#0a5c2e]'
                      : !eligibility.incomeOk || !eligibility.creditOk
                      ? 'bg-[#8c1a1a]'
                      : 'bg-[#0f2557]',
                  )}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[.12em] text-white/60">
                    Eligibility Status
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-white">
                    {eligibility.eligible
                      ? 'Likely Eligible'
                      : !eligibility.incomeOk || !eligibility.creditOk
                      ? 'Not Eligible'
                      : 'Review Needed'}
                  </p>
                  <p className="mt-1.5 text-xs text-white/70 leading-relaxed">
                    {eligibility.eligible
                      ? `Up to ${formatRs(eligibility.maxAffordable)} at ~${eligibility.rate}% rate`
                      : !eligibility.incomeOk
                      ? 'Minimum income of Rs. 15,000 required'
                      : !eligibility.creditOk
                      ? 'Credit score improvement recommended'
                      : 'Debt-to-income ratio too high'}
                  </p>
                </div>

                <div className="px-5 pt-2 pb-1">
                  <Row label="Max eligible amount" value={formatRs(Math.min(eligibility.maxAffordable, eLoan * 2))} />
                  <Row label="Estimated EMI" value={formatRs(eligibility.monthlyEmi)} />
                  <Row label="Debt-to-income ratio" value={inc > 0 ? `${eligibility.dti.toFixed(1)}%` : '—'} />
                  <div className="flex items-center justify-between py-2 border-b border-[#e8edf5]">
                    <span className="text-xs text-[#5a6e8a]">Income check</span>
                    <span className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded',
                      eligibility.incomeOk ? 'bg-[#d4f0e0] text-[#0a5c2e]' : 'bg-[#fde0e0] text-[#8c1a1a]',
                    )}>
                      {eligibility.incomeOk ? 'Meets minimum' : 'Below minimum'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-xs text-[#5a6e8a]">Credit score</span>
                    <span className={cn(
                      'text-[10px] font-bold px-2 py-0.5 rounded',
                      creditScore === 'excellent' || creditScore === 'good'
                        ? 'bg-[#d4f0e0] text-[#0a5c2e]'
                        : creditScore === 'fair'
                        ? 'bg-[#fef3d0] text-[#7a4f00]'
                        : 'bg-[#fde0e0] text-[#8c1a1a]',
                    )}>
                      {creditScore === 'excellent' ? 'Excellent' : creditScore === 'good' ? 'Good' : creditScore === 'fair' ? 'Fair' : 'Poor'}
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-4 border-t border-[#e8edf5] pt-3">
                  <button
                    disabled={!eligibility.eligible}
                    className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-[#cd2028] text-xs font-bold text-white transition hover:bg-[#b01c22] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Proceed to apply <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-[#e8edf5] bg-white overflow-hidden">
                <div className="border-b border-[#e8edf5] px-5 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-[.07em] text-[#0f2557]">How eligibility works</p>
                </div>
                {[
                  ['Income and obligations', 'We assess disposable income after existing commitments.'],
                  ['Debt-to-income ratio', 'Total obligations should stay under 40% of monthly income.'],
                  ['Credit score', 'A good score (650+) significantly improves approval chances.'],
                ].map(([title, desc], i) => (
                  <div key={i} className="flex gap-3 px-5 py-3 border-b border-[#e8edf5] last:border-none">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e8edf5] text-[9px] font-extrabold text-[#0f2557]">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#0f2557]">{title}</p>
                      <p className="mt-0.5 text-[11px] text-[#5a6e8a]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PAGE CONTENT ── */}
        {pageData?.content && (
          <div className="mt-10">
            <p className="text-[11px] font-bold uppercase tracking-[.07em] text-[#0f2557] mb-4">
              About EMI & Financing
            </p>
            <BlogContent content={pageData.content} />
          </div>
        )}

        {/* ── BANNER GALLERY ── */}
        {pageData?.banner_images && pageData.banner_images.length > 0 && (
          <div className="mt-10 mb-6 relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
            <BannerCarousel initialBanners={pageData.banner_images} className="inset-0" imgClassName="object-contain" />
          </div>
        )}
      </div>
    </div>
  )
}
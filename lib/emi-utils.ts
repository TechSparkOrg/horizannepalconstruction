export function calculateEMI(P: number, annualRate: number, n: number) {
  if (annualRate === 0 || n <= 0) {
    const emi = n > 0 ? P / n : 0
    return { emi, totalInterest: 0, totalPayment: P }
  }
  const r = annualRate / 12 / 100
  const factor = Math.pow(1 + r, n)
  const emi = (P * r * factor) / (factor - 1)
  const totalPayment = emi * n
  const totalInterest = totalPayment - P
  return { emi, totalInterest, totalPayment }
}

export function formatRs(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("NPR", "Rs.")
}

export function getBankInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
}

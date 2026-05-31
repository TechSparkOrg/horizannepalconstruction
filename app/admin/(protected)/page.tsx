export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brand-dark">Dashboard</h1>
      <p className="mt-1 text-mid-gray text-sm">Welcome to the admin panel.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { label: "Total Projects", value: "15" },
          { label: "Blog Posts", value: "6" },
          { label: "Pending Updates", value: "0" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-light-gray/40 p-5">
            <p className="text-xs text-mid-gray">{c.label}</p>
            <p className="mt-1 text-2xl font-bold text-brand-dark">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import Logo from './Logo'

const Dashboard = () => {
  return (
    <section aria-label="Client Dashboard" className="legacy-card">
      <div className="legacy-header">
        <Logo size="sm" />
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back, elite client.</p>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
import StatsCards from '../../components/admin/dashboard/StatsCards'
import AnalyticsCharts from '../../components/admin/dashboard/AnalyticsCharts'
import RecentActivities from '../../components/admin/dashboard/RecentActivities'

function DashboardAdmin() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            <StatsCards />
            <AnalyticsCharts />
            <RecentActivities />
        </div>
    )
}

export default DashboardAdmin
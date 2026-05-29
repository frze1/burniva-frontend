import { useState, useEffect } from 'react'
import StatsCards from '../../components/admin/dashboard/StatsCards'
import AnalyticsCharts from '../../components/admin/dashboard/AnalyticsCharts'
import RecentActivities from '../../components/admin/dashboard/RecentActivities'
import adminService from '../../services/admin/adminService'

function DashboardAdmin() {
    const [stats, setStats] = useState(null)
    const [analytics, setAnalytics] = useState(null)
    const [activities, setActivities] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsData = await adminService.getStats()
                setStats(statsData)

                const analyticsData = await adminService.getAnalyticsData()
                setAnalytics(analyticsData)

                const activitiesData = await adminService.getRecentActivities()
                setActivities(activitiesData)
            } catch (error) {
                console.error("Failed to fetch dashboard data", error)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            <StatsCards stats={stats} />
            <AnalyticsCharts trendData={analytics?.trendData} distributionData={analytics?.distributionData} />
            <RecentActivities 
                activityData={analytics?.activityData} 
                activities={activities.length > 0 ? activities : []} 
            />
        </div>
    )
}

export default DashboardAdmin
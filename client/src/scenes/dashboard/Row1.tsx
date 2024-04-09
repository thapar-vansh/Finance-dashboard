import BoxHeader from '@/components/BoxHeader'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { useTheme } from '@mui/material'
import { useMemo } from 'react'
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'

const Row1 = () => {
    const { palette } = useTheme()
    const { data } = useGetKpisQuery()
    console.log('data', data)
    const revenueExpenses = useMemo(() => {
        return (
            data &&
            data[0].monthlyData.map(({ month, revenue, expenses }) => {
                return {
                    name: month.substring(0, 3),
                    revenue: revenue,
                    expenses: expenses
                }
            })
        )

    }, [data])
    return (
        <>
            <DashboardBox gridArea="a">
                <BoxHeader title='Revenue & expenses' subtitle='Topline represent revenue, bottom line represents expense' sideText='+4%'></BoxHeader>
                <AreaChart width={380} height={350} data={revenueExpenses}
                    margin={{ top: 15, right: 25, left: -10, bottom: 30 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={palette.primary[300]} stopOpacity={0.5} />
                            <stop offset="95%" stopColor={palette.primary[300]} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                    <YAxis tickLine={false} axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} domain={[8000, 23000]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke={palette.primary.main} dot={true} fillOpacity={1} fill="url(#colorRevenue)" />
                    <Area type="monotone" dataKey="expenses" stroke={palette.primary.main} dot={true} fillOpacity={1} fill="url(#colorExpenses)" />

                </AreaChart>
            </DashboardBox>
            <DashboardBox gridArea="b"></DashboardBox>
            <DashboardBox gridArea="c"></DashboardBox>
        </>
    )
}

export default Row1

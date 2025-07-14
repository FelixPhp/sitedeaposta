import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const StatsCard = ({ title, value, change, changeType, icon: Icon }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        {Icon && <Icon className="h-4 w-4 text-gray-400" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <div className="flex items-center text-xs text-gray-500 mt-1">
            {changeType === 'increase' ? (
              <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
            )}
            <span className={changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
              {change}
            </span>
            <span className="ml-1">vs. semana anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default StatsCard


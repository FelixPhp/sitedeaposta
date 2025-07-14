import { Clock, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const MatchCard = ({ match }) => {
  const { homeTeam, awayTeam, homeScore, awayScore, status, time, competition, isLive } = match

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-500 flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {competition}
          </div>
          {isLive && (
            <Badge variant="destructive" className="animate-pulse">
              AO VIVO
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">{homeTeam.charAt(0)}</span>
            </div>
            <span className="font-medium text-gray-900 truncate">{homeTeam}</span>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-4 mx-4">
            {status === 'finished' || isLive ? (
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {homeScore} - {awayScore}
                </div>
                <div className="text-xs text-gray-500 flex items-center justify-center">
                  {isLive ? (
                    <>
                      <Clock className="h-3 w-3 mr-1" />
                      {time}'
                    </>
                  ) : (
                    'Finalizado'
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {time}
                </div>
              </div>
            )}
          </div>

          {/* Away Team */}
          <div className="flex items-center space-x-3 flex-1 justify-end">
            <span className="font-medium text-gray-900 truncate">{awayTeam}</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold">{awayTeam.charAt(0)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MatchCard


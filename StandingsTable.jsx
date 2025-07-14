import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const StandingsTable = ({ standings, title = "Classificação" }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-1 font-medium text-gray-600">#</th>
                <th className="text-left py-2 px-2 font-medium text-gray-600">Time</th>
                <th className="text-center py-2 px-1 font-medium text-gray-600">J</th>
                <th className="text-center py-2 px-1 font-medium text-gray-600">V</th>
                <th className="text-center py-2 px-1 font-medium text-gray-600">E</th>
                <th className="text-center py-2 px-1 font-medium text-gray-600">D</th>
                <th className="text-center py-2 px-1 font-medium text-gray-600">GP</th>
                <th className="text-center py-2 px-1 font-medium text-gray-600">GC</th>
                <th className="text-center py-2 px-1 font-medium text-gray-600">SG</th>
                <th className="text-center py-2 px-1 font-medium text-gray-600">Pts</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr key={team.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-1">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{index + 1}</span>
                      {index < 4 && (
                        <div className="w-1 h-4 bg-green-500 ml-2 rounded"></div>
                      )}
                      {index >= standings.length - 3 && (
                        <div className="w-1 h-4 bg-red-500 ml-2 rounded"></div>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">{team.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-gray-900">{team.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-1 text-gray-600">{team.played}</td>
                  <td className="text-center py-3 px-1 text-gray-600">{team.wins}</td>
                  <td className="text-center py-3 px-1 text-gray-600">{team.draws}</td>
                  <td className="text-center py-3 px-1 text-gray-600">{team.losses}</td>
                  <td className="text-center py-3 px-1 text-gray-600">{team.goalsFor}</td>
                  <td className="text-center py-3 px-1 text-gray-600">{team.goalsAgainst}</td>
                  <td className="text-center py-3 px-1">
                    <span className={`${team.goalDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                    </span>
                  </td>
                  <td className="text-center py-3 px-1">
                    <Badge variant="secondary" className="font-semibold">
                      {team.points}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Classificação para Champions League</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Rebaixamento</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default StandingsTable


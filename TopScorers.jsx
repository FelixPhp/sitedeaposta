import { Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const TopScorers = ({ scorers, title = "Artilheiros" }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <Target className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scorers.map((scorer, index) => (
            <div key={scorer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">{scorer.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{scorer.name}</p>
                  <p className="text-sm text-gray-500">{scorer.team}</p>
                </div>
              </div>
              
              <div className="text-right">
                <Badge variant="secondary" className="font-bold text-lg">
                  {scorer.goals}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">{scorer.matches} jogos</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TopScorers


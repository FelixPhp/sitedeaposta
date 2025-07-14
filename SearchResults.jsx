import { Search, Users, Trophy, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const SearchResults = ({ results, query, onClose }) => {
  if (!query || results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 p-4 z-50">
        <div className="text-center text-gray-500">
          <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p>Digite para pesquisar times, jogadores ou competições</p>
        </div>
      </div>
    )
  }

  const getIcon = (type) => {
    switch (type) {
      case 'team':
        return <Users className="h-4 w-4" />
      case 'competition':
        return <Trophy className="h-4 w-4" />
      case 'match':
        return <Calendar className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case 'team':
        return 'Time'
      case 'player':
        return 'Jogador'
      case 'competition':
        return 'Competição'
      case 'match':
        return 'Partida'
      default:
        return 'Resultado'
    }
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
      <div className="p-2">
        <div className="text-sm text-gray-500 mb-2 px-2">
          {results.length} resultado(s) para "{query}"
        </div>
        
        {results.map((result, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md cursor-pointer"
            onClick={onClose}
          >
            <div className="flex-shrink-0">
              {result.image ? (
                <img src={result.image} alt={result.name} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {getIcon(result.type)}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {result.name}
                </p>
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel(result.type)}
                </Badge>
              </div>
              {result.description && (
                <p className="text-xs text-gray-500 truncate">
                  {result.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults


import { useState } from 'react'
import { Search, Menu, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SearchResults from './SearchResults'
import { mockSearchResults } from '../data/mockData'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const filtered = mockSearchResults.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }

  const handleCloseSearch = () => {
    setShowResults(false)
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">SportStats</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Futebol
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Basquete
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Tênis
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Mais
            </a>
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Pesquisar times, jogadores..."
                className="pl-10 pr-4 py-2 w-64 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowResults(true)}
              />
              {showResults && (
                <SearchResults
                  results={searchResults}
                  query={searchQuery}
                  onClose={handleCloseSearch}
                />
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
              <User className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Entrar</span>
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


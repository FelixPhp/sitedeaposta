import { useState } from 'react'
import { Trophy, Users, Target, Calendar } from 'lucide-react'
import Header from './components/Header'
import Footer from './components/Footer'
import MatchCard from './components/MatchCard'
import StatsCard from './components/StatsCard'
import StandingsTable from './components/StandingsTable'
import StatsChart from './components/StatsChart'
import TopScorers from './components/TopScorers'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { mockMatches, mockStandings, mockGoalStats, mockWinPercentage, mockTopScorers } from './data/mockData'
import './App.css'

const mockStats = [
  {
    title: 'Partidas Hoje',
    value: '24',
    change: '+12%',
    changeType: 'increase',
    icon: Calendar
  },
  {
    title: 'Times Ativos',
    value: '156',
    change: '+3%',
    changeType: 'increase',
    icon: Users
  },
  {
    title: 'Gols Marcados',
    value: '89',
    change: '+8%',
    changeType: 'increase',
    icon: Target
  },
  {
    title: 'Competições',
    value: '12',
    change: '0%',
    changeType: 'increase',
    icon: Trophy
  }
]

function App() {
  const [activeTab, setActiveTab] = useState('live')

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Estatísticas Esportivas
              <span className="block text-blue-200">ao Vivo</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Acompanhe resultados em tempo real, estatísticas detalhadas e análises dos seus esportes favoritos
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Explorar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockStats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Partidas</h2>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-96">
              <TabsTrigger value="live">Ao Vivo</TabsTrigger>
              <TabsTrigger value="today">Hoje</TabsTrigger>
              <TabsTrigger value="upcoming">Próximas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live" className="mt-6">
              <div className="grid gap-4">
                {mockMatches.filter(match => match.isLive).map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="today" className="mt-6">
              <div className="grid gap-4">
                {mockMatches.map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming" className="mt-6">
              <div className="grid gap-4">
                {mockMatches.filter(match => !match.isLive && match.status === 'scheduled').map(match => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Estatísticas e Análises</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Standings */}
            <div className="lg:col-span-2">
              <StandingsTable standings={mockStandings} title="La Liga - Classificação" />
            </div>
            
            {/* Top Scorers */}
            <div>
              <TopScorers scorers={mockTopScorers} />
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StatsChart
              data={mockGoalStats}
              type="bar"
              title="Gols por Time"
              dataKey="goals"
              nameKey="name"
            />
            <StatsChart
              data={mockWinPercentage}
              type="pie"
              title="Distribuição de Resultados"
              dataKey="value"
              nameKey="name"
            />
          </div>
        </div>
      </section>

      {/* Sports Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Esportes Disponíveis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <img src="/src/assets/icons/futebol.png" alt="Futebol" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Futebol</h3>
              <p className="text-gray-600">Acompanhe as principais ligas e competições de futebol mundial</p>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <img src="/src/assets/icons/basquete.png" alt="Basquete" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Basquete</h3>
              <p className="text-gray-600">NBA, NBB e outras competições de basquete</p>
            </div>
            
            <div className="text-center group cursor-pointer">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <img src="/src/assets/icons/tenis.png" alt="Tênis" className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tênis</h3>
              <p className="text-gray-600">Grand Slams, ATP e WTA tours</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default App


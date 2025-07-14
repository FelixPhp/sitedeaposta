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
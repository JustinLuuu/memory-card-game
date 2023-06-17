import './App.css'
import { CardsGrid } from './components/CardsGrid'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { GameProvider } from './components/context/GameContext'

function App() {
  return (
    <GameProvider>
      <Header />
      <CardsGrid />
      <Footer />
    </GameProvider>
  )
}

export default App

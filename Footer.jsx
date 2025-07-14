const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">SportStats</h3>
            <p className="text-gray-300 mb-4">
              Sua fonte confiável para estatísticas esportivas ao vivo. Acompanhe resultados, 
              classificações e análises detalhadas dos seus esportes favoritos.
            </p>
            <p className="text-gray-400 text-sm">
              © 2025 SportStats. Todos os direitos reservados.
            </p>
          </div>

          {/* Esportes */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Esportes</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Futebol</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Basquete</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Tênis</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Vôlei</a></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Sobre</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


export default function Footer() {
  return (
    <footer className="bg-black text-yellow-300 py-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-lg">© 2025 Biblioteca Escolar</span>
        </div>
        <div className="flex gap-6">
          <a href="mailto:contacto@biblioteca.edu" className="hover:text-blue-400 transition">Contacto</a>
          <a href="https://facebook.com" target="_blank" className="hover:text-blue-400 transition">Facebook</a>
          <a href="https://twitter.com" target="_blank" className="hover:text-blue-400 transition">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

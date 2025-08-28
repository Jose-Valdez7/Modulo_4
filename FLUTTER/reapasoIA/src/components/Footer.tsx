export default function Footer() {
  return (
    <footer className="App-footer bg-dark text-warning py-4 mt-auto shadow-lg">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center px-3">
        <div className="mb-3 mb-md-0">
          <span className="fw-bold fs-5">© 2025 Biblioteca Escolar</span>
        </div>
        <div className="d-flex gap-4">
          <a href="mailto:contacto@biblioteca.edu" className="text-warning text-decoration-none hover-footer">Contacto</a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-none hover-footer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-warning text-decoration-none hover-footer">Twitter</a>
        </div>
      </div>
      <style>{`
        .hover-footer:hover {
          color: var(--primary, #4f8cff) !important;
          text-decoration: underline;
          transition: color 0.3s;
        }
      `}</style>
    </footer>
  );
}

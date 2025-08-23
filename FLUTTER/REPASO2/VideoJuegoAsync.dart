void main (){

  print("═" * 60);
  print("    🎮: DESCARGANDO VIDEOJUEGO MIENTRAS TRABAJO");
  print("");
  
  print("💻 Llegué a la oficina, hora de trabajar");
  descargarJuego();
  print("📧 Revisando emails matutinos");
  print("☕ Me sirvo un café mientras reviso la agenda");
  print("💼 Empiezo con la reunión del equipo de desarrollo");
  
  // Simular actividades de trabajo mientras descarga
  Future.delayed(Duration(seconds: 2), () {
    print("📊 Analizando métricas del proyecto actual");
  });
  
  Future.delayed(Duration(seconds: 4), () {
    print("👥 Participando en videoconferencia con el cliente");
  });
  
  Future.delayed(Duration(seconds: 6), () {
    print("📝 Documentando los avances del día");
  });
  
  Future.delayed(Duration(seconds: 9), () {
    print("🏠 Terminando el día laboral, hora de irme a casa");
  });
}

Future<String> descargarArchivos() {
  print("⬇️ Conectando a los servidores de Steam...");
  print("📦 Iniciando descarga: Cyberpunk 2077 (70 GB)");
  return Future.delayed(Duration(seconds: 8), () {
    return "🎮 ¡Descarga completada! Listo para jugar";
  });
}

Future<String> instalarJuego() {
  print("⚙️ Instalando el juego y configurando archivos...");
  return Future.delayed(Duration(seconds: 3), () {
    return "✨ ¡Instalación completa! El juego está listo";
  });
}

void descargarJuego() async {
  print("🖥️ Abriendo Steam en mi computadora");
  print("🛒 Comprando el juego en oferta");
  
  // Esperar a que termine la descarga (esto toma tiempo)
  final mensajeDescarga = await descargarArchivos();
  print(mensajeDescarga);
  
  // Esperar a que termine la instalación
  final mensajeInstalacion = await instalarJuego();
  print(mensajeInstalacion);
  
  print("🚀 ¡Perfecto! Ya puedo jugar cuando llegue a casa");

}
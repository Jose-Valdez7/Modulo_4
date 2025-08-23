void main (){

  print("    🍲: COCINANDO MIENTRAS TRABAJO DESDE CASA");
  print("═" * 60);
  print("");
  
  print("🏠 Trabajando desde casa, es hora del almuerzo");  
  cocinarAlmuerzo();
  print("💻 Mientras tanto, continúo con mi trabajo");
  print("📞 Contestando llamadas de clientes");
  print("📨 Respondiendo emails urgentes");
  
  // Simular trabajo remoto mientras cocina
  Future.delayed(Duration(seconds: 1), () {
    print("👨‍💻 Revisando código en GitHub");
  });
  
  Future.delayed(Duration(seconds: 3), () {
    print("📋 Actualizando el estado de las tareas en Trello");
  });
  
  Future.delayed(Duration(seconds: 5), () {
    print("🎥 Entrando a reunión por Zoom");
  });
}

Future<String> cocinarArroz() {
  print("🍚 Poniendo arroz en la olla arrocera...");
  return Future.delayed(Duration(seconds: 4), () {
    return "🍚 ¡Arroz perfectamente cocido!";
  });
}

Future<String> cocinarPollo() {
  print("🍗 Sazonando y poniendo pollo en el horno...");
  return Future.delayed(Duration(seconds: 6), () {
    return "🍗 ¡Pollo dorado y jugoso listo!";
  });
}

Future<String> prepararEnsalada() {
  print("🥗 Cortando verduras para la ensalada...");
  return Future.delayed(Duration(seconds: 2), () {
    return "🥗 ¡Ensalada fresca preparada!";
  });
}

void cocinarAlmuerzo() async {
  print("👨‍🍳 Planificando el almuerzo de hoy");
  print("🛒 Sacando ingredientes del refrigerador");
  
  // Iniciar el arroz primero (toma más tiempo)
  print("▶️ Iniciando preparación del arroz...");
  final Future<String> arrozFuture = cocinarArroz();
  
  // Luego el pollo (también toma tiempo)
  print("▶️ Iniciando preparación del pollo...");
  final Future<String> polloFuture = cocinarPollo();
  
  // Mientras tanto preparo la ensalada (más rápido)
  final mensajeEnsalada = await prepararEnsalada();
  print(mensajeEnsalada);
  
  // Espero a que terminen el arroz y pollo
  final mensajeArroz = await arrozFuture;
  print(mensajeArroz);
  
  final mensajePollo = await polloFuture;
  print(mensajePollo);
  
  print("🍽️ ¡Almuerzo completo listo para servir!");
  print("😋 Hora de disfrutar la comida casera");
}
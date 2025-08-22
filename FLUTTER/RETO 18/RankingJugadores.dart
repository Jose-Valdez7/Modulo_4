void main(){

  // 1. Declara un Map<String, int> con puntajes
  print("\n1️⃣ Creando mapa de puntajes...");
  Map<String, int> puntajes = {};
  
  // 2. Agrega al menos cuatro jugadores con puntajes distintos
  print("\n2️⃣ Agregando jugadores con puntajes...");
  puntajes["Alex"] = 1250;
  puntajes["María"] = 1580;
  puntajes["Carlos"] = 970;
  puntajes["Sofia"] = 1340;
  print("   ✓ Jugadores agregados: $puntajes");
  
  // 3. Muestra todos los nombres de los jugadores registrados
  print("\n3️⃣ Mostrando nombres de jugadores...");
  print("   ✓ Jugadores registrados: ${puntajes.keys.toList()}");
  
  // 4. Imprime el puntaje de un jugador específico utilizando su nombre como clave
  print("\n4️⃣ Consultando puntaje específico...");
  String jugadorConsulta = "María";
  print("   ✓ Puntaje de $jugadorConsulta: ${puntajes[jugadorConsulta]} puntos");
  
  // 5. Modifica el puntaje de uno de los jugadores
  print("\n5️⃣ Modificando puntaje de un jugador...");
  String jugadorModificar = "Carlos";
  int puntajeAnterior = puntajes[jugadorModificar]!;
  puntajes[jugadorModificar] = 1150;
  print("   ✓ $jugadorModificar: $puntajeAnterior → ${puntajes[jugadorModificar]} puntos");
  
  // 6. Agrega un nuevo jugador con su respectivo puntaje
  print("\n6️⃣ Agregando nuevo jugador...");
  puntajes["Diego"] = 1420;
  print("   ✓ Nuevo jugador agregado: Diego con ${puntajes["Diego"]} puntos");
  
  // 7. Elimina a un jugador del mapa
  print("\n7️⃣ Eliminando un jugador...");
  String jugadorEliminar = "Alex";
  int? puntajeEliminado = puntajes.remove(jugadorEliminar);
  print("   ✓ Jugador eliminado: $jugadorEliminar ($puntajeEliminado puntos)");
  
  // 8. Imprime el contenido completo del mapa actualizado
  print("\n8️⃣ Mostrando ranking final actualizado...");
  print("   🏆 RANKING FINAL:");
  
  // Ordenar jugadores por puntaje (descendente)
  var jugadoresOrdenados = puntajes.entries.toList();
  jugadoresOrdenados.sort((a, b) => b.value.compareTo(a.value));
  
  for (int i = 0; i < jugadoresOrdenados.length; i++) {
    String medalla = "";
    switch (i) {
      case 0: medalla = "🥇"; break;
      case 1: medalla = "🥈"; break;
      case 2: medalla = "🥉"; break;
      default: medalla = "  "; break;
    }
    print("   $medalla ${i + 1}. ${jugadoresOrdenados[i].key}: ${jugadoresOrdenados[i].value} puntos");
  }
  
  print("\n   📊 Total de jugadores: ${puntajes.length}");
  print("   📈 Puntaje promedio: ${(puntajes.values.reduce((a, b) => a + b) / puntajes.length).toStringAsFixed(1)} puntos");
  
}
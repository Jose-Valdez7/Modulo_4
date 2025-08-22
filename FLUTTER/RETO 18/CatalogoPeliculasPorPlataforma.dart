void main(){
  // 2. Declara un Map<String, List<Pelicula>> para catálogo streaming
  print("\n1️⃣ Creando catálogo de streaming...");
  Map<String, List<Pelicula>> catalogoStreaming = {
    'Netflix': <Pelicula>[],
    'HBO': <Pelicula>[],
    'Disney+': <Pelicula>[]
  };
  print("   ✓ Catálogo creado con plataformas: ${catalogoStreaming.keys.toList()}");
  
  // 3. Agrega al menos dos películas a cada plataforma
  print("\n2️⃣ Agregando películas a cada plataforma...");
  
  // Netflix
  catalogoStreaming['Netflix']!.addAll([
    Pelicula("Stranger Things", 2016),
    Pelicula("The Crown", 2016),
    Pelicula("Squid Game", 2021)
  ]);
  
  // HBO
  catalogoStreaming['HBO']!.addAll([
    Pelicula("Game of Thrones", 2011),
    Pelicula("The Last of Us", 2023),
    Pelicula("House of the Dragon", 2022)
  ]);
  
  // Disney+
  catalogoStreaming['Disney+']!.addAll([
    Pelicula("The Mandalorian", 2019),
    Pelicula("WandaVision", 2021)
  ]);
  
  print("   ✓ Películas agregadas a todas las plataformas");
  
  // 4. Imprime los títulos de todas las películas disponibles en Netflix
  print("\n3️⃣ Mostrando películas de Netflix...");
  print("   🔴 NETFLIX:");
  for (Pelicula pelicula in catalogoStreaming['Netflix']!) {
    print("      • ${pelicula.titulo}");
  }
  
  // 5. Agrega una película nueva a Disney+
  print("\n4️⃣ Agregando nueva película a Disney+...");
  Pelicula nuevaPeliculaDisney = Pelicula("Loki", 2021);
  catalogoStreaming['Disney+']!.add(nuevaPeliculaDisney);
  print("   ✓ Película agregada a Disney+: ${nuevaPeliculaDisney.titulo}");
  
  // 6. Cambia el año de estreno de una película en HBO
  print("\n5️⃣ Modificando año de estreno en HBO...");
  Pelicula peliculaHBO = catalogoStreaming['HBO']!.firstWhere((p) => p.titulo == "Game of Thrones");
  int anioAnterior = peliculaHBO.anioEstreno;
  peliculaHBO.anioEstreno = 2010; // Cambiar el año
  print("   ✓ '${peliculaHBO.titulo}': $anioAnterior → ${peliculaHBO.anioEstreno}");
  
  // 7. Elimina una película de Netflix
  print("\n6️⃣ Eliminando película de Netflix...");
  Pelicula peliculaEliminada = catalogoStreaming['Netflix']!.removeAt(1); // Elimina "The Crown"
  print("   ✓ Película eliminada de Netflix: ${peliculaEliminada.titulo}");
  
  // 8. Recorre todo el mapa y muestra el catálogo completo
  print("\n7️⃣ Mostrando catálogo completo actualizado...");
  
  Map<String, String> iconos = {
    'Netflix': '🔴',
    'HBO': '⚫',
    'Disney+': '🔵'
  };
  
  catalogoStreaming.forEach((plataforma, peliculas) {
    print("\n   ${iconos[plataforma]} $plataforma (${peliculas.length} títulos):");
    if (peliculas.isEmpty) {
      print("      (Sin películas disponibles)");
    } else {
      for (int i = 0; i < peliculas.length; i++) {
        print("      ${i + 1}. ${peliculas[i]}");
      }
    }
  });
  
  // Estadísticas adicionales
  int totalPeliculas = catalogoStreaming.values
      .map((lista) => lista.length)
      .reduce((a, b) => a + b);
  
}

class Pelicula {
  String titulo;
  int anioEstreno;
  
  Pelicula(this.titulo, this.anioEstreno);
  
  @override
  String toString() {
    return '$titulo ($anioEstreno)';
  }
}
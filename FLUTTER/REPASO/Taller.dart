class Taller {
  static final String nombre = "Taller Mecánico Central";
  static String mensajeGeneral = "¡Bienvenidos al mejor taller!";
  static int _totalReparaciones = 0;

  static void cambiarMensaje(String nuevoMensaje) {
    mensajeGeneral = nuevoMensaje;
  }

  static void incrementarContador() {
    _totalReparaciones++;
  }

  static int obtenerReparaciones() {
    return _totalReparaciones;
  }
}

class Empleado {
  String nombre;

  Empleado(this.nombre);

  void actualizarMensajeDelTaller(String nuevoMensaje) {
    Taller.cambiarMensaje(nuevoMensaje);
  }
}

class Vehiculo {
  String placa;
  String diagnostico = "";
  String estado = "Pendiente";
  dynamic extraInfo;

  Vehiculo(this.placa);

  void registrarDiagnostico(String diagnostico) {
    this.diagnostico = diagnostico;
    this.estado = "Reparado";
    Taller.incrementarContador();
  }

  String resumen() {
    return """
=== RESUMEN DEL VEHÍCULO ===
Taller: ${Taller.nombre}
Mensaje: ${Taller.mensajeGeneral}
Placa: $placa
Diagnóstico: $diagnostico
Estado: $estado
Info Extra: $extraInfo
=========================""";
  }
}

void mainTaller() {
  print("═" * 60);
  print("        🔧 EJEMPLO COMPLETO - GESTIÓN DE TALLER 🔧");
  print("═" * 60);
  
  // 1. Crear un Empleado con nombre "Carlos"
  print("\n1️⃣ Creando empleado con nombre 'Carlos'...");
  Empleado Empleado1 = Empleado("Carlos");
  print("   ✓ Empleado creado: ${Empleado1.nombre}");
  
  // 2. Usar su método para cambiar el mensaje de bienvenida del taller
  print("\n2️⃣ Cambiando mensaje de bienvenida del taller...");
  print("   Mensaje anterior: ${Taller.mensajeGeneral}");
  Empleado1.actualizarMensajeDelTaller("¡Servicio de calidad garantizado las 24 horas!");
  print("   ✓ Mensaje actualizado: ${Taller.mensajeGeneral}");
  
  // 3. Crear dos objetos Vehiculo con placas diferentes
  print("\n3️⃣ Creando dos vehículos con placas diferentes...");
  Vehiculo vehiculo1 = Vehiculo("ABC-123");
  Vehiculo vehiculo2 = Vehiculo("XYZ-789");
  print("   ✓ Vehículo 1 creado con placa: ${vehiculo1.placa}");
  print("   ✓ Vehículo 2 creado con placa: ${vehiculo2.placa}");
  
  // 4. Llamar al método registrarDiagnostico en cada uno
  print("\n4️⃣ Registrando diagnósticos para cada vehículo...");
  vehiculo1.registrarDiagnostico("Cambio de aceite, filtros y revisión general");
  vehiculo2.registrarDiagnostico("Reparación del sistema de frenos y alineación");
  print("   ✓ Diagnóstico registrado para ${vehiculo1.placa}: ${vehiculo1.diagnostico}");
  print("   ✓ Diagnóstico registrado para ${vehiculo2.placa}: ${vehiculo2.diagnostico}");
  
  // 5. Asignar a extraInfo valores de tipos distintos como un texto y un decimal
  print("\n5️⃣ Asignando información extra de diferentes tipos...");
  vehiculo1.extraInfo = "Kilometraje: 45,000 km - Cliente frecuente";
  vehiculo2.extraInfo = 1250.75; // Costo de repuestos
  print("   ✓ Vehículo 1 - Info extra (String): ${vehiculo1.extraInfo}");
  print("   ✓ Vehículo 2 - Info extra (double): ${vehiculo2.extraInfo}");
  
  // 6. Mostrar su resumen
  print("\n6️⃣ Mostrando resumen de cada vehículo...");
  print("\n--- RESUMEN VEHÍCULO 1 ---");
  print(vehiculo1.resumen());
  print("\n--- RESUMEN VEHÍCULO 2 ---");
  print(vehiculo2.resumen());
  
  // 7. Mostrar cuántos vehículos han sido reparados llamando a una función de la clase Taller
  print("\n7️⃣ Consultando estadísticas del taller...");
  print("   📊 Total de vehículos reparados: ${Taller.obtenerReparaciones()}");
  print("   🏪 Nombre del taller: ${Taller.nombre}");
  print("   💬 Mensaje actual: ${Taller.mensajeGeneral}");
}

void main() {
  mainTaller();
}



import 'servidor_correo.dart';

void main() {
  print("═" * 60);
  print("    📧 IMPLEMENTACIÓN DEL PATRÓN SINGLETON");
  print("         SERVIDOR DE CORREO ELECTRÓNICO");
  print("═" * 60);
  print("");
  
  // 1. Crear dos referencias distintas a la clase ServidorCorreo
  print("1️⃣ Creando dos referencias distintas al ServidorCorreo...");
  final servidor1 = ServidorCorreo();
  final servidor2 = ServidorCorreo();
  
  // Mostrar información inicial
  print("📋 Información inicial de las instancias:");
  print("   servidor1 hashCode: ${servidor1.hashCode}");
  print("   servidor2 hashCode: ${servidor2.hashCode}");
  print("");
  
  // 2. Conectar el servidor utilizando una de las referencias
  print("2️⃣ Conectando servidor usando la primera referencia...");
  servidor1.conectar();
  print("");
  
  // Verificar estado de conexión en ambas referencias
  print("🔍 Verificando estado en ambas referencias:");
  print("   servidor1.estaConectado: ${servidor1.estaConectado}");
  print("   servidor2.estaConectado: ${servidor2.estaConectado}");
  print("");
  
  // 3. Enviar al menos dos correos electrónicos utilizando ambas referencias
  print("3️⃣ Enviando correos electrónicos usando ambas referencias...");
  print("");
  
  print("📧 Enviando primer correo con servidor1:");
  servidor1.enviarCorreo(
    "juan.perez@empresa.com", 
    "Reporte mensual de ventas"
  );
  print("");
  
  print("📧 Enviando segundo correo con servidor2:");
  servidor2.enviarCorreo(
    "maria.gonzalez@cliente.com", 
    "Propuesta comercial 2024"
  );
  print("");
  
  print("📧 Enviando tercer correo con servidor1:");
  servidor1.enviarCorreo(
    "equipo@desarrollo.com", 
    "Actualización del sistema"
  );
  print("");
  
  // 4. Imprimir si ambas referencias apuntan a la misma instancia
  bool mismaInstancia = (servidor1 == servidor2);
  print("   servidor1 == servidor2: $mismaInstancia");
  
  if (mismaInstancia) {
    print("   ✅ ¡Correcto! Ambas referencias apuntan a la misma instancia");
    print("   🎯 El patrón Singleton está funcionando correctamente");
  } else {
    print("   ❌ Error: Las referencias apuntan a instancias diferentes");
    print("   🐛 Hay un problema con la implementación del Singleton");
  }
  print("");
  
  // 5. Imprimir si el servidor se encuentra conectado utilizando el getter
  print("5️⃣ Consultando estado de conexión usando el getter...");
  print("   servidor1.estaConectado: ${servidor1.estaConectado}");
  print("   servidor2.estaConectado: ${servidor2.estaConectado}");
  
  if (servidor1.estaConectado && servidor2.estaConectado) {
    print("   ✅ Ambas referencias muestran el servidor conectado");
    print("   🔗 La conexión está activa y compartida");
  }
  print("");
  
  // 6. Desconectar el servidor
  print("6️⃣ Desconectando el servidor...");
  servidor2.desconectar(); // Usamos la segunda referencia para demostrar
  print("");
  
  // Verificar estado final
  print("🏁 Verificación final del estado:");
  print("   servidor1.estaConectado: ${servidor1.estaConectado}");
  print("   servidor2.estaConectado: ${servidor2.estaConectado}");
  print("");
  
  // Intentar enviar un correo después de desconectar
  print("🧪 Prueba: Intentando enviar correo después de desconectar...");
  servidor1.enviarCorreo("test@prueba.com", "Este correo no debería enviarse");
  print("");
  
  // Mostrar estado completo del servidor
  print("📊 Estado final del servidor:");
  servidor1.mostrarEstado();
  print("");
  
  // Demostración adicional: reconectar y enviar
  print("🔄 Demostración adicional: Reconectando y enviando...");
  servidor2.conectar();
  servidor1.enviarCorreo("admin@sistema.com", "Servidor reactivado correctamente");
  print("");

  // print("\n🎯 VENTAJAS DEL PATRÓN SINGLETON:");
  // print("• 🔗 Una sola conexión al servidor de correo");
  // print("• 💾 Gestión centralizada del estado");
  // print("• 🚀 Eficiencia en el uso de recursos");
  // print("• 🛡️  Control de acceso unificado");
  // print("• 🔄 Estado consistente en toda la aplicación");
}
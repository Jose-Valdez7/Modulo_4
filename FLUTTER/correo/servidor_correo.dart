class ServidorCorreo {

  static final ServidorCorreo _instancia = ServidorCorreo._interno();
  factory ServidorCorreo() => _instancia;
  ServidorCorreo._interno();
  bool _conectado=false;
  bool get estaConectado => _conectado;

  
  // Método para conectar al servidor
  void conectar() {
    if (_conectado) {
      print("⚠️  El servidor ya tiene una conexión activa");
      print("   Estado actual: Conectado ✅");
    } else {
      _conectado = true;
      print("🔗 Estableciendo conexión al servidor de correo...");
      print("✅ ¡Conexión establecida exitosamente!");
      print("📧 Servidor de correo listo para enviar mensajes");
    }
  }
  
  // Método para enviar correo electrónico
  void enviarCorreo(String destinatario, String asunto) {
    if (!_conectado) {
      print("❌ Error: No se puede enviar correo");
      print("   Motivo: El servidor no está conectado");
      print("   Solución: Ejecuta conectar() primero");
      return;
    }
    
    print("📮 Enviando correo electrónico...");
    print("   Para: $destinatario");
    print("   Asunto: $asunto");
    print("   Estado: Enviado ✅");
    print("   Servidor: ${hashCode} (Instancia única)");
  }
  
  // Método para desconectar del servidor
  void desconectar() {
    if (!_conectado) {
      print("⚠️  El servidor ya está desconectado");
      print("   Estado actual: Desconectado ❌");
    } else {
      _conectado = false;
      print("🔌 Cerrando conexión al servidor de correo...");
      print("✅ Conexión cerrada exitosamente");
      print("📧 Servidor de correo desconectado");
    }
  }

  void mostrarEstado() {
    print(" ESTADO DEL SERVIDOR DE CORREO:");
    print("   Instancia: ${hashCode}");
    print("   Conectado: ${_conectado ? 'Sí ✅' : 'No ❌'}");
    print("   Patrón: Singleton implementado correctamente");
  }
}
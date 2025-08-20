class Tienda {
  static final String nombre = "SuperMercado Los Andes";
  static String anuncio = "¡Ofertas increíbles todos los días!";
  static int _productosVendidos = 0;

  static void cambiarAnuncio(String nuevoAnuncio) {
    anuncio = nuevoAnuncio;
  }

  static void aumentarVentas() {
    _productosVendidos++;
  }

  static int obtenerVentas() {
    return _productosVendidos;
  }
}

class Producto {
  String codigo;
  String descripcion = "";
  double precio = 0.0;
  dynamic observacion;

  Producto(this.codigo);

  void registrarVenta(String descripcion, double precio, dynamic observacion) {
    this.descripcion = descripcion;
    this.precio = precio;
    this.observacion = observacion;
    Tienda.aumentarVentas();
  }

  String resumen() {
    return """
╔═══ RESUMEN DEL PRODUCTO ═══╗
║ Tienda: ${Tienda.nombre}
║ Anuncio: ${Tienda.anuncio}
║ Código: $codigo
║ Descripción: $descripcion
║ Precio: \$${precio.toStringAsFixed(2)}
║ Observación: $observacion (Tipo: ${observacion.runtimeType})
╚════════════════════════════╝""";
  }
}

void mainTienda() {
  print("═" * 60);
  print("        🛒 EJEMPLO COMPLETO - INVENTARIO DE TIENDA 🛒");
  print("═" * 60);
  
  // 1. Crear dos productos distintos
  print("\n1️⃣ Creando dos productos con códigos diferentes...");
  Producto producto1 = Producto("TECH001");
  Producto producto2 = Producto("HOME002");
  print("   ✓ Producto 1 creado con código: ${producto1.codigo}");
  print("   ✓ Producto 2 creado con código: ${producto2.codigo}");
  
  // 2. Usar registrarVenta para cada uno, con descripciones y observaciones distintas
  print("\n2️⃣ Registrando ventas con información detallada...");
  
  // Producto 1: observación tipo String
  producto1.registrarVenta(
    "Laptop Gaming ASUS ROG", 
    1299.99, 
    "Incluye mouse y audífonos gratis"
  );
  print("   ✓ Venta registrada para ${producto1.codigo}:");
  print("     - Descripción: ${producto1.descripcion}");
  print("     - Precio: \$${producto1.precio}");
  print("     - Observación (String): ${producto1.observacion}");
  
  // Producto 2: observación tipo numérico
  producto2.registrarVenta(
    "Cafetera Automática Deluxe", 
    249.50, 
    2.5 // Años de garantía
  );
  print("   ✓ Venta registrada para ${producto2.codigo}:");
  print("     - Descripción: ${producto2.descripcion}");
  print("     - Precio: \$${producto2.precio}");
  print("     - Observación (double): ${producto2.observacion}");
  
  // 3. Cambiar el anuncio de la tienda
  print("\n3️⃣ Actualizando anuncio de la tienda...");
  print("   Anuncio anterior: ${Tienda.anuncio}");
  Tienda.cambiarAnuncio("¡MEGA LIQUIDACIÓN! Hasta 70% de descuento en toda la tienda");
  print("   ✓ Anuncio actualizado: ${Tienda.anuncio}");
  
  // 4. Mostrar el resumen de ambos productos
  print("\n4️⃣ Mostrando resumen detallado de los productos...");
  print("\n--- RESUMEN PRODUCTO 1 ---");
  print(producto1.resumen());
  print("\n--- RESUMEN PRODUCTO 2 ---");
  print(producto2.resumen());
  
  // 5. Mostrar el total de productos vendidos accediendo al método adecuado de la clase Tienda
  print("\n5️⃣ Consultando estadísticas de la tienda...");
  print("   📊 Total de productos vendidos: ${Tienda.obtenerVentas()}");
  print("   🏪 Nombre de la tienda: ${Tienda.nombre}");
  print("   📢 Anuncio actual: ${Tienda.anuncio}");
  
  // Estadísticas adicionales
  double totalVentas = producto1.precio + producto2.precio;
  print("   💰 Total en ventas: \$${totalVentas.toStringAsFixed(2)}");
  print("   📈 Promedio por producto: \$${(totalVentas / 2).toStringAsFixed(2)}");
  
}

void main() {
  mainTienda();
}

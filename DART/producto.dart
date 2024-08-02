class Producto{
  String codigo="";
  String nombre="";
  String? descripcion;
  bool activo=true;
  double precio=0.0;
  int? stock; 
}

void main(){
  Producto p1;
  p1= new Producto();
  p1.codigo="1";
  p1.nombre="Doritos";
  p1.descripcion=null;
  p1.activo=true;
  p1.precio=0.65;
  p1.stock=21;
  print("Codigo: ${p1.codigo}");
  print("Nombre: ${p1.nombre}");
  print("Descripcion: ${p1.descripcion}");
  print("Activo: ${p1.activo}");
  print("Precio: ${p1.precio}");
  print("Stock: ${p1.stock}");

  Producto p2= Producto();
  p2.codigo="2";
  p2.nombre="Papitas";
  p2.descripcion="De queso";
  p2.activo=false;
  p2.precio=0.59;
  p2.stock=12;
  print("Codigo: ${p2.codigo}");
  print("Nombre: ${p2.nombre}");
  print("Descripcion: ${p2.descripcion}");
  print("Activo: ${p2.activo}");
  print("Precio: ${p2.precio}");
  print("Stock: ${p2.stock}");

  final p3= Producto();
  p3.codigo="3";
  p3.nombre="Chocolates";
  p3.descripcion="Ferrero Rocher";
  p3.activo=true;
  p3.precio=1.25;
  p3.stock=6;
  print("Codigo: ${p3.codigo}");
  print("Nombre: ${p3.nombre}");
  print("Descripcion: ${p3.descripcion}");
  print("Activo: ${p3.activo}");
  print("Precio: ${p3.precio}");
  print("Stock: ${p3.stock}");  
}
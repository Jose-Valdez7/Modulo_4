class Libro{
  String ISBN;
  String titulo;
  int? numeroPaginas;
  String? descripcion;

  Libro(this.ISBN, this.titulo, int numeroPaginas, this.descripcion){
    this.numeroPaginas=numeroPaginas;
  }
}

void main(){
  var lib= Libro("ISBN", "DOs dias", 50, "Nueva Edicion");
}
import 'figura.dart';

class Cuadrado extends Figura{
  const Cuadrado(this.lado,super.color);//con super. llama al constructor del padre que recibe el parametro
  final double lado;

  @override
  double calcularArea() {
    return lado*lado;
  }

  @override
  double calcularPerimetro() {
    return 4*lado;
  }
}

void main(){
  final cua=const Cuadrado(10,"azul");
  final area1=cua.calcularArea();
  final area2=cua.calcularPerimetro();
  print("area: $area1, perimetro: $area2");
}
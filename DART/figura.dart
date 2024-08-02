abstract class Figura{
  final String color;

  const Figura(this.color);

  double calcularArea();//metodo abstracto no queda a discrecion se tiene que implementar

  double calcularPerimetro();//implementacion obligatoria
}
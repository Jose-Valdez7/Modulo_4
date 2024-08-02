class Calculadora{
  int sumar(int valor1, int valor2){
    return valor1+valor2;
  }
}

void main(){
  Calculadora calc=Calculadora();
  int Resultado=calc.sumar(10, 8);
  print("la suma es $Resultado");
}
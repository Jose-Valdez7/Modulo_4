import 'impresora.dart';

void main(){

  final impresora1= ImpresoraCentral();
  impresora1.conectar();
  impresora1.imprimir('Acta de entrega.pdf');

  final impresora2= ImpresoraCentral();
  impresora2.imprimir("Informe mensual.docx");

  print(impresora1==impresora2);
  print(impresora2.estaConectada);
}
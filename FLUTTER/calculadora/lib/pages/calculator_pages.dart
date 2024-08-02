import 'package:flutter/material.dart';


class CalculatorPages extends StatefulWidget{
  const CalculatorPages({super.key});

  @override 
  State<StatefulWidget> createState() {
    return CalculatorPagesState();
  }

}

class CalculatorPagesState extends State{
  int valor1=0;
  int valor2=0;
  int resultado=0;

  TextEditingController valor1Controller=TextEditingController(text:"0");
  TextEditingController valor2Controller=TextEditingController(text:"0");
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,
        title: const Text("CALCULADORA"), 
          titleTextStyle: const TextStyle(
            fontStyle: FontStyle.italic,
            fontWeight: FontWeight.bold,
            fontSize: 20
          ),
          centerTitle: true,
          shadowColor: Colors.amber,
          elevation: 20,
      ),
      body: Padding(padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TextField( 
            keyboardType: TextInputType.number,
            textAlign: TextAlign.right,
            decoration: const InputDecoration(
              labelText: "valor1",
            ),
            onChanged: (text){
            int valorN=int.parse(text);
            valor1=valorN;
          },),
   
          TextField( 
            keyboardType: TextInputType.number,
            textAlign: TextAlign.right,
            decoration: const InputDecoration(
              labelText: "valor2",
            ),
            onChanged: (text){
            int valorN=int.parse(text);
            valor2=valorN;
          },),
          MaterialButton(color: Colors.blue,
            onPressed: (){
              resultado=valor1+valor2;
              setState(() {});
            },
            child: const Text("SUMAR"),
            ),
            Text("Resultado: $resultado"),
        ],
      ),
      ),
    );
  }
  
}
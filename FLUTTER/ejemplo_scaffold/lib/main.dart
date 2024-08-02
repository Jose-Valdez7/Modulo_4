import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return  MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("APP TEST"), 
          titleTextStyle: const TextStyle(
            fontStyle: FontStyle.italic,
            fontWeight: FontWeight.bold,
            fontSize: 20
          ),
          centerTitle: true,
          backgroundColor: Colors.grey,
          shadowColor: Colors.red,
          elevation: 20,
        ),
        body: const Center(
          child: Text('Hello World!'),
        ),
        drawer: const Drawer(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 100),
                  Icon(Icons.home,color: Colors.amber),Text("  HOME",style: TextStyle(color: Colors.amber)),
                ],
              ),
               Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 100),
                  Icon(Icons.account_box_sharp,color: Colors.red),Text("  CUENTA",style: TextStyle(color: Colors.red)),
                ],
              ),
               Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 100),
                  Icon(Icons.add_a_photo,color: Colors.black),Text("  FOTOS",style: TextStyle(color: Colors.black)),
                ],
              ),
               Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(height: 100),
                  Icon(Icons.add_shopping_cart,color: Colors.purple),Text("  PRODUCTOS",style: TextStyle(color: Colors.purple)),
                ],
              ),
            ],
          ),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: const [
            BottomNavigationBarItem(icon: Icon(Icons.abc),label:"Home"),
            BottomNavigationBarItem(icon: Icon(Icons.access_alarm),label:"Alarma")
          ],
        ),
        floatingActionButton:FloatingActionButton(
          child: const Icon(Icons.add),
          onPressed: ()=>{
          print("test"),
        }
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.miniCenterDocked,
      ),
    );
  }
}

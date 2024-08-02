import 'package:flutter/material.dart';

class CounterPage extends StatefulWidget {
  const CounterPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return CounterPageState();
  }
}

class CounterPageState extends State {
  int counter=0;
  @override
  Widget build(BuildContext context) {
    print("invoca a buid");
    return Scaffold(
        floatingActionButton: FloatingActionButton(
          onPressed: () => {
            //counter=counter+1,
            counter++,
            print("$counter"),
            setState(() {}),
          },
          child: const Icon(Icons.add),
        ),
        appBar: AppBar(
          backgroundColor: Colors.blue,
        ),
        body:  Center(
          child: Text(
            "$counter",
            style: const TextStyle(fontSize: 30),
          ),
        ));
  }
}

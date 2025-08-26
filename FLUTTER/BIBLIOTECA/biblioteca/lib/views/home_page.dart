
import 'package:biblioteca/services/database_helper1.dart';
import 'package:biblioteca/views/edit_book_page.dart';
import 'package:biblioteca/widgets/book_title.dart';
import 'package:flutter/material.dart';

import '../models/book.dart';

class HomePage extends StatefulWidget{
  const HomePage({super.key});

  @override
    State<StatefulWidget> createState()=> _HomePageState();
}

class _HomePageState extends State<HomePage>{
  late Future<List<Book>> _bookList;
  @override 
  void initState(){
    super.initState();
    _refreshList();
  }

  void _refreshList(){
    setState(() {
      _bookList=DatabaseHelper().getBooks();
    });
  }

  void _deleteBook(String id) async{
    await DatabaseHelper().deleteBook(id);
    _refreshList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Mi Biblioteca'),
      actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Recargar',
            onPressed: _refreshList,
          ),
        ],
      ),
      body:FutureBuilder<List<Book>>(
        future: _bookList, 
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting){
            return const Center(child: CircularProgressIndicator(),);
          }else if(!snapshot.hasData || snapshot.data!.isEmpty){
            return const Center(child: Text("No hay libros registrados"),);
          }else{
            return ListView(
              children: snapshot.data!.map((book)=>BookTitle(
                book: book, 
                onDelete: ()=> _deleteBook(book.id), 
                onEdit: ()async{
                  final result = await Navigator.push(
                    context, 
                    MaterialPageRoute(builder: (_)=> EditBookPage(book: book)),
                    );

                    if(result == true) _refreshList();
                },
                ),
                ).toList(),
            );
          }
      },),

      floatingActionButton: FloatingActionButton(onPressed: () async{
        final result = await Navigator.pushNamed(context, './add');
        if (result == true) _refreshList();
      },
      child: const Icon(Icons.add),
      ), 
      );
  }

}
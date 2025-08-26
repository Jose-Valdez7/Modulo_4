import 'package:flutter/material.dart';
import '../models/book.dart';

class BookTitle extends StatelessWidget {
  final Book book;
  final VoidCallback onDelete;
  final VoidCallback onEdit;

  const BookTitle({
      super.key, 
      required this.book, 
      required this.onDelete, 
      required this.onEdit
      });
      
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
    child: ListTile(
      title: Text(book.title),
      subtitle: Text('${book.author} - ${book.status}'),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(onPressed: onEdit, icon: const Icon(Icons.edit)),
          IconButton(onPressed: onDelete, icon: const Icon(Icons.delete)),
        ],
        ),//botones a la derecha
      ),
    );
  }
}

import 'package:flutter/material.dart';
import '../models/tarea.dart';
import '../services/database__helper..dart';

// Pantalla donde el usuario puede añadir un nuevo libro a la base de datos
class AddTareaPage extends StatefulWidget {
  const AddTareaPage({super.key});

  @override
  State<AddTareaPage> createState() => _AddTareaPageState();
}

// Estado de la pantalla "AddTareaPage"
class _AddTareaPageState extends State<AddTareaPage> {
  // Controladores para leer lo que el usuario escribe en los inputs
  final titleController = TextEditingController(); // Controla el campo "Título"
  final descriptionController = TextEditingController();
  final TextEditingController fechaVencimientoController =
      TextEditingController();

  // Estado inicial del Dropdown (Pendiente o Leído)
  String status = 'Pendiente';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Barra superior con el título de la pantalla
      appBar: AppBar(
        title: const Text('Añadir Tarea'),
      ),

      // Cuerpo principal con padding de 16 px
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          child: Column(
            children: [
              // Campo para ingresar el título del libro
              TextFormField(
                controller: titleController,
                decoration: const InputDecoration(labelText: 'Título'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingresa el título';
                  }
                  return null;
                },
              ),

              // Campo para ingresar el
              TextFormField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Descripción'),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingresa el descripción';
                  }
                  return null;
                },
              ),

              // Dropdown para elegir el estado del libro (Leído o Pendiente)
              DropdownButtonFormField<String>(
                value: status, // Valor inicial
                items: const [
                  'Pendiente',
                  'Completado',
                ]
                    .map((s) => DropdownMenuItem(
                          value: s,
                          child: Text(s),
                        ))
                    .toList(),
                onChanged: (value) {
                  setState(() {
                    status = value!; // Cambia el estado seleccionado
                  });
                },
                decoration: const InputDecoration(labelText: 'Estado'),
              ),

              // Widget para elegir la fecha
              TextFormField(
                controller: fechaVencimientoController,
                readOnly: true, // evita que el usuario escriba manualmente
                decoration: const InputDecoration(
                  labelText: 'Fecha de Vencimiento',
                  suffixIcon: Icon(Icons.calendar_today), // icono de calendario
                ),
                onTap: () async {
                  // Abrir el DatePicker
                  DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000), // Fecha mínima
                    lastDate: DateTime(2100), // Fecha máxima
                  );

                  if (pickedDate != null) {
                    // Formato YYYY-MM-DD
                    String formattedDate =
                        "${pickedDate.year}-${pickedDate.month.toString().padLeft(2, '0')}-${pickedDate.day.toString().padLeft(2, '0')}";

                    // Guardar en el controlador
                    setState(() {
                      fechaVencimientoController.text = formattedDate;
                    });
                  }
                },
              ),

              const SizedBox(height: 20), // Espacio antes del botón

              // Botón para guardar el libro en la base de datos
              ElevatedButton(
                onPressed: () async {
                  // Se crea un objeto "Tarea" con la info del formulario
                  final tarea = Tarea(
                    id: DateTime.now()
                        .millisecondsSinceEpoch, // ID único basado en el tiempo
                    title: titleController.text,
                    description: descriptionController.text,
                    fechaVencimiento:
                        DateTime.parse(fechaVencimientoController.text),
                    status: status,
                  );

                  // Guardamos el libro en la base de datos
                  await DatabaseHelper().insertTarea(tarea);

                  // Volvemos a la pantalla anterior enviando "true" (éxito)
                  Navigator.pop(context, true);
                },
                child: const Text('GUARDAR'),
              )
            ],
          ),
        ),
      ),
    );
  }
}

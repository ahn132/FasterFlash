import 'package:flutter/material.dart';
import '/screens/login.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Faster Flash',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/login',  // Set the initial route
      routes: {
        '/login': (context) => LoginScreen(),
        // You can add more routes for other screens here
      },
    );
  }
}
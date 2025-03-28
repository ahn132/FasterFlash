import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Text("LOGIN SCREEN"),
          LoginForm() 
      ],
      )
    );
  }
}

class LoginForm extends StatefulWidget {
  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {

  final _loginFormKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Form(
      child: 
        Column(
          children: [
            TextFormField(
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter an email';
                }
                return null;
              },
            ),
            TextFormField(
              validator: (value) {
                if (value == null || value.isEmpty) {
                  return 'Please enter a password';
                }
                return null;
              },
            ),
            Row(children: [
              ElevatedButton(
                onPressed: () {
                  if (_loginFormKey.currentState!.validate()) {
                    //add API CALL FOR LOGIN
                  }
                }, 
                child: Text("LOGIN")),
              ElevatedButton(
                onPressed: () {
                  if (_loginFormKey.currentState!.validate()) {
                    //add API CALL FOR REGISTER
                  }
                }, 
                child: Text("REGISTER")),
            ],)
          ]
        )
    );
  }
}
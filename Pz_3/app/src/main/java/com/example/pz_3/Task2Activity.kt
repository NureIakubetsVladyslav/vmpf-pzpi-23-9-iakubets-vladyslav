package com.example.pz_3

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class Task2Activity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {

            var day by remember { mutableStateOf("") }
            var month by remember { mutableStateOf("") }
            var year by remember { mutableStateOf("") }

            var result by remember { mutableStateOf("") }

            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(20.dp),

                verticalArrangement = Arrangement.Center,
                horizontalAlignment = Alignment.CenterHorizontally
            ) {

                Text(
                    text = "Калькулятор секунд",
                    style = MaterialTheme.typography.headlineMedium
                )

                Spacer(modifier = Modifier.height(20.dp))

                OutlinedTextField(
                    value = day,
                    onValueChange = { day = it },
                    label = { Text("День") }
                )

                Spacer(modifier = Modifier.height(10.dp))

                OutlinedTextField(
                    value = month,
                    onValueChange = { month = it },
                    label = { Text("Місяць") }
                )

                Spacer(modifier = Modifier.height(10.dp))

                OutlinedTextField(
                    value = year,
                    onValueChange = { year = it },
                    label = { Text("Рік") }
                )

                Spacer(modifier = Modifier.height(20.dp))

                Button(
                    onClick = {

                        try {

                            val seconds = calculateSeconds(
                                day.toInt(),
                                month.toInt(),
                                year.toInt()
                            )

                            result = "Секунд пройшло:\n$seconds"

                        } catch (e: Exception) {

                            result = "Неправильні дані"
                        }
                    }
                ) {

                    Text("Обчислити")
                }

                Spacer(modifier = Modifier.height(20.dp))

                Text(
                    text = result
                )

                Spacer(modifier = Modifier.height(20.dp))

                Button(
                    onClick = {
                        finish()
                    }
                ) {

                    Text("Назад")
                }
            }
        }
    }
}
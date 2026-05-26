package com.example.pz_3

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {

            MainScreen(
                onTask1Click = {

                    startActivity(
                        Intent(this, Task1Activity::class.java)
                    )
                },

                onTask2Click = {

                    startActivity(
                        Intent(this, Task2Activity::class.java)
                    )
                }
            )
        }
    }
}

@Composable
fun MainScreen(
    onTask1Click: () -> Unit,
    onTask2Click: () -> Unit
) {

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(20.dp),

        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {

        Text(
            text = "Практична робота №3",
            style = MaterialTheme.typography.headlineMedium
        )

        Spacer(modifier = Modifier.height(30.dp))

        Button(
            onClick = onTask1Click,
            modifier = Modifier.fillMaxWidth()
        ) {

            Text("Рівень 1 - Калькулятор віку")
        }

        Spacer(modifier = Modifier.height(20.dp))

        Button(
            onClick = onTask2Click,
            modifier = Modifier.fillMaxWidth()
        ) {

            Text("Рівень 2 - Калькулятор секунд")
        }
    }
}
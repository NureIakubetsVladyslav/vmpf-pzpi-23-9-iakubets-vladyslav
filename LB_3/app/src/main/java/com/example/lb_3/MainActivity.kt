package com.example.lb_3

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ListView
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private val tasks = mutableListOf<Task>()
    private lateinit var adapter: TaskAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val titleEditText = findViewById<EditText>(R.id.titleEditText)
        val descriptionEditText = findViewById<EditText>(R.id.descriptionEditText)
        val addTaskButton = findViewById<Button>(R.id.addTaskButton)
        val tasksListView = findViewById<ListView>(R.id.tasksListView)

        adapter = TaskAdapter(this, tasks)
        tasksListView.adapter = adapter

        addTaskButton.setOnClickListener {
            val title = titleEditText.text.toString()
            val description = descriptionEditText.text.toString()

            if (title.isBlank()) {
                Toast.makeText(this, "Введіть назву задачі", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            tasks.add(Task(title, description))

            titleEditText.text.clear()
            descriptionEditText.text.clear()

            updateTaskList()
        }

        tasksListView.setOnItemClickListener { _, _, position, _ ->
            showTaskDetails(position)
        }
    }

    private fun updateTaskList() {
        adapter.notifyDataSetChanged()
    }

    fun changeTaskStatus(position: Int) {
        tasks[position].isCompleted = !tasks[position].isCompleted
        updateTaskList()
    }

    fun deleteTask(position: Int) {
        tasks.removeAt(position)
        updateTaskList()
    }

    fun showTaskDetails(position: Int) {
        val task = tasks[position]

        AlertDialog.Builder(this)
            .setTitle(task.title)
            .setMessage(
                "Опис: ${task.description}\n\n" +
                        "Статус: ${if (task.isCompleted) "Виконано" else "Не виконано"}"
            )
            .setPositiveButton("Закрити", null)
            .show()
    }

    fun showEditTaskDialog(position: Int) {
        val task = tasks[position]

        val layout = android.widget.LinearLayout(this)
        layout.orientation = android.widget.LinearLayout.VERTICAL
        layout.setPadding(40, 20, 40, 10)

        val titleInput = EditText(this)
        titleInput.setText(task.title)

        val descriptionInput = EditText(this)
        descriptionInput.setText(task.description)

        layout.addView(titleInput)
        layout.addView(descriptionInput)

        AlertDialog.Builder(this)
            .setTitle("Редагування задачі")
            .setView(layout)
            .setPositiveButton("Зберегти") { _, _ ->
                val newTitle = titleInput.text.toString()
                val newDescription = descriptionInput.text.toString()

                if (newTitle.isNotBlank()) {
                    task.title = newTitle
                    task.description = newDescription
                    updateTaskList()
                }
            }
            .setNegativeButton("Скасувати", null)
            .show()
    }
}
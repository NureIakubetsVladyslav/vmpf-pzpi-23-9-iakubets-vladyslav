package com.example.lb_3

import android.graphics.Paint
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.CheckBox
import android.widget.TextView

class TaskAdapter(
    private val activity: MainActivity,
    private val tasks: MutableList<Task>
) : ArrayAdapter<Task>(activity, 0, tasks) {

    override fun getView(
        position: Int,
        convertView: View?,
        parent: ViewGroup
    ): View {

        val view = convertView ?: LayoutInflater.from(context)
            .inflate(R.layout.item_task, parent, false)

        val task = tasks[position]

        val titleTextView =
            view.findViewById<TextView>(R.id.taskTitleTextView)

        val statusTextView =
            view.findViewById<TextView>(R.id.taskStatusTextView)

        val completeCheckBox =
            view.findViewById<CheckBox>(R.id.completeCheckBox)

        val detailsButton =
            view.findViewById<Button>(R.id.detailsButton)

        val editButton =
            view.findViewById<Button>(R.id.editButton)

        val deleteButton =
            view.findViewById<Button>(R.id.deleteButton)

        titleTextView.text = task.title

        completeCheckBox.isChecked = task.isCompleted

        statusTextView.text =
            if (task.isCompleted)
                "Статус: Виконано"
            else
                "Статус: Не виконано"

        titleTextView.paintFlags =
            if (task.isCompleted)
                titleTextView.paintFlags or Paint.STRIKE_THRU_TEXT_FLAG
            else
                titleTextView.paintFlags and Paint.STRIKE_THRU_TEXT_FLAG.inv()

        completeCheckBox.setOnClickListener {
            activity.changeTaskStatus(position)
        }

        detailsButton.setOnClickListener {
            activity.showTaskDetails(position)
        }

        editButton.setOnClickListener {
            activity.showEditTaskDialog(position)
        }

        deleteButton.setOnClickListener {
            activity.deleteTask(position)
        }

        return view
    }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task } from './models/task.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error('Error al cargar tareas:', error);
      }
    });
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();

    if (!title) return;

    this.taskService.createTask({ title }).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error al crear tarea:', error);
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error al borrar tarea:', error);
      }
    });
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        console.error('Error al cambiar estado:', error);
      }
    });
  }
}
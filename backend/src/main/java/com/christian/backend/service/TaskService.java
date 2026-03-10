package com.christian.backend.service;

import com.christian.backend.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TaskService {

    private final List<Task> tasks = new ArrayList<>();
    private final AtomicLong counter = new AtomicLong(0);

    public TaskService() {
        tasks.add(new Task(counter.incrementAndGet(), "Aprender Spring Boot", false));
        tasks.add(new Task(counter.incrementAndGet(), "Entender Angular", false));
        tasks.add(new Task(counter.incrementAndGet(), "Prepararme para el nuevo trabajo", false));
    }

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task createTask(Task task) {
        task.setId(counter.incrementAndGet());
        task.setCompleted(false);
        tasks.add(task);
        return task;
    }

    public void deleteTask(Long id) {
        tasks.removeIf(task -> task.getId().equals(id));
    }

    public Task toggleTask(Long id) {
        for (Task task : tasks) {
            if (task.getId().equals(id)) {
                task.setCompleted(!task.isCompleted());
                return task;
            }
        }
        return null;
    }
}
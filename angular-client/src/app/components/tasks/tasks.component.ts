import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @ViewChild('f') myNgForm;
  form: FormGroup;
  tasks: Object[];

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.createForm();
    this.taskService.taskEmitter.subscribe(_ => {
      this.loadTasks();
    });
  }

  ngOnInit() {
    this.loadTasks();
  }

  createForm() {
    this.form = this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  loadTasks() {
    this.taskService.getByUser().subscribe(data => {
      this.tasks = data;
    });
  }

  saveTask() {
    this.taskService.save(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.form.reset({
          description: ''
        });
        this.myNgForm.resetForm();
        this.loadTasks();
      });
  }

  deleteTask(taskID: String) {
    this.taskService.delete(taskID).subscribe();
  }

}

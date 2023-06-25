import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  objTask : Task = new Task();
  ArrTask : Task[] = [];

  addTaskValue : string ='';
  editTaskValue: string='';

  constructor(private crudService : CrudService) {

  }

  ngOnInit(): void {
    this.objTask = new Task();
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.ArrTask = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.ArrTask = res;
    }, err => {
      alert("Unable to get all tasks");
    })
  }

  addTask() {
    this.objTask.task_name = this.addTaskValue;
    this.crudService.addTask(this.objTask).subscribe(res => {
      this.ngOnInit();
      this.addTaskValue = ''
    }, err => {
      alert(err);
    })
  }

  editTask() {
    this.objTask.task_name = this.editTaskValue;
    this.crudService.editTask(this.objTask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to update task !")
    })
  }

  deleteTask(etask: Task) {
    this.crudService.delTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err => {
      alert("Failed to delete task !!")
    })
  }

  getTask(etask : Task) {
    this.objTask = etask;
    this.editTaskValue = etask.task_name;
  }

}

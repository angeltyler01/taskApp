import { Component } from '@angular/core';
import { TaskService } from 'src/app/task.service'

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent {

  constructor(private taskService: TaskService){}

  createNewList(){
    this.taskService.createList('Testing').subscribe((response: any) =>{

    })
  }

}

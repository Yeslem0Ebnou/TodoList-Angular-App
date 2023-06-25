import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Task } from '../model/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serviceURL : string ;

  constructor(private http: HttpClient) { 
    this.serviceURL = "http://localhost:3000/tasks"
  }

  // Ajout tache
  addTask(task : Task) : Observable<Task> {
    return this.http.post<Task>(this.serviceURL, task)
  }
  // Obtenir tout les taches
  getAllTask() : Observable<Task[]> {
    return this.http.get<Task[]>(this.serviceURL)
  }
  // suprimer tache
  delTask(task : Task) : Observable<Task> {
    return this.http.delete<Task>(this.serviceURL+'/'+task.id)
  }
  // modifier tache
  editTask(task : Task) : Observable<Task> {
    return this.http.put<Task>(this.serviceURL+'/'+task.id, task)
  }
}

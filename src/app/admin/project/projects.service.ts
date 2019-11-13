import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>("http://angular8tmapi.go/projects")
      .pipe(map((data: Project[]) => {
        for (let i = 0; i < data.length; i++) {
          data[i].TeamSize = data[i].TeamSize * 100;
        }


        return data;
      }));
  }

  insertProject(newProject: Project): Observable<Project> {
    return this.httpClient.post<Project>("http://angular8tmapi.go/projects", newProject);
  }

  updateProject(existingProject: Project): Observable<Project> {
    return this.httpClient.put<Project>("http://angular8tmapi.go/projects", existingProject);
  }

  deleteProject(projectSerial: number): Observable<string> {
    return this.httpClient.delete<string>("http://angular8tmapi.go/projects/" + projectSerial);
  }

  searchProjects(searchBy: string, searchText: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>("http://angular8tmapi.go/projects/search/" + searchBy + "/" + searchText);
  }




}

import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  newProject: Project = new Project();
  editProject: Project = new Project();
  editIndex: number = null;
  deleteProject: Project = new Project();
  deleteIndex: number = null;
  searchBy = 'ProjectName';
  searchText: string = '';



  constructor(private projectsService: ProjectsService) { }

  getProjectsData() {
    this.projectsService.getAllProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
      }
    );
  }

  formReset(projectObject) {
    projectObject.ProjectID = null;
    projectObject.ProjectName = null;
    projectObject.DateOfStart = null;
    projectObject.TeamSize = null;
  }




  ngOnInit() {
    this.getProjectsData();
  }

  onSaveClick() {
    this.projectsService.insertProject(this.newProject).subscribe((response) => {
      this.getProjectsData();
      this.formReset(this.newProject);

      // this.projects.push(this.newProject);
    }, (error) => {
      console.log(error);
    });
  }



  onEditClick(event, index: number) {
    this.editProject.id = this.projects[index].id;
    this.editProject.ProjectID = this.projects[index].ProjectID;
    this.editProject.ProjectName = this.projects[index].ProjectName;
    this.editProject.DateOfStart = this.projects[index].DateOfStart;
    this.editProject.TeamSize = this.projects[index].TeamSize;
    this.editProject.created_at = this.projects[index].created_at;
    this.editProject.updated_at = this.projects[index].updated_at;
    this.editIndex = index;
  }

  onUpdateClick() {
    this.projectsService.updateProject(this.editProject).subscribe((response: Project) => {

      this.getProjectsData();
      this.formReset(this.editProject);

      // let p: Project = new Project();

      // p.id = this.editProject.id;
      // p.ProjectID = this.editProject.ProjectID;
      // p.ProjectName = this.editProject.ProjectName;
      // p.DateOfStart = this.editProject.DateOfStart;
      // p.TeamSize = this.editProject.TeamSize;
      // p.created_at = this.editProject.created_at;
      // p.updated_at = this.editProject.updated_at;

      // this.projects[this.editIndex] = p;

      // this.editProject.ProjectID = null;
      // this.editProject.ProjectName = null;
      // this.editProject.DateOfStart = null;
      // this.editProject.TeamSize = null;


    }, (error) => {
      console.log(error);
    });

  }

  onDeleteClick(event, index: number) {
    this.deleteProject.id = this.projects[index].id;
    this.deleteProject.ProjectID = this.projects[index].ProjectID;
    this.deleteProject.ProjectName = this.projects[index].ProjectName;
    this.deleteProject.DateOfStart = this.projects[index].DateOfStart;
    this.deleteProject.TeamSize = this.projects[index].TeamSize;
    this.deleteProject.created_at = this.projects[index].created_at;
    this.deleteProject.updated_at = this.projects[index].updated_at;
    this.deleteIndex = index;
  }


  onDeleteConfirmClick() {
    this.projectsService.deleteProject(this.deleteProject.id).subscribe(
      (response) => {
        this.projects.splice(this.deleteIndex, 1);
        this.formReset(this.deleteProject);
      },
      (error) => {
        console.log(error);
      });
  }


  onSearchClick() {
    this.projectsService.searchProjects(this.searchBy, this.searchText).subscribe(
      (response: Project[]) => {
        this.projects = response;
      }, (error) => {
      console.log(error);
    });
  }
}

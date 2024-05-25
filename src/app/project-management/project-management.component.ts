import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';  // Supposons que ce service gère aussi les projets

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {
  projects: any[] = [];
  nomProjet = '';
  codeProjet = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects() {
    this.userService.getAllProjects().subscribe(
      data => {
        this.projects = data;
        console.log('Projects loaded:', this.projects);
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }

  addProject() {
    const projetRequest = { nomProjet: this.nomProjet, codeProjet: this.codeProjet };
    this.userService.addProject(projetRequest).subscribe(
      response => {
        console.log('Project added successfully:', response);
        this.fetchProjects();  // Refresh the projects list
      },
      error => {
        console.error('Error adding project:', error);
      }
    );
  }

  updateProject(project: any) {
    const projetPayload = { nomProjet: project.nomProjet, codeProjet: project.codeProjet };
    this.userService.updateProject(project.id, projetPayload).subscribe(
      response => {
        console.log('Project updated successfully', response);
        this.fetchProjects();  // Refresh the projects list
      },
      error => {
        console.error('Error updating project:', error);
      }
    );
  }

  deleteProject(project: any) {
    if (confirm("Are you sure to delete " + project.codeProjet + "?")) {
      this.userService.deleteProject(project.id).subscribe(
        response => {
          console.log("Project deleted successfully", response);
          this.fetchProjects();  // Refresh the projects list after deletion
        },
        error => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ProjectAssignmentService } from '../_services/project-assignment.service';
import { UserService } from '../_services/user.service';
import { MessageService } from 'primeng/api'; // Pour afficher des messages/toasts

@Component({
  selector: 'app-assign-projects',
  templateUrl: './assign-projects.component.html',
  styleUrls: ['./assign-projects.component.css'],
  providers: [MessageService], // Ajout de MessageService comme fournisseur
})
export class AssignProjectsComponent implements OnInit {
  users: any[] = [];
  projets: any[] = [];
  selectedUser: any | null = null;
  selectedProjectIds: number[] = [];
  projectAssignments: any[] = [];

  constructor(
    private projectAssignmentService: ProjectAssignmentService,
    private userService: UserService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => (this.users = users));
    this.userService.getAllProjects().subscribe((projets) => (this.projets = projets));
    

  }

  assignProjects(): void {
    if (!this.selectedUser) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please select a user before assigning projects.',
      });
      return; // Arrête l'exécution si aucun utilisateur n'est sélectionné
    }
  
    if (this.selectedProjectIds.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'Please select at least one project before assigning.',
      });
      return; // Arrête l'exécution si aucun projet n'est sélectionné
    }
  
    this.projectAssignmentService.assignProjectsToUser(this.selectedUser.id, this.selectedProjectIds).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: response.message || 'Projects assigned successfully.',
        });
      },
      (error) => {
        const errorMessage =
          error?.error?.message ||
          'An error occurred while assigning projects. Please try again later.';
  
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
        });
      }
    );
  }
  
  
}

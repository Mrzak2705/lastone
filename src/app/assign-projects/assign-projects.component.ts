import { Component, OnInit } from '@angular/core';
import { ProjectAssignmentService } from '../_services/project-assignment.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'; // Pour les messages/toasts
import { FormsModule } from '@angular/forms'; // Pour utiliser ngModel
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-assign-projects',
  templateUrl: './assign-projects.component.html',
  styleUrls: ['./assign-projects.component.css'],
  providers: [MessageService], // Inclure le service pour afficher des messages
})
export class AssignProjectsComponent implements OnInit {
  // Propriétés pour stocker les utilisateurs, projets, et autres données
  users: any[] = [];
  projects: any[] = [];
  selectedUserId?: number; // Peut être undefined au début
  selectedProjectIds: number[] = [];
  startDate!: string; // Peut être undefined
  endDate!: string; // Peut être undefined
  toastMessage: string = ''; // Pour afficher des messages toast
  allAssignments: any[] = [];
  project: any = {};

  constructor(
    private projectAssignmentService: ProjectAssignmentService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService // Pour les messages/toasts
  ) {}

  ngOnInit() {
    // Charger les utilisateurs et gérer les erreurs
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        this.showError('Error fetching users', 'Please try again later.');
      }
    );

    // Charger les projets et gérer les erreurs
    this.userService.getAllProjects().subscribe(
      (response) => {
        this.projects = response;
      },
      (error) => {
        this.showError('Error fetching projects', 'Please try again later.');
      }
    );

    this.loadAssignments();
  }


  assignProjects() {
    console.log("Assigning projects:", this.selectedUserId, this.selectedProjectIds, this.startDate, this.endDate); // Log les données avant l'envoi
  
    this.projectAssignmentService.assignProjectsToUser(
      this.selectedUserId!,
      this.selectedProjectIds,
      this.startDate,
      this.endDate
    )
    .subscribe({
      next: (response) => {
        this.showSuccess("Projects assigned successfully!");
        this.router.navigate(['/affectation']);
        this.loadAssignments();
      },
      error: (error) => {
        console.error("Assign Projects Error:", error); // Log l'erreur pour déboguer
        this.showError('Error assigning projects', 'Please try again later.');
      },
    });
  }
  loadAssignments() {
    this.projectAssignmentService.getAllAssignedProjects().subscribe(
      (assignments) => {
        console.log("Loaded assignments:", assignments); // Vérifiez ici si les objets contiennent des id
        this.allAssignments = assignments;
      },
      (error) => {
        console.error("Error loading assignments:", error);
      }
    );
  }
  
  // Afficher un message toast de succès
  showSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  // Afficher un message toast d'erreur
  showError(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
    });
  }

  isFormValid(): boolean {
    return (
      this.selectedUserId !== undefined &&
      this.selectedProjectIds.length > 0 &&
      this.startDate !== undefined &&
      this.endDate !== undefined
    ); // Ajoutez des vérifications pour des valeurs valides
  }
  // Méthode pour supprimer un projet assigné
  deleteAssignment(assignment: any) {
    console.log("Assignment ID:", assignment.projectName); // Vérifiez si l'identifiant est bien défini
    if (assignment.id && confirm("Are you sure you want to delete assignment with ID: " + assignment.id + "?")) {
      this.projectAssignmentService.deleteAssignment(assignment.id).subscribe(
        (response) => {
          console.log("Assignment deleted successfully");
          this.loadAssignments(); // Rechargez les assignments
        },
        (error) => {
          console.error("Error deleting assignment:", error);
        }
      );
    } else {
      console.error("Assignment ID is undefined, cannot delete.");
    }
  }
  

 

  updateAssignment(assignment: any) {
    const updatedAssignment = {
      projectId: assignment.projectId,
      userId: assignment.userId,
      startDate: assignment.startDate,
      endDate: assignment.endDate,
    };
  
    this.projectAssignmentService
      .updateAssignment(assignment.id, updatedAssignment)
      .subscribe({
        next: (response) => {
          console.log("Assignment updated successfully!");
          this.loadAssignments();
        },
        error: (error) => {
          if (error.status === 404) {
            console.error("Assignment not found. Check if the assignment ID is correct.");
          } else {
            console.error("Error updating assignment:", error);
          }
        },
      });
  }
  
}

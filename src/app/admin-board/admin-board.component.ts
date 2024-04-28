import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/user.service';
import{ProjetRequest} from 'src/app/_services/models/projet-request'
import { from } from 'rxjs';
import { ProjectAssignmentService } from '../_services/project-assignment.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  users: any[] = [];
  allRoles = ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']; // Define all possible roles
  moderators: any[] = [];
  //projetassign: any[] = [];
  nomProjet = '';
  codeProjet = '';
  projects: any[] = [];
  project: any = {};
  projectAssignments: any[] = [];
  selectedRole: string = ''; // Définir la propriété selectedRole
  selectedModeratorId: number; // ID du modérateur sélectionné pour les utilisateurs avec le rôle 'ROLE_USER'
  @Input() userId: number; 


  constructor(private userService: UserService,private projectAssignmentService: ProjectAssignmentService) { }
  addProject() {
    const projetRequest = new ProjetRequest(this.nomProjet, this.codeProjet);

    this.userService.addProject(projetRequest).subscribe(
      (response) => {
        console.log('Project added successfully:', response);
        this.fetchProjects();

      },
      (error) => {
        console.error('Error adding project:', error);
      }
    );
  }

  

  ngOnInit(): void {
    /*this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Users loaded:', this.users); // Afficher les utilisateurs pour vérifier les IDs
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
    this.project = {};

    this.userService.getAllProjects().subscribe(
      (dataa) => {
        this.projects = dataa;
        console.log('Projects loaded:', this.projects); // Afficher les projets pour vérifier les IDs
      },
      (error) => {
        console.error('Error loading Projects:', error);
      }
    );*/
    this.fetchUsers();
    this.fetchModerators();
    this.fetchProjects();
    this.fetchProjectAssignments();
    
    

    

  }
   fetchProjectAssignments(){
    if (this.userId) {
      this.projectAssignmentService.getAssignedProjects(this.userId)
        .subscribe((projects) => {
          this.projects = projects; // Assignation des données au modèle
          console.log('Projects assign loaded:', this.projects);
        },
        (error) => {
          console.error('Error loading projects assign:', error);
        }
      );
    }
  }
  

  fetchProjects() {
    this.userService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log('Projects loaded:', this.projects);
      },
      (error) => {
        console.error('Error loading projects:', error);
      }
    );
  }


  /*fetchProjectAssignments() {
    this.projectAssignmentService.getAllProjectsAssignment().subscribe(
      data => {
        this.projetassign = data;
      },
      error => {
        console.error('Error loading project assignments:', error);
      }
    );
  }*/
  

  
  fetchModerators() {
    this.userService.getModerators().subscribe(
      data => { this.moderators = data; },
      error => { console.error('Error loading moderators:', error); }
    );
  }
  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
        console.log('Users loaded:', this.users);
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }


  /*updateUserRoles(user): void {
    console.log('Updating roles for user:', user);
    // Fichier: src/app/board-admin/admin-board.component.ts
this.userService.updateUserRoles(user.id, user.roles).subscribe(
  response => {
    console.log('Roles updated', response);
  },
  error => {
    console.error('Error updating roles', error);
  }
);

  }*/
  updateRole(user, newRole) {
    // Vous pouvez ajuster cette méthode pour appeler un service qui met à jour le rôle de l'utilisateur dans la base de données
    user.roles = [newRole]; // Supposons que chaque utilisateur a un seul rôle pour simplifier
    this.userService.updateUserRoles(user.id, user.roles).subscribe(
        response => {
            console.log('Roles updated successfully');
            // Vous pouvez choisir de recharger les données ou de confirmer visuellement la mise à jour ici
        },
        error => {
            console.error('Error updating roles:', error);
        }
    );
}


updateUser(user: any): void {
  const userPayload = {
      username: user.username,
      email: user.email,
      password: user.password,  // Assurez-vous que le mot de passe soit géré correctement selon votre logique
      roles: user.roles.map((role: any) => ({name: role}))
  };

  this.userService.updateUser(user.id, userPayload).subscribe(
      response => {
          console.log('User updated successfully', response);
          this.fetchUsers(); // Rafraîchir la liste des utilisateurs
      },
      error => {
          console.error('Error updating user:', error);
      }
  );
}

updateProject(project:any):void{
  const projetPayload={
   nomProjet:project.nomProjet,
   codeProjet:project.codeProjet
  };

  this.userService.updateProject(project.id,projetPayload).subscribe(
    response => {
      console.log('Project updated successfully', response);
      this.fetchUsers(); // Rafraîchir la liste des utilisateurs
  },
  error => {
      console.error('Error updating project:', error);
      }
  );
}


  



addUser(newUser): void {
  // Ajouter la logique pour associer le modérateur si le rôle 'ROLE_USER' est sélectionné
  if (this.selectedRole === 'ROLE_USER' && this.selectedModeratorId) {
    newUser.moderatorId = this.selectedModeratorId;
  }
  newUser.role = [this.selectedRole]; // Assurez-vous que le rôle est envoyé sous forme de tableau
  this.userService.addUser(newUser).subscribe(
    response => {
      console.log('User added successfully:', response);
      this.fetchUsers(); // Refresh the users list
    },
    error => {
      console.error('Error adding user:', error);
    }
  );
}








  

  

deleteUser(user): void {
  if (confirm("Are you sure to delete " + user.username + "?")) {
    this.userService.deleteUser(user.id).subscribe(
      response => {
        console.log("User deleted successfully", response);
        this.fetchUsers(); // Refresh the list
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }
}

  deleteProject(project): void {
    if (confirm("Are you sure to delete " + project.codeProjet + "?")) {
      this.userService.deleteProject(project.id).subscribe(
        response => {
          console.log("Project deleted successfully", response);
          this.fetchProjects(); // Actualiser la liste après la suppression
        },
        error => {
          console.error('Error deleting project:', error);
        }
      );
    }
  }

  
 

    
  }
  



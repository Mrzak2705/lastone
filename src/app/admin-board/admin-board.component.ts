import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import{ProjetRequest} from 'src/app/_services/models/projet-request'

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  users: any[] = [];
  allRoles = ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']; // Define all possible roles
  nomProjet = '';
  codeProjet = '';
  projects: any[] = [];

  constructor(private userService: UserService) { }
  addProject() {
    const projetRequest = new ProjetRequest(this.nomProjet, this.codeProjet);

    this.userService.addProject(projetRequest).subscribe(
      (response) => {
        console.log('Project added successfully:', response);
      },
      (error) => {
        console.error('Error adding project:', error);
      }
    );
  }

  

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Users loaded:', this.users); // Afficher les utilisateurs pour vérifier les IDs
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );

    this.userService.getAllUsers().subscribe(
      (data) => {
        this.projects = data;
        console.log('Projects loaded:', this.projects); // Afficher les projets pour vérifier les IDs
      },
      (error) => {
        console.error('Error loading Projects:', error);
      }
    );
    

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

  updateUserRoles(user): void {
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

  }

  updateUser(user: any): void {
    this.userService.updateUser(user.id, user).subscribe(
        response => {
            console.log('User updated successfully', response);
            this.fetchUsers(); // Refresh the user list
        },
        error => {
            console.error('Error updating user:', error);
        }
    );
}


  
  

   
  addUser(newUser): void {
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
          this.fetchUsers(); // Actualiser la liste après la suppression
        },
        error => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

  
 

    
  }
  



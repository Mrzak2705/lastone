import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent implements OnInit {
  users: any[] = [];
  moderators: any[] = [];
  allRoles = ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN']; // Define all possible roles
  selectedRole: string = ''; // Définir la propriété selectedRole
  selectedModeratorId: number; // ID du modérateur sélectionné pour les utilisateurs avec le rôle 'ROLE_USER'

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.fetchModerators();
  }

  fetchUsers() {
    this.userService.getAllUsers().subscribe(
      data => { this.users = data; },
      error => { console.error('Error loading users:', error); }
    );
  }

  fetchModerators() {
    this.userService.getModerators().subscribe(
      data => { this.moderators = data; },
      error => { console.error('Error loading moderators:', error); }
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

}

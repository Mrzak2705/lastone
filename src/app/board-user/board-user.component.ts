import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {

  content: string;
  projects: any[] = [];

  constructor(private userService: UserService, private tokenStorage: TokenStorageService,private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    this.userService.getProjectsForCurrentUser().subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error("Error fetching projects:", error);
        // Redirigez ou affichez un message approprié
        if (error === "Token not found in localStorage") {
          this.router.navigate(['/login']); // Rediriger vers la page de connexion
        }
      }
    );
    

  }

}

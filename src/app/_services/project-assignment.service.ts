import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from 'src/app/_services/models/models/message-response'
const baseUrl = 'http://localhost:8080/api/';
import { Projet } from 'src/app/_services/models/models/projet'


@Injectable({
  providedIn: 'root'
})
export class ProjectAssignmentService {

  constructor(private http: HttpClient) {}

 /* assignProjectsToUser(userId: number, projectIds: number[]): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${baseUrl}user/${userId}/assign-projects`, { projectIds });
  }*/


  assignProjectsToUser(userId: number, projectIds: number[]): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${baseUrl}user/${userId}/assign-projects`,
      projectIds // Envoi du tableau directement
    );
  }

  // Fonction pour obtenir les projets assignés à un utilisateur par son ID
  getAssignedProjects(userId: number): Observable<Projet[]> {
    const url = `${baseUrl}/${userId}/assigned-projects`;
    return this.http.get<Projet[]>(url);
  }
}

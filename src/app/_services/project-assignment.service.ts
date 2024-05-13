import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from 'src/app/_services/models/models/message-response'
//const baseUrl = 'http://localhost:8080/api/user';
import { Projet } from 'src/app/_services/models/models/projet'


@Injectable({
  providedIn: 'root'
})
export class ProjectAssignmentService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

 /* assignProjectsToUser(userId: number, projectIds: number[]): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(`${baseUrl}user/${userId}/assign-projects`, { projectIds });
  }*/

  assignProjectsToUser(userId: number, projectIds: number[], startDate: string, endDate: string): Observable<any> {
    const payload = { projectIds, startDate, endDate };
    return this.http.post(`${this.apiUrl}/${userId}/assign-projects`, payload); // Vérifiez l'URL et le payload
  }

  getAssignedProjects(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}/assigned-projects`);
  }

  getAllAssignedProjects(): Observable<any> {
    return this.http.get(`${this.apiUrl}/assigned`);
  }

  // Supprimer un projet assigné
  deleteAssignment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteassigned/${id}`);
  }

  updateAssignment(assignmentId: number, data: any) {
    return this.http.put(`${this.apiUrl}/updateAssignment/${assignmentId}`, data);
  }
  
 
}
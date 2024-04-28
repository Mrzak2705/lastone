import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ProjetRequest} from 'src/app/_services/models/projet-request'

const BASE_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user';


  constructor(private http: HttpClient) { }

  // Existing methods for fetching content based on roles
  getPublicContent(): Observable<any> {
    return this.http.get(BASE_URL + 'test/all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(BASE_URL + 'test/user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(BASE_URL + 'test/mod', { responseType: 'text' });
  }

  getModerators(): Observable<any> {
    return this.http.get(this.baseUrl + '/moderators');
  }


  getAdminBoard(): Observable<any> {
    return this.http.get(BASE_URL + 'test/admin', { responseType: 'text' });
  }

  // Methods for user management
  getAllUsers(): Observable<any> {
    return this.http.get(BASE_URL + 'user/list');
  }

  getAllProjects(): Observable<any> {
    return this.http.get(BASE_URL + 'user/listProjects');
  }

 // Angular service to update user roles
 updateUserRoles(userId: number, roles: string[]): Observable<any> {
  return this.http.put(`${this.baseUrl}/${userId}/roles`, { roles });
}

 // Angular service to add a user
 addUser(user): Observable<any> {
  return this.http.post(`${this.baseUrl}/add`, user);
}


updateUser(id: number, user: any): Observable<any> {
  const headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(`${this.baseUrl}/update/${id}`, JSON.stringify(user), { headers });
}

deleteUser(userId: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${userId}`);
}




addProject(projet: ProjetRequest): Observable<any> {
  return this.http.post(BASE_URL + 'user/addPoject', projet, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  });
}

updateProject(id: number, projet: ProjetRequest): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put(`${BASE_URL}user/updateProject/${id}`, projet, { headers });
}


  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}user/delete/${projectId}`);
  }
  


  
  



 
}

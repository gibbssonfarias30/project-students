import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student, StudentPage } from './student.model';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private http: HttpClient) { }
    paginar(size: number = 5, page: number = 0): Observable<StudentPage> {
        let params = new HttpParams();
        params = params.append('size', size);
        params = params.append('page', page);
        params = params.append('sort', 'name,desc');

        return this.http.get<StudentPage>(`${environment.apiBase}`, { params });
    }

    getById(id: number): Observable<Student> {
        return this.http.get<Student>(`${environment.apiBase}/${id}`);
    }

    save(student: Student): Observable<Student> {
        return this.http.post<Student>(`${environment.apiBase}`, student);
    }

    update(student: Student): Observable<Student> {
        return this.http.put<Student>(`${environment.apiBase}/${student.id}`, student);
    }

    delete(id: number): any {
        return this.http.delete(`${environment.apiBase}/${id}`);
    }
}

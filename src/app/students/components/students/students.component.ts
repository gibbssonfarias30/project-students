import { Component, OnInit } from '@angular/core';
import { Student, StudentPage } from '../../shared/student.model';
import { StudentService } from '../../shared/student.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
    studentPage?: StudentPage;
    displayedColumns = ['titulo', 'precio', 'fechaCreacion', 'acciones']

    constructor(private studentService: StudentService) { }

    ngOnInit(): void {
        this.getAll();
    }
    getAll() {
        this.studentService.paginar()
            .subscribe(studentPage => {
                console.log("Students:", studentPage);
                this.studentPage = studentPage;
            })
    }

    deleteStudent(student: Student) {
        if (!confirm('¿Estás seguro de eliminar este libro?')) {
            return;
        }

        this.studentService.delete(student.id)
            .subscribe(() => {
                this.getAll();
            })
    }


    paginarLibros(event: PageEvent) {
        const size = event.pageSize;
        const page = event.pageIndex;

        this.studentService.paginar(size, page)
            .subscribe(studentPage => {
                console.log("Libros:", studentPage);
                this.studentPage = studentPage;
            })
    }


}

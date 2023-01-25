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
    displayedColumns = ['name', 'lastName', 'dni', 'email', 'birthDate']

    constructor(private studentService: StudentService) { }

    ngOnInit(): void {
        this.getAll();
    }
    getAll() {
        this.studentService.paginate()
            .subscribe(studentPage => {
                console.log("Students:", studentPage);
                this.studentPage = studentPage;
            })
    }

    pagingStudents(event: PageEvent) {
        const size = event.pageSize;
        const page = event.pageIndex;

        this.studentService.paginate(size, page)
            .subscribe(studentPage => {
                console.log("Students:", studentPage);
                this.studentPage = studentPage;
            })
    }


}

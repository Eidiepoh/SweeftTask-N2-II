import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { userDataBase } from './interface.component';
@Component({
  selector: 'app-aloe',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class mainPageComponent implements OnInit {
  public dataBase;
  public userBase: userDataBase[] = [];
  public page: number = 1;
  public user: number = 20;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPosts(this.page, this.user);
  }

  getPosts(pageNum, userNum) {
    this.http
      .get<any>(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNum}/${userNum}`
      )
      .subscribe((response) => {
        this.userBase.push(response.list);
      });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (
      window.innerHeight + window.scrollY + 1 >=
      this.document.body.offsetHeight
    ) {
      if (this.page !== 20) {
        if (this.user < 100) {
          this.user += 20;
        } else if (this.user == 100 && this.page < 20) {
          this.user = 20;
          this.page += 1;
        }

        this.getPosts(this.page, this.user);
      }
    }
  }

  onSelect(id) {
    this.router.navigate(['/user', id]);
  }
}

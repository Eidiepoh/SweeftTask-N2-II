import { Component, OnInit, Inject, HostListener, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfile implements OnInit {
  public singleUser: string;
  public userIdNum: string;
  public id;
  public roadMap = [];
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getUser(this.id);
    });
  }
  getUser(userId) {
    this.http
      .get<any>(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`
      )
      .subscribe((user) => {
        this.singleUser = user;
        this.roadMap.push(user);
        console.log(this.roadMap);
      });
  }
}

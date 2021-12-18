import { Component, OnInit, Inject, HostListener, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { userDataBase } from 'src/app/main-page/interface.component';

@Component({
  selector: 'app-user-friends',
  templateUrl: './user-friends.component.html',
  styleUrls: ['./user-friends.component.css'],
})
export class UserFriends implements OnInit {
  public userFriends;
  public friendBase: userDataBase[] = [];
  public id;
  public numId: number;
  public pages: number = 1;
  public users: number = 20;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.numId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.id = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getFriends(this.id, this.pages, this.users);
    });
  }

  getFriends(userId, page, user) {
    this.http
      .get<any>(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}/friends/${page}/${user}`
      )
      .subscribe((friends) => {
        this.userFriends = friends.list;
        this.friendBase.push(friends.list);
      });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;

    console.log(window.innerHeight);
    if (
      window.innerHeight + window.scrollY + 1 >=
      this.document.body.offsetHeight
    ) {
      if (this.pages !== 13) {
        if (this.users < 100) {
          this.users += 20;
        } else if (this.users == 100 && this.pages < 13) {
          this.users = 20;
          this.pages += 1;
        }
        this.getFriends(this.numId, this.pages, this.users);
      }
    }
  }

  onSelect(id) {
    this.router.navigate(['/user', id]);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { ApiRestService } from '../services/api-rest.service';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, RouterModule, SidenavComponent],
  templateUrl: './pages.component.html',
})
export class PagesComponent implements OnInit {
  private service = inject(ApiRestService);

  ngOnInit(): void {
    this.service.get_token().subscribe((res) => {
      if (res.success) {
        localStorage.setItem('token', res.token);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-cliente',
  templateUrl: './chat-cliente.component.html',
  styleUrls: ['./chat-cliente.component.css']
})
export class ChatClienteComponent implements OnInit {

  constructor(public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  backToDonations() {
    this.router.navigate(['cadastro-doacao']);
  }

}

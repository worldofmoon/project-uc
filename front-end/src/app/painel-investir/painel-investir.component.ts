import { Component, OnInit } from '@angular/core';
import { ModalidadesService } from '../modalidades.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-painel-investir',
  templateUrl: './painel-investir.component.html',
  styleUrls: ['./painel-investir.component.css']
})
export class PainelInvestirComponent implements OnInit {
  modalidadeSingle;
  constructor(private modalidadeService: ModalidadesService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.getProductById();
  }

  getProductById() {
    const id = this.userService.getProduct();
    console.log(id);
    const result = this.modalidadeService.getById(id);
    this.modalidadeSingle = result;
    console.log(result);
  }
  comprar(id) {
    this.userService.setInvestment(id);
  }
}

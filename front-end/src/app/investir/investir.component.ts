import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ModalidadesService } from '../modalidades.service';

@Component({
  selector: 'app-investir',
  templateUrl: './investir.component.html',
  styleUrls: ['./investir.component.css']
})
export class InvestirComponent implements OnInit {
  investimentos;
  constructor(private userService: UserService,
    private modalidadeService: ModalidadesService) { }

  ngOnInit() {
    this.getInvestimentos();
  }

  getInvestimentos() {
    const id = this.userService.getInvestment();
    const result = this.modalidadeService.getById(id);
    this.investimentos = result;
    console.log(this.investimentos);
  }

}

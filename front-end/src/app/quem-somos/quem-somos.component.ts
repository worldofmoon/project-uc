import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ModalidadesService } from '../modalidades.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.css']
})
export class QuemSomosComponent implements OnInit {
  investimentos;
  safeUrl;
  constructor(private userService: UserService,private router: Router,private _sanitizer: DomSanitizer,
    private modalidadeService: ModalidadesService) { }

  ngOnInit() {
    this.getInvestimentos();
    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/8ZLSXAJLuAQ');
  }

  getInvestimentos() {
    const id = this.userService.getInvestment();
    const result = this.modalidadeService.getById(id);
    this.investimentos = result;
    console.log(this.investimentos);
    
  }
  
  gotoCadastroClientes() {
    this.router.navigate(['cadastro-clientes']);
   }
   
}

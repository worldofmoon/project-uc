import { Component, ViewChild  } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator, MatSort } from '@angular/material';
import * as Typed from 'typed.js';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface Doacao {
  id: string;
  title: string;
  description: string;
  collectionDate: string;
  address: string;
  status: string;
  firstName: string;
}

const ELEMENT_DATA: Doacao[] = [
  {id: '1', title: 'Computador Desktop', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Aguardando aprovação', firstName: 'João'},
  {id: '2', title: 'Tablet', description: 'Necessário formatar', collectionDate: '01/01/2021', address: 'Rua ', status: 'Aguardando aprovação', firstName: 'João'},
  {id: '3', title: 'Mouse', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Aguardando retirada', firstName: 'João'},
  {id: '4', title: 'CPU', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Aguardando retirada', firstName: 'João'},
  {id: '5', title: 'Teclado', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Em manutenção', firstName: 'João'},
  {id: '6', title: 'Notebook', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Em manutenção', firstName: 'João'},
  {id: '7', title: 'PC Completo', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Equipamento doado', firstName: 'João'},
  {id: '8', title: 'Computador Desktop', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Equipamento doado', firstName: 'João'},
  {id: '9', title: 'Teclado', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Equipamento doado', firstName: 'João'},
  {id: '10', title: 'Notebook', description: 'Em ótimo estado', collectionDate: '01/01/2021', address: 'Rua ', status: 'Aguardando retirada', firstName: 'João'},
];


/**
 * @title Table with filtering
 */

@Component({
  selector: 'app-controle-doacao',
  templateUrl: './controle-doacao.component.html',
  styleUrls: ['./controle-doacao.component.css']
})

export class ControleDoacaoComponent  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'firstName', 'title', 'description', 'status', 'collectionDate', 'action'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = ELEMENT_DATA;
  // @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(private router: Router, private dialog: MatDialog) {}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      // if(result.event == 'Add'){
      //   this.addRowData(result.data);
      // }else 
      if(result.event == 'Editar'){
        this.updateRowData(result.data);
      }
      // else if(result.event == 'Delete'){
      //   this.deleteRowData(result.data);
      // }
    });
  }

  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.status = row_obj.status;
        value.collectionDate = row_obj.collectionDate;
      }
      return true;
    });
  }


  gotoChatOng() {
    this.router.navigate(['chat-ong']);
  }

  // ngOnInit() {}

}

// export interface Element {
//   id: number;
//   doador: string;
//   status: string;
//   data_ret: string;
// }
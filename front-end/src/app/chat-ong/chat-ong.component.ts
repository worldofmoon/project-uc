import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatOng } from '../chat-ong/chat-ong.model';
import { ChatOngService } from '../chat-ong/chat-ong.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-ong',
  templateUrl: './chat-ong.component.html',
  styleUrls: ['./chat-ong.component.css']
})
export class ChatOngComponent implements OnInit {
  chatOng: ChatOng[] = [];
  private chatOngSubscription: Subscription;


  public userList = [
    {
      id: 1,
      name: 'Karen Sousa',
      phone: '9876598765',
      image: 'assets/user/user-1.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3'
      }
    },
    {
      id: 2,
      name: 'Wade Warren',
      phone: '9876543210',
      image: 'assets/user/user-2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5'
      }
    },
    {
      id: 3,
      name: 'Albert Flores',
      phone: '9988776655',
      image: 'assets/user/user-3.png',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6'
      }
    },
    {
      id: 4,
      name: 'Dianne Russell',
      phone: '9876556789',
      image: 'assets/user/user-4.png',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6'
      }
    }
  ];

  constructor(public chatOngService: ChatOngService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.chatOngService.getChatOng();
    // this.chatOngSubscription = this.chatOngService
    //    .getListaChatOngAtualizadaObservable()
    //    .subscribe((dados: {chatOng: []}) => {
    //     this.chatOng = dados.chatOng;
    //    });
  }

  backToControlDonations() {
    this.router.navigate(['controle-doacao']);
  }

}

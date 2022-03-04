import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-show-players',
  templateUrl: './dialog-show-players.component.html',
  styleUrls: ['./dialog-show-players.component.scss']
})
export class DialogShowPlayersComponent implements OnInit {
  players: [string] = [""]

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.players = data.players;
    console.log(this.players);
    
  }

  ngOnInit(): void {
    
    
  }

}

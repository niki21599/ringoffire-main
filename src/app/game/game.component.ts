import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from "@angular/router";
import { DialogShowPlayersComponent } from '../dialog-show-players/dialog-show-players.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game();

  gameId: string = "";
  //name: string = "";

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: AngularFirestore) { 

  }

  ngOnInit(): void {
    this.newGame()
    this.route.params.subscribe(params =>{
      this.gameId = params["id"];
      this.firestore.collection('games').doc(params['id']).valueChanges().subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    })

    
  }

  newGame(){
    this.game = new Game();
    
  }

  takeCard(){

    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      
      this.game.pickCardAnimation = true
      this.saveGame();
      
      console.log(this.game.currentPlayer);
      
      setTimeout(() => {
        this.game.pickCardAnimation = false
        this.game.playedCards.push(this.game.currentCard);
        if(this.game.players.length > 0){
          this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
        }else{
          this.game.currentPlayer = 0;
        }

        
        this.saveGame();
      }, 2000);  
    }

    
    
  }

  addPlayer(name: string){
    this.game.players.push(name)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.addPlayer(name)
        this.saveGame();
      }
      
      
    });
  }
  openShowPlayerDialog(){
    this.dialog.open(DialogShowPlayersComponent, {
      data: {
        players: this.game.players
      }
    
    });
  }

  saveGame(){
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJson());
  }

}

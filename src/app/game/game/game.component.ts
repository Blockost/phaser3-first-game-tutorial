import { Component, OnInit } from '@angular/core';

import * as Phaser from 'phaser';
import { MainSceneComponent } from 'src/app/scenes/main/main-scene.component';

@Component({
  selector: 'app-game',
  template: ''
})
export class GameComponent implements OnInit {
  private readonly game: Phaser.Game;

  constructor() {
    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: MainSceneComponent
    };

    this.game = new Phaser.Game(gameConfig);
  }

  ngOnInit() {}
}

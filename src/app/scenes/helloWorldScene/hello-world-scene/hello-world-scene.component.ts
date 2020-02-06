import { Component } from '@angular/core';

import BaseScene from '../../based-scene.component';

@Component({
  selector: 'app-hello-world-scene',
  template: ''
})
export class HelloWorldSceneComponent extends BaseScene {
  constructor() {
    super('HelloWorld');
  }

  preload() {
    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create() {
    this.add.image(400, 300, 'sky');

    var particleEmitterManager = this.add.particles('red');

    var emitter = particleEmitterManager.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    var logo = this.physics.add.image(100, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);
    logo.setGravityY(-200);

    emitter.startFollow(logo);
  }
}

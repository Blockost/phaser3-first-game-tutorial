import { Component } from '@angular/core';
import BaseScene from '../based-scene.component';

@Component({
  selector: 'app-main',
  template: ''
})
export class MainSceneComponent extends BaseScene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Phaser.Physics.Arcade.Sprite;
  private score = 0;
  private scoreText: Phaser.GameObjects.Text;
  private gameOver = false;
  private stars: Phaser.Physics.Arcade.Group;
  private bombs: Phaser.Physics.Arcade.Group;

  constructor() {
    super('Main');
  }

  preload() {
    super.preload();
    this.load.image('sky', '/assets/sprites/sky.png');
    this.load.image('ground', '/assets/sprites/platform.png');
    this.load.image('star', '/assets/sprites/star.png');
    this.load.image('bomb', '/assets/sprites/bomb.png');
    this.load.spritesheet('dude', '/assets/spritesheets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    super.create();

    // Add scene's background
    this.add.image(400, 300, 'sky');

    // Image is initially 400x32 so we need to scale it to take the whole screen
    const ground = this.physics.add
      .staticImage(400, 568, 'ground')
      .setScale(2)
      .refreshBody();

    // Add other platforms
    const p1 = this.physics.add.staticImage(600, 400, 'ground');
    const p2 = this.physics.add.staticImage(50, 250, 'ground');
    const p3 = this.physics.add.staticImage(750, 220, 'ground');
    // Group all the static images in order to manage them as a unit
    const platforms = this.physics.add.staticGroup([ground, p1, p2, p3]);

    // Create player
    this.player = this.physics.add
      .sprite(100, 450, 'dude')
      .setBounce(0.2)
      .setCollideWorldBounds(true);
    // this.player.setFrictionX(200);

    this.cursors = this.input.keyboard.createCursorKeys();

    // Add collision detection between player and platforms
    this.physics.add.collider(this.player, platforms);

    // Animate player
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // Add some stars to collect
    this.stars = this.physics.add.group();
    for (let i = 0; i < 11; i++) {
      let star = this.physics.add.sprite(12 + 70 * i, 0, 'star');
      this.stars.add(star);
    }

    this.stars.children.iterate((star: Phaser.Physics.Arcade.Sprite) => {
      star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Add collision detection between stars and platforms
    this.physics.add.collider(this.stars, platforms);

    // Add overlap detection between stars and player
    this.physics.add.overlap(this.player, this.stars, this.onStarCollected.bind(this));

    // Display score on screen
    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, { fontSize: '32px', fill: '#000' });

    // Add bombs
    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, platforms);
    this.physics.add.collider(this.player, this.bombs, this.onBombHit.bind(this));
  }

  update(time: number, delta: number) {
    super.update(time, delta);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160).play('left', true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160).play('right', true);
    } else if (this.player.body.touching.down) {
      // If not running left or right and is not currently jumping then reduce velocity to 0 and face the camera
      this.player.setVelocityX(0).play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  onStarCollected(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) {
    star.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);

    //If all stars have been collected,
    if (this.stars.countActive() === 0) {
      // Reactivate them all
      this.stars.children.iterate((star: Phaser.Physics.Arcade.Sprite) => {
        star.enableBody(true, star.x, star.y, true, true);
      });

      // Release some bombs
      for (let i = 0; i < 2; i++) {
        const bomb = this.physics.add.sprite(Phaser.Math.Between(0, 800), 16, 'bomb');
        this.bombs.add(bomb);
      }
      this.bombs.children.iterate((bomb: Phaser.Physics.Arcade.Sprite) => {
        bomb
          .setBounce(1)
          .setCollideWorldBounds(true)
          .setVelocity(Phaser.Math.Between(-200, 200), 20);
      });
    }
  }

  onBombHit(player: Phaser.Physics.Arcade.Sprite, bomb: Phaser.Physics.Arcade.Sprite) {
    this.physics.pause();
    this.player.setTint(0xff0000).play('turn');
    this.gameOver = true;
  }
}

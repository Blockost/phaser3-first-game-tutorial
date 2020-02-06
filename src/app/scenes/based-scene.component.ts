import * as Phaser from 'phaser';

export default abstract class BaseScene extends Phaser.Scene {
  constructor(key: string, config?: Phaser.Types.Scenes.SettingsConfig) {
    super({ key, ...config });
  }

  /**
   * Child scenes overridding this method should call it before anything else.
   */
  init() {
    this.load.addListener('progress', () => {
      const progress = this.load.progress;
      if (!isNaN(progress)) {
        // TODO: 2020-02-05 Blockost Maybe add a progress bar somewhere?
        console.log(`Progress: ${progress * 100}%`);
      }
    });
  }

  /**
   * Child scenes overridding this method should call it before anything else.
   */
  preload() {}

  /**
   * Child scenes overridding this method should call it before anything else.
   */
  create() {}

  /**
   * Child scenes overridding this method should call it before anything else.
   */
  update(time: number, delta: number) {}
}

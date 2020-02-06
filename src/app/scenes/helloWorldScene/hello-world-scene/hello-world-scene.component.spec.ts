import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloWorldSceneComponent } from './hello-world-scene.component';

describe('HelloWorldSceneComponent', () => {
  let component: HelloWorldSceneComponent;
  let fixture: ComponentFixture<HelloWorldSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelloWorldSceneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloWorldSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

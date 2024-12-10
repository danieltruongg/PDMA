import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Text2SpeechComponent } from './text-2-speech.component';

describe('Text2SpeechComponent', () => {
  let component: Text2SpeechComponent;
  let fixture: ComponentFixture<Text2SpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Text2SpeechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Text2SpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

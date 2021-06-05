import { TestBed, inject } from '@angular/core/testing';

import { ChatOngService } from './chat-ong.service';

describe('ChatOngService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatOngService]
    });
  });

  it('should be created', inject([ChatOngService], (service: ChatOngService) => {
    expect(service).toBeTruthy();
  }));
});

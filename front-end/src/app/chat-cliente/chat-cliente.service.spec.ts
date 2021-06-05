import { TestBed, inject } from '@angular/core/testing';

import { ChatClienteService } from './chat-cliente.service';

describe('ChatClienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatClienteService]
    });
  });

  it('should be created', inject([ChatClienteService], (service: ChatClienteService) => {
    expect(service).toBeTruthy();
  }));
});

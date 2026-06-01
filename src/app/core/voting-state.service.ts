import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';

export interface VotingStateResponse {
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class VotingStateService {
  private readonly _isVotingActive = signal(false);
  readonly isVotingActive = this._isVotingActive.asReadonly();

  constructor() {
    this.loadVotingStateFromBackend();
  }

  private loadVotingStateFromBackend() {
    // Simula una llamada al backend para consultar el estado de votación activo.
    of<VotingStateResponse>({ active: false })
      .pipe(delay(300))
      .subscribe((response) => {
        this._isVotingActive.set(response.active);
      });
  }

  setVotingActive(value: boolean) {
    this._isVotingActive.set(value);
  }
}

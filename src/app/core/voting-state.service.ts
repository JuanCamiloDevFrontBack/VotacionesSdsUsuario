import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';

export interface VotingStateResponse {
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class VotingStateService {
  private readonly _isVotingActive = signal(false);

  constructor() {
    this.loadVotingStateFromBackend(this._isVotingActive());
  }

  private loadVotingStateFromBackend(data: boolean) {
    // Simula una llamada al backend para consultar el estado de votación activo.
    of<VotingStateResponse>({ active: data })
      .pipe(delay(300))
      .subscribe((response) => {
        this._isVotingActive.set(response.active);
      });
  }

  getVotingActive() {
    return this._isVotingActive;
  }

  setVotingActive(value: boolean) {
    this._isVotingActive.set(value);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-votacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-votacion.component.html',
  styleUrls: ['./inicio-votacion.component.scss'],
})
export class InicioVotacionComponent {
  candidates = [
    {
      id: 1,
      name: 'P. Juan Perez',
      role: 'Párroco',
      location: 'Quito',
      avatar: 'https://i.pravatar.cc/88?img=32',
      //selected: true,
    },
    {
      id: 2,
      name: 'P. Luis Gómez',
      role: 'Administrador',
      location: 'Cuenca',
      avatar: 'https://i.pravatar.cc/88?img=12',
    },
    {
      id: 3,
      name: 'P. Carlos Torres',
      role: 'Capellán',
      location: 'Guayaquil',
      avatar: 'https://i.pravatar.cc/88?img=24',
    },
    {
      id: 4,
      name: 'P. Andrés Ruiz',
      role: 'Vicario',
      location: 'Quito',
      avatar: 'https://i.pravatar.cc/88?img=16',
      selected: true,
    },
    {
      id: 5,
      name: 'P. Felipe Suárez',
      role: 'Director',
      location: 'Ambato',
      avatar: 'https://i.pravatar.cc/88?img=18',
    },
    {
      id: 6,
      name: 'P. Javier Medina',
      role: 'Sacerdote',
      location: 'Quito',
      avatar: 'https://i.pravatar.cc/88?img=8',
    },
  ];
}

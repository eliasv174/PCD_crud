import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaisesComponent } from "./features/paises/paises.component";
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'pcd-prueba';

  ngOnInit(): void {
    initFlowbite();
  }
}

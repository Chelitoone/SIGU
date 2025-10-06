
// import { Component, OnInit } from '@angular/core';
// import { UsuarioService } from '../services/usuario.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-listar-usuarios',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './listar-usuarios.component.html',
//   styleUrls: ['./listar-usuarios.component.css']
// })
// export class ListarUsuariosComponent implements OnInit {
//   usuarios: any[] = [];
//   usuarioEnEdicionId: number | null = null;
//   usuarioEditado: any = {};

//   constructor(private usuarioService: UsuarioService) {}

//   ngOnInit(): void {
//     this.cargarUsuarios();
//   }

//   cargarUsuarios() {
//     this.usuarioService.obtenerUsuarios().subscribe({
//       next: (res) => {
//         this.usuarios = res;
//       },
//       error: (err) => {
//         console.error('Error cargando usuarios', err);
//       }
//     });
//   }

//   editar(usuario: any) {
//     this.usuarioEnEdicionId = usuario.id;
//     this.usuarioEditado = { ...usuario }; // copia para no modificar directamente
//   }

//   cancelarEdicion() {
//     this.usuarioEnEdicionId = null;
//     this.usuarioEditado = {};
//   }

//   guardarEdicion() {
//     this.usuarioService.editarUsuario(this.usuarioEditado.id, this.usuarioEditado).subscribe({
//       next: (res) => {
//         alert(res.message || 'Usuario actualizado');
//         this.cargarUsuarios();
//         this.cancelarEdicion();

//         const index = this.usuarios.findIndex(u => u.id === this.usuarioEditado.id); //esto es para actualizar en la tabla sin recargar
//         if (index !== -1) {
//           this.usuarios[index] = { ...this.usuarioEditado };
//         }
//       },
//       error: (err) => {
//         console.error(err);
//         alert('Error al actualizar usuario');
//       }
//     });
//   }

//   eliminar(id: number) {
//     if (confirm('¿Seguro que deseas eliminar este usuario?')) {
//       this.usuarioService.eliminarUsuario(id).subscribe({
//         next: (res) => {
//           alert(res.message);
//           this.cargarUsuarios();
//         },
//         error: (err) => {
//           console.error(err);
//           alert('Error al eliminar usuario');
//         }
//       });
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuarioEnEdicionId: number | null = null;
  usuarioEditado: any = {};

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (res) => {
        // res ya debe traer "programaNombre" desde el backend
        this.usuarios = res;
        console.log("Usuarios cargados:", this.usuarios); // 👈 para debug
      },
      error: (err) => {
        console.error('Error cargando usuarios', err);
      }
    });
  }

  editar(usuario: any) {
    this.usuarioEnEdicionId = usuario.id;
    this.usuarioEditado = { ...usuario };
  }

  cancelarEdicion() {
    this.usuarioEnEdicionId = null;
    this.usuarioEditado = {};
  }

  guardarEdicion() {
    this.usuarioService.editarUsuario(this.usuarioEditado.id, this.usuarioEditado).subscribe({
      next: (res) => {
        alert(res.message || 'Usuario actualizado');
        this.cargarUsuarios();
        this.cancelarEdicion();

        const index = this.usuarios.findIndex(u => u.id === this.usuarioEditado.id);
        if (index !== -1) {
          this.usuarios[index] = { ...this.usuarioEditado };
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar usuario');
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: (res) => {
          alert(res.message);
          this.cargarUsuarios();
        },
        error: (err) => {
          console.error(err);
          alert('Error al eliminar usuario');
        }
      });
    }
  }
}

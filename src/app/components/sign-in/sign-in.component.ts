import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private toastr: ToastrService,
    private _userService: UserService,
    private router: Router
  ){

  }

  addUser(){
    if(this.username == '' || this.password == '' || this.confirmPassword == ''){
      this.toastr.error('Todos los campos son obligatorios!', 'Error!');
      return;
    }

    if(this.password != this.confirmPassword){
      this.toastr.error('Las contraseñas tienes que ser iguales', 'Error');
      return;
    }


    const user: User = {
      username: this.username,
      password: this.password
    }

    console.log(user);

    this._userService.singIn(user).subscribe(data => {
      this.toastr.success('el usuario fue registrado con exito', 'Usuario Registrado');
      this.router.navigate(['/login']);
    });
  }
}

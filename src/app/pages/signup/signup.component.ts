import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm{
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginLayoutComponent, 
    ReactiveFormsModule, 
    PrimaryInputComponent
  ],
  providers:[
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
signupForm!: FormGroup;
private readonly toastService = inject(ToastrService);


constructor(
  private readonly router: Router,
  private readonly loginService: LoginService
){
this.signupForm = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('',[Validators.required, Validators.email]),
  password: new FormControl('',[Validators.required, Validators.minLength(6)]),
  passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
})
}

submit(){
  if (this.signupForm.value.password !== this.signupForm.value.passwordConfirm) {
    this.toastService.error("As senhas não coincidem");
    return;
  }

  this.loginService.signup(
    this.signupForm.value.name,
    this.signupForm.value.email, 
    this.signupForm.value.password
  ).subscribe({
    next: ()=> {
      this.toastService.success("Login feito com sucesso!!!");
      
      this.signupForm.reset();
    },
    error: (error)=> {
      console.error('Erro no cadastro:', error);
      this.toastService.error(error.error?.message ?? "Erro inesperado! Tente novamente mais tarde");
    
    }
  });

}

navigate(){
  this.router.navigate(["login"])
}

}

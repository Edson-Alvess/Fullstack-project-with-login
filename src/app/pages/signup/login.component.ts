import { Component, inject } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
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
export class LoginComponent {
loginForm!: FormGroup;
private readonly toastService = inject(ToastrService);
signupForm: any;


constructor(
  private readonly router: Router,
  private readonly loginService: LoginService
){
this.loginForm = new FormGroup({
  email: new FormControl('',[Validators.required, Validators.email]),
  password: new FormControl('',[Validators.required, Validators.minLength(6)])
})
}

submit(){
  this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
    next: ()=> this.toastService.success("Login feito com sucesso!!!"),
    error: ()=> this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    
  })
}

navigate(){
  this.router.navigate(["signup"])
}

}

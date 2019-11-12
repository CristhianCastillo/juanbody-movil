import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AdministrationService } from '../services/administration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;
  constructor(private router: Router, private registerService: AdministrationService,
    private formBuilder: FormBuilder,
    public alertController: AlertController, public loadingCtrl: LoadingController) {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirm: ['', Validators.required],
        age: ['', Validators.required],
        height: ['', Validators.required],
        weight: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  registerUser() {
    this.loadingCtrl.create({
      message: "Verificando..."
    }).then(a => {
      a.present();
      if (this.registerForm.valid) {
        let password = this.registerForm.value['password'];
        let confirm = this.registerForm.value['confirm'];
        if (password === confirm) {
          let user = {
            firstName: this.registerForm.value['firstname'],
            lastName: this.registerForm.value['lastname'],
            userName: this.registerForm.value['username'],
            password: this.registerForm.value['password'],
            age: this.registerForm.value['age'],
            height: this.registerForm.value['height'],
            weight: this.registerForm.value['weight'],
          };
          this.registerService.registerUser(user).subscribe((result: any) => {
            a.dismiss();
            if (result.code === "OK") {
              this.showAlertMessage("Usuario registrado correctamente, inicie sesión");
              this.router.navigateByUrl('/login');
            } else {
              this.showErrorAlert(result.result);
            }
          },
            (err) => {
              a.dismiss();
              console.error(err.message);
              this.showErrorAlert(err.message);
            });
        } else {
          a.dismiss();
          this.showErrorAlert("La confirmación no es la misma");
        }
      } else {
        a.dismiss();
        this.showErrorAlert('Faltan campos obligatorios');
      }
    });
  }

  showAlertMessage(message: string) {
    this.alertController.create({
      header: 'Message',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }

  showErrorAlert(message: string) {
    this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['Aceptar']
    }).then(alert => {
      alert.present();
    });
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}

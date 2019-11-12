import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { GlobalServiceService } from '../services/global-service.service';
import { AdministrationService } from '../services/administration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  constructor(private globalService: GlobalServiceService, public loadingCtrl: LoadingController, public alertController: AlertController, private formBuilder: FormBuilder, private loginService: AdministrationService, private router: Router) {
    this.loginForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }

  ngOnInit() {
  }

  loginUser() {
    this.loadingCtrl.create({
      message: "Verificando..."
    }).then(a => {
      a.present();
      if (this.loginForm.valid) {
        let user = {
          username: this.loginForm.value['username'],
          password: this.loginForm.value['password']
        }
        this.loginService.loginUser(user).subscribe((result: any) => {
          a.dismiss();
          if (result.code === "OK") {
            this.globalService.token = result.result.token;
            this.globalService.idUser = result.result.id;
            this.router.navigateByUrl('/tabs/tab2');
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
        this.showErrorAlert('Faltan campos obligatorios');
      }
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

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

}

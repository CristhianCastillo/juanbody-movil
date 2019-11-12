import { Component } from '@angular/core';
import { AdministrationService } from '../services/administration.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public trainings: any;
  constructor(private trainingsService: AdministrationService, public alertController: AlertController,
    public loadingCtrl: LoadingController) {
    this.loadingCtrl.create({
      message: "Cargando ejercicios..."
    }).then(a => {
      a.present();
      this.trainingsService.getTrainings().subscribe((result: any) => {
        a.dismiss();
        if (result.code === "OK") {
          this.trainings = result.result;
        } else {
          this.showErrorAlert(result.result);
        }
      },
        (err) => {
          a.dismiss();
          console.log(err.message);
          this.showErrorAlert(err.message);
        });
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

}

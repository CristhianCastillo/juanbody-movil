import { Component } from '@angular/core';
import { AdministrationService } from '../services/administration.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { GlobalServiceService } from '../services/global-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public trainings: any;
  constructor(private trainingsService: AdministrationService, public alertController: AlertController,
    public loadingCtrl: LoadingController, private globalProvider: GlobalServiceService) {
    this.loadingCtrl.create({
      message: "Cargando tus datos..."
    }).then(a => {
      a.present();
      this.trainingsService.getPractice(this.globalProvider.idUser).subscribe((result: any) => {
        a.dismiss();
        if (result.code === "OK") {
          this.trainings = result.result;
          console.log(this.trainings);
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

  doRefresh(event) {
    console.log('Begin async operation');
    this.trainingsService.getPractice(this.globalProvider.idUser).subscribe((result: any) => {
      event.target.complete();
      if (result.code === "OK") {
        this.trainings = result.result;
      } else {
        this.showErrorAlert(result.result);
      }
    },
      (err) => {
        event.target.complete();
        console.log(err.message);
        this.showErrorAlert(err.message);
      });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
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

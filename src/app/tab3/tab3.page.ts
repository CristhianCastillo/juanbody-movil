import { Component } from '@angular/core';
import { AdministrationService } from '../services/administration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { GlobalServiceService } from '../services/global-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public trainings: any;
  public exercises: any;
  public exerciseForm: FormGroup;
  constructor(private trainingsService: AdministrationService, public alertController: AlertController,
    public loadingCtrl: LoadingController, private formBuilder: FormBuilder,
    private globalService: GlobalServiceService) {
    this.exerciseForm = this.formBuilder.group(
      {
        exercise: ['', [Validators.required]],
        time: ['', [Validators.required]]
      }
    );
    this.trainingsService.getExcercises().subscribe((result: any) => {
      if (result.code === "OK") {
        this.exercises = result.result;
      } else {
        this.showErrorAlert(result.result);
      }
    },
      (err) => {
        console.error(err.message);
        this.showErrorAlert(err.message);
      });

  }

  registerExercise() {
    this.loadingCtrl.create({
      message: "Verificando..."
    }).then(a => {
      a.present();
      if (this.exerciseForm.valid) {
        let practice = {
          userEntity: {
            id: this.globalService.idUser
          },
          exerciseEntity: {
            id: this.exerciseForm.value['exercise']
          },
          time: this.exerciseForm.value['time']
        };
        this.trainingsService.createPractice(practice).subscribe((result: any) => {
          a.dismiss();
          if (result.code === "OK") {
            this.showAlertMessage("Actividad fisica regitrada correctamente.");
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

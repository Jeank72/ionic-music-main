import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio!" },
      { type: "pattern", message: "Email invalido, rectifiquelo" }
    ],
    password: [
      { type: "required", message: "Por Favor ingrese una Contraseña"},
      { type: "minlength", message: "Su contraseña debe ser al menos 6 caracteres" }
    ]

  };

  errorMessage: string = "";

  constructor(private formBuilder: FormBuilder, private authService: AuthenticateService, private navCtrl: NavController, private storage: Storage,private alertController: AlertController) { 

    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")
        ])
      ),
    password: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])
    )
    
  }
    
    )

  }

  ngOnInit() {
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'No se pudo iniciar sesión',
      message: 'Verifica tus datos, si no tienes una cuenta registrate',
      buttons: [
         {
          text: 'Aceptar',
          id: 'confirm-button',
          handler: () => {
            console.log('confirmación exitosa');
          }
        }
      ]
    });

    await alert.present();
  }

  loginUser(credentials){
    //console.log(credentials);
    this.authService.loginUser(credentials).then(
      res => {
        this.errorMessage = "";
        this.storage.set("isUserLoggedIn", true)
        this.navCtrl.navigateForward("/menu/home");
      }
    ).catch( err => {
      this.errorMessage = err;
      this.presentAlertConfirm();
    })
  }

  goToRegister(){
    this.navCtrl.navigateForward("/register");
  }

  test(){
    const password = "123456789"
    const password_base64 = btoa(password)
    const password_dec = atob(password_base64)
    console.log("password encr: " + password_base64 +" password dec: " + password_dec)
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = "";
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: "El Email es obligatorio!" },
      { type: "pattern", message: "Email invalido, rectifiquelo" }
      
    ],
    password: [
      { type: "required", message: "Por Favor ingrese una Contraseña"},
      { type: "minlength", message: "Su contraseña debe ser al menos 6 caracteres" },
      { type: "maxlength", message: "Su contraseña no debe superar los 10 caracteres" } //Validator adicional
      

    ],
    nombre: [
      { type: "required", message: "El nombre es obligatorio!" }
    ],
    apellido: [
      { type: "required", message: "El apellido es obligatorio!" }
    ]
  }
  constructor(private formBuilder: FormBuilder, private navCtrl: NavController, private storage: Storage,private authService: AuthenticateService,private alertController: AlertController) {
    this.storage.create();
    this.registerForm = this.formBuilder.group({
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
          Validators.minLength(6),
          Validators.maxLength(10) // validator adicional 
        ])

        
      ),
      nombre: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      ),
      apellido: new FormControl(
        "",
        Validators.compose([
          Validators.required
        ])
      )
    });
   }
   
  //Aviso registro éxitoso
   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro exitoso!',
      message: 'Ingresa tus datos y disfruta de la mejor música!!',
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

  ngOnInit() {
  }

  register(registerData){
    
    this.authService.registerUser(registerData).then(()=> {
      this.navCtrl.navigateBack("/login");
    } );
  }

  goToLogin(){
    this.navCtrl.navigateBack("/login")
  }
}

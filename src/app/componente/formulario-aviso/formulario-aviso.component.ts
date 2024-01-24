import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Aviso } from 'src/app/modelo/avisos';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons'
import { cameraOutline } from 'ionicons/icons'
import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-formulario-aviso',
  templateUrl: './formulario-aviso.component.html',
  styleUrls: ['./formulario-aviso.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FormularioAvisoComponent implements OnInit {

  tituloStr: string = ""
  fotoStr: string = ""
  descripcionStr: string = ""
  picture: string | undefined
  @Output() onCreate = new EventEmitter<Aviso>()

  constructor(private router: Router) { addIcons({ cameraOutline }) }

  ngOnInit() { this.picture = "https://www.adslzone.net/app/uploads-adslzone.net/2020/12/imagenes.jpg" }

  onClick() {
    var aviso: Aviso = ({
      ID: 1, titulo: this.tituloStr, foto: this.picture,
      descripcion: this.descripcionStr
    })
    this.onCreate.emit(aviso)
    this.router.navigate(['home'])
  }

  async sacarFoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    this.picture = image.dataUrl
  }

}

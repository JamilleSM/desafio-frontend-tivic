import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-abordagem',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './cadastrar-abordagem.component.html',
  styleUrl: './cadastrar-abordagem.component.scss'
})
export class CadastrarAbordagemComponent {
  formGroup: FormGroup = new FormGroup({
    idAbordagem: new FormControl(''),
    testeBafometro: new FormControl('', [Validators.required]),
    nivelAlcool: new FormControl('', [Validators.required]),
    valorMulta: new FormControl('', [Validators.required]),
    dataRecolhimento: new FormControl('', [Validators.required]),
    idVeiculo: new FormControl('', [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<CadastrarAbordagemComponent>,
  ) { }

  closeModal() {
    this.dialogRef.close();
  }
}

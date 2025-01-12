import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastrarAbordagemComponent } from '../cadastrar-abordagem/cadastrar-abordagem.component';

@Component({
  selector: 'app-cadastrar-operacao',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './cadastrar-operacao.component.html',
  styleUrl: './cadastrar-operacao.component.scss'
})
export class CadastrarOperacaoComponent {
  formGroup: FormGroup = new FormGroup({
    idOperacao: new FormControl(''),
    dataInicio: new FormControl('', [Validators.required]),
    dataFinal: new FormControl('', [Validators.required]),
    local: new FormControl('', [Validators.required]),
    nomeResponsavel: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    observacoes: new FormControl(''),
  });

  constructor(
    private dialogRef: MatDialogRef<CadastrarOperacaoComponent>,
    private dialog: MatDialog
  ) { }

  closeModal() {
    this.dialogRef.close();
  }

  openModal() {
    const dialogRef = this.dialog.open(CadastrarAbordagemComponent, {});
  }
}

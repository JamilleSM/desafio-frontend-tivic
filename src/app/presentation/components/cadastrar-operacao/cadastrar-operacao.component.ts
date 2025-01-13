import { DatePipe, formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { OperacoesRepositoryImpl } from '../../../data/repositories/operacao-impl.repository';
import { Operacao } from '../../../domain/models/operacao.model';
import { CadastrarAbordagemComponent } from '../cadastrar-abordagem/cadastrar-abordagem.component';
import { ValidatorComponent } from '../validator/validator.component';
import { Abordagem } from '../../../domain/models/abordagem.model';
import { AbordagemRepositoryImpl } from '../../../data/repositories/abordagem-impl.repository';

@Component({
  selector: 'app-cadastrar-operacao',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule, ValidatorComponent, DatePipe],
  templateUrl: './cadastrar-operacao.component.html',
  styleUrl: './cadastrar-operacao.component.scss'
})
export class CadastrarOperacaoComponent {
  abordagens: Abordagem[] = [];
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    dataInicio: new FormControl('', [Validators.required]),
    dataFinal: new FormControl('', [Validators.required]),
    local: new FormControl('', [Validators.required]),
    nomeResponsavel: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    observacoes: new FormControl(''),
  });

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<CadastrarOperacaoComponent>);
  dialog = inject(MatDialog);
  operacoesRepository = inject(OperacoesRepositoryImpl);
  abordagensRepository = inject(AbordagemRepositoryImpl);
  toast = inject(ToastrService);

  get isUpdate() {
    return this.formGroup.get('id')?.value;
  }

  ngOnInit(): void {
    if(this.data?.operacao) {
      this.updateForm(this.data.operacao);
    }
    this.getAbordagem();
  }

  closeModal() {
    this.dialogRef.close();
  }

  openModal() {
    const dialogRef = this.dialog.open(CadastrarAbordagemComponent, {});
  }

  async getAbordagem(): Promise<void> {
    try {
      this.abordagens = await this.abordagensRepository.getAbordagem();
    } catch {
      this.toast.success('Erro ao obter abordagens.');
    }
  }

  async setOperacao(operacao: Operacao): Promise<void> {
    try {
      await this.operacoesRepository.setOperacao(operacao);
      this.closeModal();
      this.toast.success('Operação cadastrada com sucesso!');
    } catch {
      this.toast.error('Erro ao cadastrar operação.');
    }
  }

  async updateOperacao(operacao: Operacao): Promise<void> {
    try {
      await this.operacoesRepository.updateOperacao(operacao.id, operacao);
      this.closeModal();
      this.toast.success('Operação atualizada com sucesso!');
    } catch {
      this.toast.error('Erro ao atualizar operação.');
    }
  }

  submitForm(): void {
    if(this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.toast.warning('Preencha os campos obrigatórios!');
      return;
    }

    const operacao = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.updateOperacao(operacao);
      return;
    }
    this.setOperacao(operacao);
    return;
  }

  private updateForm(operacao: Operacao): void {
    this.formGroup.patchValue(operacao)
    this.formGroup.updateValueAndValidity();
    
    this.formGroup.get("dataInicio")?.setValue(formatDate(operacao.dataInicio, "yyyy-MM-dd", "pt-BR"))
    this.formGroup.get("dataFinal")?.setValue(formatDate(operacao.dataFinal, "yyyy-MM-dd", "pt-BR"))
  }
}

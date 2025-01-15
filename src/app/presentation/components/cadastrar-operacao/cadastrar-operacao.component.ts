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
import { VeiculoRepositoryImpl } from '../../../data/repositories/veiculo-impl.repository';
import { Veiculo } from '../../../domain/models/veiculo.model';

@Component({
  selector: 'app-cadastrar-operacao',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule, ValidatorComponent, DatePipe],
  templateUrl: './cadastrar-operacao.component.html',
  styleUrl: './cadastrar-operacao.component.scss'
})
export class CadastrarOperacaoComponent {
  abordagens: Abordagem[] = [];
  veiculos: Veiculo[] = [];
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
  veiculosRepository = inject(VeiculoRepositoryImpl);
  toast = inject(ToastrService);

  get minDate() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 7);
    return currentDate.toISOString().split('T')[0]; 
  }

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
    const dialogRef = this.dialog.open(CadastrarAbordagemComponent, {
      width: '60vw', 
      minWidth: "60vw",
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) this.abordagens.push(result)
    });
  }

  atualizarAbordagemModal(abordagem: Abordagem) {
    const dialogRef = this.dialog.open(CadastrarAbordagemComponent, {
      width: '60vw', 
      minWidth: "60vw",
      data: { abordagem },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        const abordagemIndex = this.abordagens.findIndex(a => a.id === result.id)
        if(abordagemIndex >= 0) this.abordagens[abordagemIndex] = result
        console.log(this.abordagens)
      }
      this.getAbordagem();
    });
  }

  async getAbordagem(): Promise<void> {
    try {
      const abordagens = await this.abordagensRepository.getAbordagem();
  
      if (this.isUpdate) {
        const operacaoId = this.formGroup.get('id')?.value;
        this.abordagens = abordagens.filter(abordagem => abordagem.idOperacao == operacaoId);
      }
    } catch {
      this.toast.error('Erro ao obter abordagens.');
    }
  }

  async getVeiculo(): Promise<void> {
    try {
      const veiculos = await this.veiculosRepository.getVeiculo();
  
      if (this.isUpdate) {
        this.abordagens.map(abordagem => {
          this.veiculos = veiculos.filter(veiculo => veiculo.id === abordagem.idVeiculo);
        });
      }
    } catch {
      this.toast.error('Erro ao obter veículos.');
    }
  }

  async setOperacao(operacao: Operacao): Promise<void> {
    try {
      const savedOperacao = await this.operacoesRepository.setOperacao(operacao);
      for(const abordagem of this.abordagens) {
        if(!abordagem.idOperacao) {
          abordagem.idOperacao = savedOperacao.id;
          this.updateAbordagem(abordagem);
        }
      }
      this.closeModal();
      this.toast.success('Operação cadastrada com sucesso!');
    } catch {
      this.toast.error('Erro ao cadastrar operação.');
    }
  }

  async updateAbordagem(abordagem: Abordagem): Promise<void> {
    try {
      await this.abordagensRepository.updateAbordagem(abordagem.id, abordagem);
      this.closeModal();
    } catch {
      this.toast.error('Erro ao atualizar abordagem.');
    }
  }

  async updateOperacao(operacao: Operacao): Promise<void> {
    try {
      await this.operacoesRepository.updateOperacao(operacao.id, operacao);
      for(const abordagem of this.abordagens) {
        if(!abordagem.idOperacao) {
          abordagem.idOperacao = this.formGroup.get('id')?.value;
          this.updateAbordagem(abordagem);
        }
      }
      this.closeModal();
      this.toast.success('Operação atualizada com sucesso!');
    } catch {
      this.toast.error('Erro ao atualizar operação.');
    }
  }

  async deleteAbordagem(abordagem: Abordagem): Promise<void> {
    const id = abordagem.id;
    if (!id) {
      this.toast.warning('ID da abordagem não encontrado.');
      return;
    }
  
    try {
      await this.abordagensRepository.deleteAbordagem(id);
      this.toast.success('Abordagem deletada com sucesso!');
      this.getAbordagem();
    } catch {
      this.toast.error('Erro ao deletar abordagem.');
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

    delete operacao["id"]
    this.setOperacao(operacao);
  }

  private updateForm(operacao: Operacao): void {
    this.formGroup.patchValue(operacao)
    this.formGroup.updateValueAndValidity();
    
    this.formGroup.get("dataInicio")?.setValue(formatDate(operacao.dataInicio, "yyyy-MM-dd", "pt-BR"))
    this.formGroup.get("dataFinal")?.setValue(formatDate(operacao.dataFinal, "yyyy-MM-dd", "pt-BR"))
  }
}

import { formatDate } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { AbordagemRepositoryImpl } from '../../../data/repositories/abordagem-impl.repository';
import { VeiculoRepositoryImpl } from '../../../data/repositories/veiculo-impl.repository';
import { Abordagem } from '../../../domain/models/abordagem.model';
import { Veiculo } from '../../../domain/models/veiculo.model';
import { ValidatorComponent } from '../validator/validator.component';

@Component({
  selector: 'app-cadastrar-abordagem',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule, ValidatorComponent],
  templateUrl: './cadastrar-abordagem.component.html',
  styleUrl: './cadastrar-abordagem.component.scss'
})
export class CadastrarAbordagemComponent {
  veiculos: Veiculo[] = [];
  filteredVeiculos: Veiculo[] = [];
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    testeBafometro: new FormControl('', [Validators.required]),
    nivelAlcool: new FormControl(''),
    valorMulta: new FormControl(''),
    dataRecolhimento: new FormControl(''),
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    rg: new FormControl('', [Validators.required]),
    dataNascimento: new FormControl('', [Validators.required]),
    idCondutor: new FormControl(''),
    idOperacao: new FormControl(''),
    idVeiculo: new FormControl(''),
  });

  data = inject(MAT_DIALOG_DATA);
  abordagemRepository = inject(AbordagemRepositoryImpl);
  veiculosRepository = inject(VeiculoRepositoryImpl);
  dialogRef = inject(MatDialogRef<CadastrarAbordagemComponent>);
  toast = inject(ToastrService);
  dialog = inject(MatDialog);

  get isUpdate() {
    return this.formGroup.get('id')?.value;
  }

  ngOnInit(): void {
    if(this.data?.abordagem) {
      this.updateForm(this.data.abordagem);
    }
    this.getVeiculo();
  }

  closeModal(result?: Abordagem) {
    this.dialogRef.close(result);
  }

  async getVeiculo(): Promise<void> {
    try {
      this.veiculos = await this.veiculosRepository.getVeiculo();
     this.filteredVeiculos = this.veiculos;
    } catch {
      this.toast.success('Erro ao obter operações.');
    }
  }

  async setAbordagem(abordagem: Abordagem): Promise<void> {
    try {
      const result = await this.abordagemRepository.setAbordagem(abordagem);
      this.closeModal(result as Abordagem);
      this.toast.success('Abordagem cadastrada com sucesso!');
    } catch {
      this.toast.error('Erro ao cadastrar abordagem.');
    }
  }

  async updateAbordagem(abordagem: Abordagem): Promise<void> {
    try {
      await this.abordagemRepository.updateAbordagem(abordagem.id, abordagem);
      this.closeModal(abordagem);
      this.toast.success('Abordagem atualizada com sucesso!');
    } catch {
      this.toast.error('Erro ao atualizar abordagem.');
    }
  }

  searchVeiculo(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.filteredVeiculos = input ? this.veiculos.filter(v => v.placa.toLowerCase().includes(input.toLowerCase())) : this.veiculos;
  }

  onChangeVeiculo(veiculo: Veiculo) {
    this.formGroup.get("idVeiculo")?.setValue(veiculo.id)
  }

  submitForm(): void {
    if(this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.toast.warning('Preencha os campos obrigatórios!');
      return;
    }

    const abordagem = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.updateAbordagem(abordagem);
      return;
    }

    delete abordagem["id"]
    console.log("saved", abordagem)
    this.setAbordagem(abordagem);
  }

  private updateForm(abordagem: Abordagem): void {
    this.formGroup.patchValue(abordagem)
    this.formGroup.updateValueAndValidity();
    
    this.formGroup.get("dataRecolhimento")?.setValue(formatDate(abordagem.dataRecolhimento, "yyyy-MM-dd", "pt-BR"))
  }
}

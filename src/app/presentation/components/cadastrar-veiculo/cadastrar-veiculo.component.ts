import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { VeiculoRepositoryImpl } from '../../../data/repositories/veiculo-impl.repository';
import { Veiculo } from '../../../domain/models/veiculo.model';
import { ValidatorComponent } from '../validator/validator.component';

@Component({
  selector: 'app-cadastrar-veiculo',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule, ValidatorComponent],
  templateUrl: './cadastrar-veiculo.component.html',
  styleUrl: './cadastrar-veiculo.component.scss'
})
export class CadastrarVeiculoComponent {
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    placa: new FormControl('', [Validators.required]),
    marca: new FormControl('', [Validators.required]),
    modelo: new FormControl('', [Validators.required]),
    numeroCnh: new FormControl('', [Validators.required]),
    situacaoVeiculo: new FormControl('', [Validators.required]),
    idCondutor: new FormControl(''),
  });

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<CadastrarVeiculoComponent>);
  dialog = inject(MatDialog);
  veiculoRepository = inject(VeiculoRepositoryImpl);
  toast = inject(ToastrService);

  get isUpdate() {
    return this.formGroup.get('id')?.value;
  }

  ngOnInit(): void {
    if(this.data?.veiculo) {
      this.updateForm(this.data.veiculo);
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  async setVeiculo(veiculo: Veiculo): Promise<void> {
    try {
      await this.veiculoRepository.setVeiculo(veiculo);
      this.closeModal();
      this.toast.success('Veículo cadastrada com sucesso!');
    } catch {
      this.toast.error('Erro ao cadastrar veículo.');
    }
  }

  async updateVeiculo(veiculo: Veiculo): Promise<void> {
    try {
      await this.veiculoRepository.updateVeiculo(veiculo.id, veiculo);
      this.closeModal();
      this.toast.success('Veículo atualizada com sucesso!');
    } catch {
      this.toast.error('Erro ao atualizar veículo.');
    }
  }

  submitForm(): void {
    if(this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.toast.warning('Preencha os campos obrigatórios!');
      return;
    }

    const veiculo = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.updateVeiculo(veiculo);
      return;
    }
    this.setVeiculo(veiculo);
    return;
  }

  private updateForm(veiculo: Veiculo): void {
    this.formGroup.patchValue(veiculo)
    this.formGroup.updateValueAndValidity();
  }
}

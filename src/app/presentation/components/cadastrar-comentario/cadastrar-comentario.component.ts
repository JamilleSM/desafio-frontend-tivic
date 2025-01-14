import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { ComentarioRepositoryImpl } from '../../../data/repositories/comentario-impl.repository';
import { Comentario } from '../../../domain/models/comentario.model';
import { ValidatorComponent } from '../validator/validator.component';

@Component({
  selector: 'app-cadastrar-comentario',
  imports: [MatIconModule, MatDialogModule, ReactiveFormsModule, ValidatorComponent],
  templateUrl: './cadastrar-comentario.component.html',
  styleUrl: './cadastrar-comentario.component.scss'
})
export class CadastrarComentarioComponent {
  comentarios: Comentario[] = [];
  formGroup: FormGroup = new FormGroup({
    id: new FormControl(''),
    idUsuario: new FormControl(''),
    mensagem: new FormControl('', [Validators.required]),
  });

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<CadastrarComentarioComponent>);
  comentarioRepository = inject(ComentarioRepositoryImpl);
  toast = inject(ToastrService);

  get isUpdate() {
    return this.formGroup.get('id')?.value;
  }

  ngOnInit(): void {
    if(this.data?.comentario) {
      this.updateForm(this.data.comentario);
    }
    this.getComentario();
  }

  closeModal() {
    this.dialogRef.close();
  }

  async getComentario(): Promise<void> {
    try {
      this.comentarios = await this.comentarioRepository.getComentario();
    } catch {
      this.toast.success('Erro ao obter comentários.');
    }
  }

  async setComentario(comentario: Comentario): Promise<void> {
    try {
      await this.comentarioRepository.setComentario(comentario);
      this.closeModal();
      this.toast.success('Comentário cadastrado com sucesso!');
    } catch {
      this.toast.error('Erro ao cadastrar comentário.');
    }
  }

  async updateComentario(comentario: Comentario): Promise<void> {
    try {
      await this.comentarioRepository.updateComentario(comentario.id, comentario);
      this.closeModal();
      this.toast.success('Comentário atualizada com sucesso!');
    } catch {
      this.toast.error('Erro ao atualizar comentário.');
    }
  }

  submitForm(): void {
    if(this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.toast.warning('Preencha os campos obrigatórios!');
      return;
    }

    const comentario = this.formGroup.getRawValue();

    if (this.isUpdate) {
      this.updateComentario(comentario);
      return;
    }
    this.setComentario(comentario);
    return;
  }

  private updateForm(comentario: Comentario): void {
    this.formGroup.patchValue(comentario)
    this.formGroup.updateValueAndValidity();
  }
}

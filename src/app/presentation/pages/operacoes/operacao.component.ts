import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { AuthUseCase } from '../../../core/usecases/auth/auth.usecase';
import { OperacoesRepositoryImpl } from '../../../data/repositories/operacao-impl.repository';
import { Operacao } from '../../../domain/models/operacao.model';
import { CadastrarComentarioComponent } from '../../components/cadastrar-comentario/cadastrar-comentario.component';
import { CadastrarOperacaoComponent } from '../../components/cadastrar-operacao/cadastrar-operacao.component';

@Component({
  selector: 'app-operacao',
  imports: [MatIconModule, MatDialogModule, MatMenuModule, DatePipe, ReactiveFormsModule, AsyncPipe],
  templateUrl: './operacao.component.html',
  styleUrl: './operacao.component.scss'
})
export class OperacaoComponent {
  operacoes: Operacao[] = [];
  filteredOperacoes: Operacao[] = [];
  filterForm: FormGroup = new FormGroup({
    dataInicio: new FormControl(''),
    dataFinal: new FormControl(''),
    local: new FormControl(''),
    nomeResponsavel: new FormControl(''),
  });
  @ViewChild(MatMenuTrigger) matMenuTrigger: MatMenuTrigger;

  operacoesRepository = inject(OperacoesRepositoryImpl);
  dialog = inject(MatDialog);
  toast = inject(ToastrService);
  authUseCase = inject(AuthUseCase);
  isLoggedIn$ = this.authUseCase.isLoggedIn$;

  ngOnInit(): void {
    this.getOperacoes();
  }

  openModal() {
    const dialogRef = this.dialog.open(CadastrarOperacaoComponent, {
      width: '40vw', minWidth: "40vw"
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOperacoes();
    });
  }

  openModalComentario() {
    const dialogRef = this.dialog.open(CadastrarComentarioComponent, {
      width: '60vw', minWidth: "60vw"
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOperacoes();
    });
  }

  atualizarModal(operacao: Operacao) {
    const dialogRef = this.dialog.open(CadastrarOperacaoComponent, {
      width: '60vw', 
      minWidth: "60vw",
      data: { operacao },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getOperacoes();
    });
  }

  async getOperacoes(): Promise<void> {
    try {
      this.operacoes = await this.operacoesRepository.getOperacao();
      this.filteredOperacoes = this.operacoes;
    } catch (err) {
      this.toast.error('Erro ao obter operações.');
    }
  }
 
  async deleteOperacao(operacao: Operacao): Promise<void> {
    const id = operacao.id;
    if (!id) {
      this.toast.warning('ID da operação não encontrado.');
      return;
    }
  
    try {
      await this.operacoesRepository.deleteOperacao(id);
      this.toast.success('Operação deletada com sucesso!');
      this.getOperacoes();
    } catch {
      this.toast.error('Erro ao deletar operação.');
    }
  }

  parseDate(input: string | Date): string {
    const date = new Date(input)
    if(input.toString().includes("T")) date.setHours(date.getHours() - 3);

    return date.toISOString().split('T')[0];
  }

  applyFilters(event: Event): void {
    event.stopImmediatePropagation();
    const { dataInicio, dataFinal, nomeResponsavel, local } = this.filterForm.value;
    
    this.filteredOperacoes = this.operacoes.filter((operacao) => {
      if (dataInicio && this.parseDate(operacao.dataInicio) !== dataInicio) return false;
      if (dataFinal && this.parseDate(operacao.dataFinal) !== dataFinal) return false;
      if (nomeResponsavel && !operacao.nomeResponsavel?.toLowerCase().includes(nomeResponsavel.toLowerCase())) return false;
      if (local && !operacao.local?.toLowerCase().includes(local.toLowerCase())) return false;
      
      return true;
    });

    if (this.matMenuTrigger) {
      this.matMenuTrigger.closeMenu();
    }
  }
}

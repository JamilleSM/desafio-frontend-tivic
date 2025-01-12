import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Operacao } from '../../../domain/models/operacao.model';
import { OperacoesRepositoryImpl } from '../../../data/repositories/operacao-impl.repository';

@Component({
  selector: 'app-operacao',
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './operacao.component.html',
  styleUrl: './operacao.component.scss'
})
export class OperacaoComponent {
  operacoes: Operacao[] = [];

  constructor(private operacoesRepository: OperacoesRepositoryImpl) {}

  ngOnInit(): void {
    this.getOperacoes();
  }

  async getOperacoes(): Promise<void> {
    try {
      this.operacoes = await this.operacoesRepository.getOperacao();
    } catch (err) {
      console.error('Erro ao carregar operações', err);
    }
  }
}

import { DatePipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { ToastrService } from "ngx-toastr";
import { OperacoesRepositoryImpl } from "../../../data/repositories/operacao-impl.repository";
import { Operacao } from "../../../domain/models/operacao.model";
import { HeaderComponent } from "../../components/header/header.component";
import { Veiculo } from "../../../core/entities/veiculo.entity";
import { VeiculoRepositoryImpl } from "../../../data/repositories/veiculo-impl.repository";
import { Abordagem } from "../../../domain/models/abordagem.model";
import { AbordagemRepositoryImpl } from "../../../data/repositories/abordagem-impl.repository";

enum StatusOperacao {
  EM_ANDAMENTO = "Em andamento",
  CONCLUIDA = "Concluído"
}

@Component({
  selector: 'app-relatorio',
  imports: [MatIconModule, ReactiveFormsModule, DatePipe],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.scss'
})
export class RelatorioComponent {
  operacoes: Operacao[] = [];
  operacoesAndamento: Operacao[] = [];
  operacoesConcluidas: Operacao[] = [];
  veiculos: Veiculo[] = [];
  abordagens: Abordagem[] = [];
  operacoesRepository = inject(OperacoesRepositoryImpl);
  veiculosRepository = inject(VeiculoRepositoryImpl);
  abordagensRepository = inject(AbordagemRepositoryImpl);
  toast = inject(ToastrService);

  ngOnInit(): void {
    this.getOperacoes();
    this.getVeiculo();
    this.getAbordagem();
  }

  async getOperacoes(): Promise<void> {
    try {
      const operacoes = await this.operacoesRepository.getOperacao();
      this.operacoes = operacoes
      this.operacoesAndamento = operacoes.filter(o => o.status === StatusOperacao.EM_ANDAMENTO);
      this.operacoesAndamento = operacoes.filter(o => o.status === StatusOperacao.EM_ANDAMENTO);
      this.operacoesConcluidas = operacoes.filter(o => o.status === StatusOperacao.CONCLUIDA);
    } catch {
      this.toast.success('Sem operações no momento.');
    }
  }

  async getVeiculo(): Promise<void> {
    try {
      this.veiculos = await this.veiculosRepository.getVeiculo();
    } catch (err) {
      this.toast.success('Erro ao obter operações.');
    }
  }

  async getAbordagem(): Promise<void> {
    try {
      this.abordagens = await this.abordagensRepository.getAbordagem();
    } catch {
      this.toast.success('Erro ao obter abordagens.');
    }
  }
}
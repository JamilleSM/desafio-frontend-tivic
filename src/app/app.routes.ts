import { Routes } from '@angular/router';
import { OperacaoComponent } from './presentation/pages/operacoes/operacao.component';
import { VeiculoComponent } from './presentation/pages/veiculos/veiculo.component';
import { LoginComponent } from './presentation/pages/login/login.component';
import { RelatorioComponent } from './presentation/pages/relatorios/relatorio.component';

export const routes: Routes = [
    { path: '', component: RelatorioComponent },
    { path: 'relatorio', component: RelatorioComponent },
    { path: 'operacao', component: OperacaoComponent },
    { path: 'veiculo', component: VeiculoComponent },
    { path: 'login', component: LoginComponent },
];

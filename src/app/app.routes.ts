import { Routes } from '@angular/router';
import { OperacaoComponent } from './presentation/pages/operacoes/operacao.component';
import { VeiculoComponent } from './presentation/pages/veiculos/veiculo.component';

export const routes: Routes = [
    { path: '', component: OperacaoComponent },
    { path: 'operacao', component: OperacaoComponent },
    { path: 'veiculo', component: VeiculoComponent },
];

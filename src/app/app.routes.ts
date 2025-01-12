import { Routes } from '@angular/router';
import { OperacaoComponent } from './presentation/pages/operacoes/operacao.component';

export const routes: Routes = [
    { path: '', component: OperacaoComponent },
    { path: 'operacao', component: OperacaoComponent },
];

import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ToastrService } from 'ngx-toastr';
import { AuthUseCase } from '../../../core/usecases/auth/auth.usecase';
import { VeiculoRepositoryImpl } from '../../../data/repositories/veiculo-impl.repository';
import { Veiculo } from '../../../domain/models/veiculo.model';
import { CadastrarVeiculoComponent } from '../../components/cadastrar-veiculo/cadastrar-veiculo.component';

@Component({
  selector: 'app-veiculo',
  imports: [MatIconModule, MatDialogModule, MatMenuModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './veiculo.component.html',
  styleUrl: './veiculo.component.scss'
})
export class VeiculoComponent {
  veiculos: Veiculo[] = [];
  filteredVeiculos: Veiculo[] = [];
  filterForm: FormGroup = new FormGroup({
    placa: new FormControl(''),
  });
  @ViewChild(MatMenuTrigger) matMenuTrigger: MatMenuTrigger;

  veiculosRepository = inject(VeiculoRepositoryImpl);
  dialog = inject(MatDialog);
  toast = inject(ToastrService);
  authUseCase = inject(AuthUseCase);
  isLoggedIn$ = this.authUseCase.isLoggedIn$;

  ngOnInit(): void {
    this.getVeiculo();
  }

  openModal() {
    const dialogRef = this.dialog.open(CadastrarVeiculoComponent, {
      width: '60vw', minWidth: "60vw"
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getVeiculo();
    });
  }

  atualizarModal(veiculo: Veiculo) {
    const dialogRef = this.dialog.open(CadastrarVeiculoComponent, {
      width: '60vw', 
      minWidth: "60vw",
      data: { veiculo },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getVeiculo();
    });
  }

  async getVeiculo(): Promise<void> {
    try {
      this.veiculos = await this.veiculosRepository.getVeiculo();
     this.filteredVeiculos = this.veiculos;
    } catch (err) {
      this.toast.error('Erro ao obter operações.');
    }
  }
 
  async deleteOperacao(veiculo: Veiculo): Promise<void> {
    const id = veiculo.id;
    if (!id) {
      this.toast.warning('ID da operação não encontrado.');
      return;
    }
  
    try {
      await this.veiculosRepository.deleteVeiculo(id);
      this.toast.success('Veículo deletada com sucesso!');
      this.getVeiculo();
    } catch {
      this.toast.error('Erro ao deletar veículo.');
    }
  }

  parseDate(input: string | Date): string {
    const date = new Date(input)
    if(input.toString().includes("T")) date.setHours(date.getHours() - 3);

    return date.toISOString().split('T')[0];
  }

  applyFilters(event: Event): void {
    event.stopImmediatePropagation();
    const { placa } = this.filterForm.value;
    
    this.filteredVeiculos = this.veiculos.filter((veiculo) => {
      if (placa && !veiculo.placa?.toLowerCase().includes(placa.toLowerCase())) return false;
      
      return true;
    });

    if (this.matMenuTrigger) {
      this.matMenuTrigger.closeMenu();
    }
  }
}

import { Component, inject } from "@angular/core";
import { MatDialog, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { CadastrarOperacaoComponent } from "../cadastrar-operacao/cadastrar-operacao.component";

@Component({
  selector: 'app-comentario',
  imports: [MatIconModule, MatDialogModule],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss'
})
export class ComentarioComponent {
    dialogRef = inject(MatDialogRef<CadastrarOperacaoComponent>);

    closeModal() {
        this.dialogRef.close();
    }
}
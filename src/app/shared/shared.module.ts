import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [NavbarComponent, ConfirmDialogComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [NavbarComponent, ConfirmDialogComponent],
})
export class SharedModule {}

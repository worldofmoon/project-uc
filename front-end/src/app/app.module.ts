import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule,  MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { AppComponent } from './app.component';
import { IndexComponent } from './home/index.component';

@NgModule({
  /*AQUI DECLARAMOS TODOS OS COMPONENTES QUE VAMOS USAR*/
  declarations: [
    AppComponent,
    IndexComponent
  ],
  /*AQUI FICAM APENAS OS MÓDULOS QUE USAMOS NOS COMPONENTES*/
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

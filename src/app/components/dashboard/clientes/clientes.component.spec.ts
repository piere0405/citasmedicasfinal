import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesComponent  } from './clientes.component';

describe('RegistroCitasComponent', () => {
  let component: ClientesComponent ;
  let fixture: ComponentFixture<ClientesComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesComponent ] // como es standalone, se importa aquí
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

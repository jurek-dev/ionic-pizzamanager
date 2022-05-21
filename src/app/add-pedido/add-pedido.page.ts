import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Post } from 'src/services/post';

@Component({
  selector: 'app-add-pedido',
  templateUrl: './add-pedido.page.html',
  styleUrls: ['./add-pedido.page.scss'],
})
export class AddPedidoPage implements OnInit {

  pizzas_id: string = "";
  borda_id: string = "";
  massa_id: string = "";
  status_id: string = "";
  id: string = "";

  constructor(private actRouter: ActivatedRoute, private router: Router, private provider: Post, public toastController: ToastController) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data: any) => {
      this.id = data.id;
      this.pizzas_id = data.pizzas_id;
      this.borda_id = data.borda_id;
      this.massa_id = data.massa_id;
      this.status_id = data.status_id;
    });
  }

  cadastrar(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'add',
        pizzas_id : this.pizzas_id,
        borda_id : this.borda_id,
        massa_id : this.massa_id,
        status_id : this.status_id,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        this.router.navigate(['/pedidos']);
      });
    }); 
  }

  editar(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'editar',
        pizzas_id : this.pizzas_id,
        borda_id : this.borda_id,
        massa_id : this.massa_id,
        status_id : this.status_id,
        id : this.id,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        this.router.navigate(['/pedidos']);
      });
    }); 
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Post } from 'src/services/post';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  pedidos : any = [];
  limit : number = 15;
  start : number = 0;
  pedido : string = "";

  constructor(private router: Router, private provider: Post, public toastController: ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.pedidos = [];
    this.start = 0;
    this.carregar();
  }

  Home(){
    this.router.navigate(['/folder/Inbox']);
  }

  addPedidos(){
    this.router.navigate(['/add-pedido']);
  }

  carregar(){
    return new Promise(resolve => {
      this.pedidos = [];
      let dados = {
        requisicao : 'listar',
        limit : this.limit,
        start : this.start
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        if(data['result'] == '0') {
          this.ionViewWillEnter();
        } else {
          for(let pedido of data['result']) {
            this.pedidos.push(pedido);
          }
        }
        resolve(true)
      });
    }); 
  }

  editar(id, pizzas_id, borda_id, massa_id, status_id){
    this.router.navigate(['/add-pedido/' + id + '/' + pizzas_id + '/' + borda_id + '/' + massa_id + '/' + status_id]);
  }

  excluir(id){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'excluir',
        id : id,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        this.ionViewWillEnter(); // Atualizar a página
      });
    }); 
  }

  //atualizar o list view

  doRefresh(event) {
    
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

//barra de rolagem
loadData(event) {
  
    this.start += this.limit;

    setTimeout(() => {
      this.carregar().then(()=>{ 
        event.target.complete();
       });
     
    }, 500);
}

}

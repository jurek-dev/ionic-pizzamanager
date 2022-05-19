import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Post } from 'src/services/post';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios : any = [];
  limit : number = 15;
  start : number = 0;
  nome: string = "";



  constructor(private router: Router, private provider: Post, public toastController: ToastController) { }

  // Bloco de execução ao criar a tela:
  ngOnInit() {
  }

  // Bloco de execução ao usuário visualizar a tela com método nativo do Ionic:
  ionViewWillEnter(){
    this.usuarios = [];
    this.start = 0;
    this.carregar();
  }

  Home(){
    this.router.navigate(['/folder/Inbox']);
  }

  addUsuarios(){
    this.router.navigate(['/add-usuario']);
  }

  carregar(){
    return new Promise(resolve => {
      this.usuarios = [];
      let dados = {
        requisicao : 'listar',
        nome : this.nome,
        limit : this.limit,
        start : this.start
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        for(let usuario of data['result']) {
          this.usuarios.push(usuario);
        }
        resolve(true)
      });
    }); 
  }


  editar(id, nome, usuario, senha, nivel){
    this.router.navigate(['/add-usuario/' + id + '/' + nome + '/' + usuario + '/' + senha + '/' + nivel]);
  }

  mostrar(id, nome, usuario, senha, nivel){
    this.router.navigate(['/mostrar-usuario/' + id + '/' + nome + '/' + usuario + '/' + senha + '/' + nivel]);
  }

  async mensagemExcluir() {
    const toast = await this.toastController.create({
      message: 'Usuário excluído com êxito.',
      duration: 2000
    });
    toast.present();
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

      this.mensagemExcluir();
    }); 
  }

}

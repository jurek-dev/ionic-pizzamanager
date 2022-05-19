import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Post } from 'src/services/post';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  nome: string = "";
  usuario: string = "";
  senha: string = "";
  nivel: string = "";
  id: string = "";

  constructor(private actRouter: ActivatedRoute, private router: Router, private provider: Post, public toastController: ToastController) { }

  ngOnInit() {
    // Método para inserir os dados do usuário selecionado ao carregar a tela de edição:
    this.actRouter.params.subscribe((data: any) => {
      this.id = data.id;
      this.nome = data.nome;
      this.usuario = data.usuario;
      this.senha = data.senha;
      this.nivel = data.nivel;
    });
  }

  async mensagemSalvar() {
    const toast = await this.toastController.create({
      message: 'Salvo com sucesso.',
      duration: 1000
    });
    toast.present();
  }

  Usuarios(){
    this.router.navigate(['/usuarios']);
  }

  cadastrar(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'add',
        nome : this.nome,
        usuario : this.usuario,
        senha : this.senha,
        nivel : this.nivel,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        this.router.navigate(['/usuarios']);
        this.mensagemSalvar();
      });
    }); 
  }

  editar(){
    return new Promise(resolve => {
      let dados = {
        requisicao : 'editar',
        nome : this.nome,
        usuario : this.usuario,
        senha : this.senha,
        nivel : this.nivel,
        id : this.id,
      };

      this.provider.dadosApi(dados, 'api.php').subscribe(data => {
        this.router.navigate(['/usuarios']);
        this.mensagemSalvar();
      });
    }); 
  }

}

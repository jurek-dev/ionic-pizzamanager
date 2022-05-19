import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //this.folder = this.route.snapshot.paramMap.get('id');
  }

}

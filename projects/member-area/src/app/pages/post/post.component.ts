import { AccordionModule } from 'primeng/accordion';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";
import { faHeart, faComment, faBook, faNewspaper, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
    selector : 'app-post',
    templateUrl : './post.component.html'
})

export class PostComponent{

  constructor(private fb: FormBuilder){}

  postFb = this.fb.group({
    description: ["",  Validators.required],
    files: this.fb.array([])
  })

  faHeart = faHeart
  faBook = faBook
  faNewspaper = faNewspaper
  faPeopleGroup = faPeopleGroup

  get uploads(){
    return this.postFb.get("files") as FormArray
  }

  addFiles(contentFile: string, fileExt:string){
    this.uploads.push(new FormGroup({
      fileTitle : new FormControl(Date.now().toString()),
      contentFile: new FormControl(contentFile),
      fileExt: new FormControl(fileExt),

    }))
}

  onUpload(event: any) {
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result)
      };
      reader.onerror = error => reject(error);
    });

    for (let file of event.files) {
      toBase64(file).then(result => {
        const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtension = file.name.substring(file.name.lastIndexOf(".") + 1, file.name.length)

        this.addFiles(resultBase64,resultExtension)
      })
    }
  }

}

import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnalyticsService } from '@jl-clean/analytics';
import { DataService } from '@jl-clean/order';
import { Observable } from 'rxjs';
import { UploadFileService } from '../../upload-file.service';
import { StepService } from '../step.service';

@Component({
  selector: 'pl-bilder',
  templateUrl: './bilder.component.html',
  styleUrls: ['./bilder.component.scss'],
})
export class BilderComponent implements AfterViewInit, OnInit {
  @ViewChild('pictureForm', { static: true }) contactForm: NgForm;

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';
  public picArray: any = [];
  public error = false;
  public noPicOption = false;

  fileInfos: Observable<any>;

  constructor(
    public s: StepService,
    public d: DataService,
    private a: AnalyticsService,
    private uploadService: UploadFileService
  ) {
    this.s.step = 7;
    this.a.setStep('Kontaktdaten', 6);
    this.error = false;
    this.noPicOption = false;
  }

  activateNoPicOption(event: any): void {
    console.log(event.target.value);
    this.noPicOption = !this.noPicOption;
    console.log(this.noPicOption);
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile).subscribe(
      (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
        } else if (event instanceof HttpResponse) {
          console.log(event.body);
          this.error = false;
          this.message = event.body.message;
          // this.fileInfos = this.uploadService.getFiles();
          let pictureDTO = {
            picName: event.body.fileName,
            serverFileName: event.body.serverFileName,
            timestamp: event.body.timestamp,
          };
          this.picArray.push(pictureDTO);
          this.progress = 0;
        }
      },
      (err) => {
        this.error = true;
        this.progress = 0;
        this.message = 'Bild konnte nicht gespeichert werden!';
        this.currentFile = undefined;
      }
    );
    this.selectedFiles = undefined;
  }

  deletePicture(filename: string, index: number): void {
    this.uploadService.removeFile(filename).subscribe({
      next: (event) => {
        if (event.status === 'ok') {
          this.picArray = this.picArray.filter(
            (pic) => pic.serverFileName !== filename
          );
          this.error = false;
          this.message = 'Bild wurde erfolgreich entfernt!';
        }
      },
      error: (error) => {
        this.error = true;
        this.message = 'Bild konnte nicht entfernt werden!';
      },
    });
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  validate() {
    this.s.stepValid = true;
  }

  ngAfterViewInit() {
    this.validate();
  }
}

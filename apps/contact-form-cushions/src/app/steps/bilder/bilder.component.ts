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
  public picturesFlag = false;

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
    this.d.pictures = this.picArray;
    console.log(this.d.pictures);
    this.checkForPictures();
  }

  checkForPictures() {
    if (this.picArray && this.picArray.length > 0) {
      this.picturesFlag = true;
    } else {
      this.picturesFlag = false;
    }
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
          this.error = false;
          this.message = event.body.message;
          // this.fileInfos = this.uploadService.getFiles();
          let pictureDTO = {
            picName: event.body.fileName,
            serverFileName: event.body.serverFileName,
            timestamp: event.body.timestamp,
          };
          this.picArray.push(pictureDTO);
          this.d.pictures = this.picArray;
          console.log(this.d.pictures);

          this.progress = 0;
          this.validate();
          this.checkForPictures();
        }
      },
      (err) => {
        this.error = true;
        this.progress = 0;
        this.message = 'Bild konnte nicht gespeichert werden!';
        this.currentFile = undefined;
        this.validate();
        this.checkForPictures();
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
          this.d.pictures = this.picArray;
          this.error = false;
          this.message = 'Bild wurde erfolgreich entfernt!';
          this.validate();
          this.checkForPictures();
        }
      },
      error: (error) => {
        this.error = true;
        this.message = 'Bild konnte nicht entfernt werden!';
        this.validate();
        this.checkForPictures();
      },
    });
  }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  validate() {
    if ((this.picArray && this.picArray.length > 0) || this.noPicOption) {
      this.s.stepValid = true;
    } else {
      this.s.stepValid = false;
    }

    if (this.noPicOption) {
      this.message = 'Alle Bilder entfernt!';
      this.picArray.length = 0;
      this.d.pictures.length = 0;
    }

    if (this.picArray.length >= 8) {
      this.message = 'Max. Anzahl an Bilder erreicht';
    }
  }

  ngAfterViewInit() {
    this.validate();
  }
}

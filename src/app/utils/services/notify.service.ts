import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  public toastSettings: Partial<IndividualConfig> = {
    timeOut: 5000,
    closeButton: true
  };

  constructor(private toastr: ToastrService) { }

  showSuccess(key: string, value: string) {
    this.toastr.success(value, key,this.toastSettings);
  }

  showDefaultSuccess() {
    this.toastr.success("Sucess", "",this.toastSettings);
  }

  showAlert(key: string, value: string) {
    this.toastr.warning(value, key,this.toastSettings);
  }
}

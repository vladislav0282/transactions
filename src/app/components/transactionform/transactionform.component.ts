import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transactionform',
  templateUrl: './transactionform.component.html',
  styleUrl: './transactionform.component.scss'
})
export class TransactionformComponent {
  transactionForm:FormGroup

  constructor(){
    this.transactionForm = new FormGroup({
      title: new FormControl('',Validators.required),
      amount:new FormControl('',Validators.required),
      type: new FormControl('',Validators.required),
      category: new FormControl('', Validators.required)
    })
  }

  onSubmit(){
    if(this.transactionForm.valid){
      console.log(this.transactionForm.value);
    }
  }
}

import { Injectable, signal } from '@angular/core';
import { ITransaction } from '../types/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  transactionSig = signal<ITransaction[]>([])

  constructor() { }
}

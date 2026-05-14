import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit {

  editMode = false;
  transactionId?: number;

  OnSubmit() {
  if (this.transactionForm.valid)
    {
      const transactionData = this.transactionForm.value;
      console.log('Updating transaction:', transactionData);  
      if (this.editMode && this.transactionId) { 
          this.transactionService.update(this.transactionId, transactionData).subscribe({
            next: (data) => {
              this.router.navigate(['/transactions']);
            },
            error: (err) => {
              console.error('Error updating transaction:', err);   
            }
          });
      }else{       
        this.transactionService.create(transactionData).subscribe({
            next: (data) => {
              this.router.navigate(['/transactions']);
            },
            error: (err) => {
              console.error('Error adding transaction:', err);   
            }
          });
      }        
    }
  }  


  updateAvailableCategories(type: string)
  {
    this.availableCategories = type === 'Income' ? this.incomeCategories : this.expenseCategories;
    this.transactionForm.patchValue({ category: '' });
  }

  updateCategories() 
  {
    const type = this.transactionForm.get('type')?.value;
    console.log('Transaction type changed to:', type);
    this.updateAvailableCategories(type);
  }

  cancel() {
    this.router.navigate(['/transactions']);
  }
  transactionForm: FormGroup;
  incomeCategories = ['Salary', 'Freelance', 'Investment'];
  expenseCategories = ['Food', 'Rent', 'Utilities', 'Entertainment'];
  availableCategories: string[] = [];

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService ) {
    this.transactionForm = fb.group({
      type: ['Expense', Validators.required],
      category: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      createdAt: [new Date().toISOString().substring(0, 10), Validators.required]
    });    
  }

  ngOnInit(): void {   
     this.updateCategories();
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.editMode = true;
      this.transactionId = +idParam;
      this.loadTransaction(this.transactionId);
    }
  }

  loadTransaction(id: number) {
    this.transactionService.getById(id).subscribe({
      next:(transaction) => {
      this.updateAvailableCategories(transaction.type);
      this.transactionForm.patchValue({
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount,
        createdAt: new Date(transaction.createdAt).toISOString().substring(0, 10)
      });      
    },
    error: (err) => {
      console.error('Error loading transaction:', err);   
    }

    });
  }

}

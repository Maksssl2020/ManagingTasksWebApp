import { Component, OnInit, output, Signal } from '@angular/core';
import { ActionModalComponent } from '../action-modal/action-modal.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ActionModalComponent, NgClass],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {
  chosenCategory!: string;
  isActionModalOpen = false;
  currentCategory = output<string>();

  ngOnInit(): void {
    this.chosenCategory = 'all';
    this.currentCategory.emit(this.chosenCategory);
  }

  openModal() {
    this.isActionModalOpen = true;
  }

  closeModal() {
    this.isActionModalOpen = false;
  }

  setChosenCategory(category: string) {
    this.chosenCategory = category;
    this.currentCategory.emit(this.chosenCategory);
  }

  isCategoryChosen(category: string): boolean {
    return category === this.chosenCategory;
  }

  handleTaskAdded() {
    this.isActionModalOpen = false;
  }
}

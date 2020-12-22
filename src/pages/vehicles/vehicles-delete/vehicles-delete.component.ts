import { Component, ElementRef, Inject, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vehicles-delete',
  templateUrl: './vehicles-delete.component.html',
  styleUrls: ['./vehicles-delete.component.scss'],
  template: `
        <div class="mmodal">
            <div class="mmodal-body">
                <ng-content></ng-content>
            </div>
        </div>
        <div class="mmodal-background"></div>
    `,
})
export class VehiclesDeleteComponent implements OnInit {


  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.el.nativeElement.addEventListener('click', () => {
      this.close(false)
    })
  }

  close(boolean) {
    this.el.nativeElement.classList.remove('sshow')
    this.el.nativeElement.classList.add('hhidden')
  }

}

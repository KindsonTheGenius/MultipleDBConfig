import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Cushion } from '../../../../models/src/lib/models/Cushion';
import {
  Partner,
  TransportCostsType,
} from '../../../../models/src/lib/models/Partner';
import * as Freud1P from '../../../../partner/src/lib/partnerData/Freud1P';

@Component({
  selector: 'jl-clean-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class CalculatorComponent implements OnInit {
  title = 'pricing-calculator-cushions';

  @Input() partnername = 'Freud1P';
  @Input() source;
  @Output() newItemEvent = new EventEmitter<any>();

  private partners = {
    //Example Partner
    Freud1P,
    // DELETE THIS ONE!!!!!
  };

  public selectedCushionId: string;
  public minPrice: number;
  private partner: Partner;
  public cushions: Cushion[];
  public totalPrice: number;
  public transportCost: number;
  private sumPriceCushions = 0;
  public specialOrderOption: boolean = false;

  constructor() {}

  ngOnInit() {
    let partnerData;
    let storageData = JSON.parse(localStorage.getItem('order'));

    if (storageData && this.source === 'contactForm') {
      partnerData = this.partners[storageData.partnername];
      this.partner = partnerData.partner;
      this.cushions = partnerData.cushions;
      this.updateCushionsInfo(storageData.cushions);
      this.minPrice = this.partner.basePrice;
      this.selectedCushionId = this.cushions[0].id;
      this.specialOrderOption = false;
      this.saveOrderParentComponent(storageData);
    } else {
      partnerData = this.partners[this.partnername];
      this.partner = partnerData.partner;
      this.cushions = partnerData.cushions;
      this.minPrice = this.partner.basePrice;
      this.selectedCushionId = this.cushions[0].id;
      this.specialOrderOption = false;
    }

    this.setTransportCost();
    this.setTotal();
  }

  updateCushionsInfo(cushionsDTO) {
    this.cushions.map((cushion) => {
      for (let i = 0; i < cushionsDTO.length; i++) {
        if (cushion.name === cushionsDTO[i].name) {
          cushion.amount = cushionsDTO[i].amount;
          cushion.subTotal = cushion.amount * cushion.price;
        }
      }
    });
    this.setSumPriceCushions();
    this.setTransportCost();
    this.setTotal();
  }

  minusAmount(cushionId: string) {
    if (!this.specialOrderOption) {
      this.changeAmount('minus', cushionId);
    }
  }

  plusAmount(cushionId: string) {
    if (!this.specialOrderOption) {
      this.changeAmount('plus', cushionId);
    }
  }

  changeAmount(direction: string, cushionId: string) {
    const index = this.cushions.findIndex(
      (cushion) => cushion.id === cushionId
    );

    if (direction === 'minus') {
      if (this.cushions[index].amount > 0) {
        this.cushions[index].amount--;
      } else {
        this.cushions[index].amount = 0;
      }
    } else {
      if (this.cushions[index].amount >= 20) {
        this.cushions[index].amount = 20;
      } else {
        this.cushions[index].amount++;
      }
    }

    this.cushions[index].subTotal = Math.round(
      (this.cushions[index].amount * this.cushions[index].price * 10) / 10
    );

    this.setSumPriceCushions();
    this.setTransportCost();
    this.setTotal();
  }

  requestSpecialOrder() {
    this.specialOrderOption = !this.specialOrderOption;
    this.cushions.map((cushion) => {
      cushion.amount = 0;
      cushion.subTotal = 0;
    });
    this.transportCost = this.minPrice;
    this.totalPrice = this.transportCost;
    this.sumPriceCushions = 0;
    this.setTotal();
  }

  setSumPriceCushions() {
    let sumPrice = 0;
    // tslint:disable-next-line:prefer-for-of
    this.cushions.map((cushion) => (sumPrice += cushion.subTotal));
    this.sumPriceCushions = sumPrice;
  }

  setTransportCost() {
    if (
      this.partner.transportCostsType === TransportCostsType.MINIMUM_ORDER_VALUE
    ) {
      if (this.sumPriceCushions < this.minPrice) {
        this.transportCost = this.minPrice - this.sumPriceCushions;
      } else {
        this.transportCost = 0;
      }
    }

    if (this.partner.transportCostsType === TransportCostsType.AMAZON_MODEL) {
      if (this.sumPriceCushions < this.minPrice) {
        this.transportCost = this.minPrice;
      } else {
        this.transportCost = 0;
      }
    }

    if (this.partner.transportCostsType === TransportCostsType.FIXED) {
      this.transportCost = this.minPrice;
    }
  }

  setTotal() {
    this.totalPrice = this.sumPriceCushions + this.transportCost;
    this.saveOrder();
  }

  saveOrder() {
    const cushionsDTO: any = {};
    cushionsDTO.partnername = this.partnername;
    cushionsDTO.total = this.totalPrice;
    cushionsDTO.transportCost = this.transportCost;
    cushionsDTO.specialOrderOption = this.specialOrderOption;

    cushionsDTO.cushions = this.cushions.map((cushion) => {
      return {
        name: cushion.name,
        amount: cushion.amount,
        price: cushion.price,
      };
    });

    localStorage.setItem('order', JSON.stringify(cushionsDTO));
    if (this.source === 'contactForm') {
      this.saveOrderParentComponent(cushionsDTO);
    }
  }

  saveOrderParentComponent(value: any) {
    this.newItemEvent.emit(value);
  }
}

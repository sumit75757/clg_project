import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OffersRoutingModule } from './offers-routing.module';
import { OffersComponent } from './offers.component';
import { CardModule } from "../../../../theme/shared/components/card/card.module";
import { ModalModule } from "../../../../theme/shared/components/modal/modal.module";
import { SharedModule } from "src/app/theme/shared/shared.module";

@NgModule({
    declarations: [OffersComponent],
    imports: [
        CommonModule,
        OffersRoutingModule,
        CardModule,
        ModalModule,
        SharedModule,
    ]
})
export class OffersModule { }

import { NgFor, NgForOf, NgStyle } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
	selector: "app-success",
	standalone: true,
	imports: [
		MatSlideToggleModule,
		NgFor,
		NgForOf,
		NgStyle,
		MatSidenavModule,
		MatButtonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		CommonModule,
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		MatSidenavModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatDialogModule,
	],
	templateUrl: "./success.component.html",
	styleUrl: "./success.component.css",
})
export class SuccessComponent {
	constructor(
		public dialogRef: MatDialogRef<SuccessComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
}

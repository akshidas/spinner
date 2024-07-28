import { NgFor, NgForOf, NgStyle } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

var items = [
	{ deg: 0, text: "1000000" },
	{ deg: 22.5, text: "2000000" },
	{ deg: 45, text: "3000000" },
	{ deg: 67.5, text: "4000000" },
	{ deg: 90, text: "5000000" },
	{ deg: 112.5, text: "6000000" },
	{ deg: 135, text: "7000000" },
	{ deg: 157.5, text: "8000000" },
	{ deg: 180, text: "9000000" },
	{ deg: 202.5, text: "10000000" },
	{ deg: 225, text: "11000000" },
	{ deg: 247.5, text: "12000000" },
	{ deg: 270, text: "12000000" },
	{ deg: 292.5, text: "12000000" },
	{ deg: 315, text: "12000000" },
	{ deg: 337.5, text: "12000000" },
];
const normaliseAngle = (angle: number): number => angle % 360;
const closestMultipleOf22_5 = (angle: number) => {
	const normalizedAngle = normaliseAngle(angle);
	if (angle === 0) {
		return 0;
	}
	const closestMultiple = Math.round(normalizedAngle / 22.5);
	if (closestMultiple === 1) {
		return 0;
	}
	if (closestMultiple > 349) {
		return 0;
	}
	return closestMultiple * 22.5;
};

@Component({
	selector: "app-spinner",
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
	templateUrl: "./spinner.component.html",
	styleUrl: "./spinner.component.css",
})
export class SpinnerComponent {
	constructor(
		public dialogRef: MatDialogRef<SpinnerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}

	onNoClick(): void {
		this.dialogRef.close();
	}
	items = items;
	title = "spinner";
	console = console;
	showFiller = false;
	spin = () => {
		const canvasContainer =
			document.querySelector<HTMLCanvasElement>(".canvas__container");
		if (canvasContainer) {
			var oldDeg = Number(canvasContainer.dataset.rotate ?? 0);
			var deg = Math.floor(Math.random() * 360) + 1080 + oldDeg;
			const normalizedAngle = normaliseAngle(deg);
			const closestAngle = closestMultipleOf22_5(deg);
			const prize = items.find(({ deg }) => {
				// console.log(deg === closestAngle, deg, closestAngle);
				return deg === closestAngle;
			});
			console.log(deg, normalizedAngle, closestAngle, prize);
			canvasContainer.style.transform = `rotate(${deg}deg)`;
			canvasContainer.dataset.rotate = deg.toString();
			return deg;
		}
		return 0;
	};
}

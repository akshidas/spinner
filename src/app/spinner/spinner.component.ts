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
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SuccessComponent } from "../success/success.component";
import { interval, Observable } from "rxjs";
import {
	calcDateDiff,
	getNextSpinTime,
	timeComponents,
} from "./calculate-time";
import { map, shareReplay } from "rxjs/operators";
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
	styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent {
	constructor(
		public dialog: MatDialog,
		public dialogRef: MatDialogRef<SpinnerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		this.timeLeft$ = null;
	}

	openSuccess(): void {
		const successRef = this.dialog.open(SuccessComponent, {
			width: "400px",
		});

		successRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			console.log(result); // The result returned after the dialog is closed
		});
	}
	onNoClick(): void {
		this.dialogRef.close();
	}

	items = items;
	title = "spinner";
	console = console;
	spinTime: number | null = null;
	showFiller = false;
	spin = () => {
		// const canvasContainer =
		// 	document.querySelector<HTMLCanvasElement>(".canvas__container");
		const innerSpin = document.querySelector<HTMLCanvasElement>(".btn-text");
		const spinner = document.querySelector<HTMLCanvasElement>(
			".spin-item__container",
		);
		if (innerSpin) {
			var oldDeg = Number(innerSpin.dataset.rotate ?? 0);
			var deg = Math.floor(Math.random() * 360) + 1080 + oldDeg;
			const normalizedAngle = normaliseAngle(deg);
			const closestAngle = closestMultipleOf22_5(deg);
			const prize = items.find(({ deg }) => {
				// console.log(deg === closestAngle, deg, closestAngle);
				return deg === closestAngle;
			});
			// console.log(deg, normalizedAngle, closestAngle, prize);
			innerSpin.style.transform = `rotateY(${deg}deg)`;
			innerSpin.dataset.rotate = deg.toString();

			if (spinner) {
				var oldDeg = Number(spinner.dataset.rotate ?? 0);
				var deg = Math.floor(Math.random() * 360) + 1080 + oldDeg;
				spinner.style.transform = `rotate(${deg}deg)`;
				spinner.dataset.rotate = deg.toString();
			}
			innerSpin.addEventListener("transitionend", (event) => {
				this.onNoClick();
				this.openSuccess();
				getNextSpinTime();
				localStorage.setItem("nextSpin", getNextSpinTime().toString());
			});
			return deg;
		}
		return 0;
	};

	public timeLeft$: Observable<timeComponents> | null;
	ngOnInit() {
		const time = localStorage.getItem("nextSpin");
		if (time) {
			this.spinTime = parseInt(time);
			this.timeLeft$ = interval(1000).pipe(
				map((x) => calcDateDiff(new Date(parseInt(time)))),
				shareReplay(1),
			);
		}
	}
}

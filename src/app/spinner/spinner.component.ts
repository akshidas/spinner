import { NgFor, NgForOf, NgStyle } from "@angular/common";
import { Component } from "@angular/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

var items = [
	{ deg: "0", text: "1000000" },
	{ deg: "22.5", text: "2000000" },
	{ deg: "45", text: "3000000" },
	{ deg: "67.5", text: "4000000" },
	{ deg: "90", text: "5000000" },
	{ deg: "112.5", text: "6000000" },
	{ deg: "135", text: "7000000" },
	{ deg: "157.5", text: "8000000" },
	{ deg: "180", text: "9000000" },
	{ deg: "202.5", text: "10000000" },
	{ deg: "225", text: "11000000" },
	{ deg: "247.5", text: "12000000" },
	{ deg: "270", text: "12000000" },
	{ deg: "292.5", text: "12000000" },
	{ deg: "315", text: "12000000" },
	{ deg: "337.5", text: "12000000" },
];
@Component({
	selector: "app-spinner",
	standalone: true,
	imports: [MatSlideToggleModule, NgFor, NgForOf, NgStyle],
	templateUrl: "./spinner.component.html",
	styleUrl: "./spinner.component.css",
})
export class SpinnerComponent {
	items = items;
	title = "spinner";
	console = console;
	ngAfterViewInit() {
		function spin() {
			const canvasContainer =
				document.querySelector<HTMLCanvasElement>(".canvas__container");
			if (canvasContainer) {
				var oldDeg = Number(canvasContainer.dataset.rotate ?? 0);
				var deg = Math.floor(Math.random() * 360) + 1080 + oldDeg;
				canvasContainer.style.transform = `rotate(${deg}deg)`;
				canvasContainer.dataset.rotate = deg.toString();
				return deg;
			}
			return 0;
		}

		function calcResult(deg: number) {
			const index =
				items.length -
				(Math.round(
					(deg % 360) /
						Math.round(((Math.PI * 2) / items.length) * (180 / Math.PI)),
				) %
					items.length);
		}
		const spinButton = document.querySelector(".spin__btn");
		spinButton?.addEventListener("click", () => {
			calcResult(spin());
		});
	}
	// ngOnInit() {
	// 	const test = document.querySelector<HTMLCanvasElement>(".spinner canvas");
	// 	const canvasContainer = document.querySelector(".canvas__container");

	// 	if (!test) {
	// 		return null;
	// 	}

	// 	const ctx = test?.getContext("2d");

	// 	function drawSpinner() {
	// 		const height = test?.height || 0;
	// 		const width = test?.width || 0;
	// 		const radius = (Math.min(height, width) / 2) * 0.87;
	// 		const x = width / 2;
	// 		const y = height / 2;
	// 		const cirCleRadius = Math.PI * 2;
	// 		const oneBowRadius = cirCleRadius / items.length;
	// 		for (let index = 0; index < items.length; index++) {
	// 			const element = items[index];
	// 			drawCirCleBow(
	// 				x,
	// 				y,
	// 				radius,
	// 				oneBowRadius * index - oneBowRadius / 2,
	// 				oneBowRadius * (index + 1) - oneBowRadius / 2,
	// 				element.color,
	// 				element.text,
	// 			);
	// 		}
	// 		ctx?.stroke();
	// 	}

	// 	function drawCirCleBow(
	// 		x: any,
	// 		y: any,
	// 		radius: any,
	// 		s: any,
	// 		e: any,
	// 		color: any,
	// 		text: any,
	// 	) {
	// 		ctx?.beginPath();
	// 		if (ctx) {
	// 			ctx.fillStyle = color;
	// 			ctx.strokeStyle = "transparent";
	// 		}
	// 		ctx?.moveTo(x, y);
	// 		const sXPosition = (Math.cos(s) * radius + x).toFixed(5);
	// 		const sYPosition = (Math.sin(s) * radius + y).toFixed(5);
	// 		ctx?.lineTo(sXPosition, sYPosition);
	// 		ctx?.arc(x, y, radius, s, e);
	// 		ctx?.lineTo(x, y);
	// 		ctx?.fill();
	// 		ctx?.closePath();
	// 		const span = document.createElement("span");
	// 		span.innerHTML = text;

	// 		span.style.transform += `translateY(-50%) rotate(${
	// 			(s + (e - s) / 2) * (180 / Math.PI)
	// 		}deg)`;
	// 		span.style.width = radius + "px";
	// 		span.style.position = "absolute";
	// 		span.style.color = "white";
	// 		span.style.textAlign = "center";
	// 		span.style.padding = "0";
	// 		span.style.top = "50%";
	// 		span.style.left = "50%";
	// 		span.style.textAlign = "center";
	// 		span.style.color = "#fff";
	// 		span.style.fontSize = "24px";
	// 		span.style.transformOrigin = "0 50%";
	// 		span.style.paddingLeft = "3%";
	// 		span.style.width = "50%";
	// 		canvasContainer?.append(span);
	// 	}
	// 	window.onload = () => {
	// 		// drawSpinner();
	// 	};
	// 	return;
	// }
}

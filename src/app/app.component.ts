import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { SpinnerComponent } from "./spinner/spinner.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		FormsModule,
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
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	constructor(public dialog: MatDialog) {}

	title = "spinner-project";
	showFiller = false;

	openDialog(): void {
		const dialogRef = this.dialog.open(SpinnerComponent, {
			width: "500px",
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log("The dialog was closed");
			console.log(result); // The result returned after the dialog is closed
		});
	}
}

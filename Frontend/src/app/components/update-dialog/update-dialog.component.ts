import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
    selector:     'app-update-dialog',
    templateUrl: './update-dialog.component.html',
    styleUrls: [ './update-dialog.component.scss' ]
})
export class UpdateDialogComponent
{
    constructor(public dialogRef : MatDialogRef<UpdateDialogComponent>)
    {}

    onNoClick() : void
    {
        this.dialogRef.close();
    }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { UpdateDialogComponent } from '../components/update-dialog/update-dialog.component';


@Injectable({
    providedIn: 'root'
})
export class UpdateService
{
    constructor(private updates : SwUpdate, private dialog : MatDialog)
    {
        this.updates.versionUpdates.subscribe(evt => {
            switch (evt.type)
            {
                case "VERSION_READY":
                    this.doUpdate();
                    break;
            }
        });

        console.log("subscribed to updates");
    }

    private doUpdate() : void
    {
        const dialogRef = this.dialog.open(UpdateDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result === "do-update")
            {
                this.updates.activateUpdate().then(() => document.location.reload());
            }
        });
    }
}

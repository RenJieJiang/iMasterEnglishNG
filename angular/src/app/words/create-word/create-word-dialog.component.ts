import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  WordServiceProxy,
  WordDto,
  //PermissionDto,
  CreateWordDto,
  //PermissionDtoListResultDto
} from '@shared/service-proxies/word';
import { forEach as _forEach, map as _map } from 'lodash-es';

@Component({
  templateUrl: 'create-word-dialog.component.html'
})
export class CreateWordDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  word = new WordDto();
  //permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _wordService: WordServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    // this._wordService
    //   .getAllPermissions()
    //   .subscribe((result: PermissionDtoListResultDto) => {
    //     //this.permissions = result.items;
    //     this.setInitialPermissionsStatus();
    //   });
  }

  // setInitialPermissionsStatus(): void {
  //   _map(this.permissions, (item) => {
  //     this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
  //       item.name
  //     );
  //   });
  // }

  isPermissionChecked(permissionName: string): boolean {
    // just return default permission checked status
    // it's better to use a setting
    return this.defaultPermissionCheckedStatus;
  }

  // onPermissionChange(permission: PermissionDto, $event) {
  //   this.checkedPermissionsMap[permission.name] = $event.target.checked;
  // }

  // getCheckedPermissions(): string[] {
  //   const permissions: string[] = [];
  //   _forEach(this.checkedPermissionsMap, function (value, key) {
  //     if (value) {
  //       permissions.push(key);
  //     }
  //   });
  //   return permissions;
  // }

  save(): void {
    this.saving = true;

    const word = new CreateWordDto();
    word.init(this.word);
    //word.grantedPermissions = this.getCheckedPermissions();

    this._wordService
      .create(word)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}

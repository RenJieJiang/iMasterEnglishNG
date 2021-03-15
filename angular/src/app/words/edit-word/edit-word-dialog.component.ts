import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  WordServiceProxy,
  GetWordForEditOutput,
  WordDto,
  //PermissionDto,
  WordEditDto,
  //FlatPermissionDto
} from '@shared/service-proxies/word';

@Component({
  templateUrl: 'edit-word-dialog.component.html'
})
export class EditWordDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  word = new WordDto();
  //permissions: FlatPermissionDto[];
  grantedPermissionNames: string[];
  checkedPermissionsMap: { [key: string]: boolean } = {};

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _wordService: WordServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._wordService
      .get(this.id)
      .subscribe((result: WordDto) => {
        this.word = result;
        // this.permissions = result.permissions;
        // this.grantedPermissionNames = result.grantedPermissionNames;
        // this.setInitialPermissionsStatus();
      });
  }

  // setInitialPermissionsStatus(): void {
  //   _map(this.permissions, (item) => {
  //     this.checkedPermissionsMap[item.name] = this.isPermissionChecked(
  //       item.name
  //     );
  //   });
  // }

  // isPermissionChecked(permissionName: string): boolean {
  //   return _includes(this.grantedPermissionNames, permissionName);
  // }

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

    const word = new WordDto();
    word.init(this.word);
    //word.grantedPermissions = this.getCheckedPermissions();

    this._wordService
      .update(word)
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

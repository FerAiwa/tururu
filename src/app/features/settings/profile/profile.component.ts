import { Component, OnInit, OnDestroy, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserStore } from 'src/app/core/stores/user.store';
import { User } from 'src/app/core/core.models';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'tu-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('file') file;
  avatarUrl;
  fallbackAvatarUrl = 'https://media.licdn.com/dms/image/C5603AQG5zStVST5xkA/profile-displayphoto-shrink_200_200/0?e=1565827200&v=beta&t=eYwQoF0jwwduCEkPJrI-3nzEnsV16D0EzrTdvEYcnYI'
  userStoreSubscription: Subscription;
  user: User;
  userForm = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    },
  );

  constructor(private userStore: UserStore, private fb: FormBuilder) { }

  addFile() {
    console.log(this.file.nativeElement);
    this.file.nativeElement.click();
  }

  isFileExtensionValid(file: File) {
    return file.type.startsWith("image/")
  }

  onFileAdded() {
    const image = this.file.nativeElement.files[0];

    if (!this.isFileExtensionValid(image)) {
      return console.log('extension not valid');
    }
    return this.userStore.updateAvatar(image);
  }

  ngOnInit() {
    this.userStoreSubscription = this.userStore.state$
      .subscribe(user => {
        this.userForm.setValue({
          name: user.name,
          email: user.email
        })
        this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.userStoreSubscription.unsubscribe();
  }

}

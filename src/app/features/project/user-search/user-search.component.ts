import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchDebouncerDirective } from 'src/app/shared/directives/search-debouncer.directive';
import { UserSearchService, UserSearchResults } from 'src/app/core/services/user/user-search.service';
import { InvitationService } from 'src/app/core/services/user/invitation.service';

@Component({
  selector: 'tu-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  providers: [UserSearchService],
})
export class UserSearchComponent implements OnInit {
  @Input() projectId: string;
  @ViewChild(SearchDebouncerDirective) searchDebouncer: SearchDebouncerDirective;

  constructor(
    public userSearchService: UserSearchService,
    private invitationService: InvitationService,
  ) { }

  ngOnInit() {
    this.searchDebouncer.getInputValue()
      .subscribe(text => this.userSearchService.search(text))
  }

  inviteUser({ uuid }: UserSearchResults) {
    this.invitationService.sendProjectInvitation(this.projectId, uuid);
  }
} 

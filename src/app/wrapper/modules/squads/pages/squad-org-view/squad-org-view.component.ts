import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { debounceTime, filter, finalize } from 'rxjs/operators';
import { AutocompleteData } from 'src/app/shared/components/autocomplete/autocomplete/autocomplete.component';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { SquadMemberDialogComponent } from '../../components/squad-member-dialog/squad-member-dialog.component';
import { SquadMembersService } from '../../service/squad-members.service';
import { SquadsService } from '../../service/squads.service';

@Component({
  selector: 'app-squad-org-view',
  templateUrl: './squad-org-view.component.html',
  styleUrls: ['./squad-org-view.component.scss']
})
export class SquadOrgViewComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;

  squadsOptions: AutocompleteData[] = [];
  searchControl: FormControl = new FormControl();

  squadSubscription$?: Subscription;
  searchSubscription$?: Subscription;
  getMemberSubscription$?: Subscription;

  organization!: TreeNode[];

  constructor(
    private squadsService: SquadsService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.findAllSquads();
    this.listenSearch();
  }

  ngOnDestroy() {
    this.squadSubscription$?.unsubscribe();
    this.searchSubscription$?.unsubscribe();
  }

  onNodeSelect({ node }: { node: TreeNode }) {
    const id = node.data.id;
    const squad = this.searchControl.value?.value || '';
    this.dialog.open(SquadMemberDialogComponent, { data: { id, squad } });
  }

  private findAllSquads() {
    this.isLoading = true;
    this.squadsService.findAll<SquadProjection>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (squads) => this.squadsOptions = (squads as SquadProjection[]).map(s => ({ label: s.name, value: s.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private listenSearch() {
    this.searchSubscription$ = this.searchControl.valueChanges
      .pipe(
        filter(v => v != null && v !== undefined && v.value !== null),
        debounceTime(100))
      .subscribe(selected => this.findSquadById(selected.value))
  }

  private findSquadById(id: number) {
    this.isLoading = true;

    this.squadSubscription$?.unsubscribe();
    this.squadSubscription$ = this.squadsService.findById<SquadResponse>(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (squad) => this.buildTreeOrganization(squad),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private buildTreeOrganization(squad: SquadResponse) {
    const triad = ['TEAM_LEAD', 'TECH_LEAD', 'PRODUCT_OWNER'];

    this.organization = [
      {
        label: squad.name,
        expanded: true,
        children: squad.members
          .filter(m => triad.includes(m.role))
          .map(m => ({
            label: m.name,
            expanded: true,
            type: 'triad',
            styleClass: 'triad-container',
            data: m,
            children: m.role !== 'TEAM_LEAD' ? [] :
              squad.members
                .filter(member => !triad.includes(member.role))
                .map(member => ({
                  label: member.name,
                  data: member,
                  type: 'nonTriad',
                  styleClass: 'non-triad-container',
                }))

          }))
      }
    ]
  }

}

interface SquadProjection {
  id: number;
  name: string;
  projectCode: string;
}

interface SquadResponse {
  id?: number;
  name: string;
  projectCode?: string;
  notes?: string;
  lastModifiedDate: string;
  createdDate: string;
  members: {
    name: string;
    role: string;
    isExternal: boolean
  }[]
}
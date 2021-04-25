import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { finalize, filter, debounceTime } from 'rxjs/operators';
import { AutocompleteData } from 'src/app/shared/components/autocomplete/autocomplete/autocomplete.component';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { ReleaseTrainsService } from '../../service/release-trains.service';

@Component({
  selector: 'app-release-train-org',
  templateUrl: './release-train-org.component.html',
  styleUrls: ['./release-train-org.component.scss']
})
export class ReleaseTrainOrgComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;

  releaseTrainOptions: AutocompleteData[] = [];
  searchControl: FormControl = new FormControl();

  releaseTrainSubscription$?: Subscription;
  searchSubscription$?: Subscription;
  getMemberSubscription$?: Subscription;

  organization!: TreeNode[];

  constructor(
    private service: ReleaseTrainsService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.findAllReleaseTrains();
    this.listenSearch();
  }

  ngOnDestroy() {
    this.releaseTrainSubscription$?.unsubscribe();
    this.searchSubscription$?.unsubscribe();
  }

  onNodeSelect({ node }: { node: TreeNode }) {
    const id = node.data.id;
    const releaseTrain = this.searchControl.value?.value || '';
    // this.dialog.open(SquadMemberDialogComponent, { data: { id, squad: releaseTrain } });
  }

  private findAllReleaseTrains() {
    this.isLoading = true;
    this.service.findAll<ReleaseTrainProjection>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (squads) => this.releaseTrainOptions = (squads as ReleaseTrainProjection[]).map(s => ({ label: s.name, value: s.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private listenSearch() {
    this.searchSubscription$ = this.searchControl.valueChanges
      .pipe(
        filter(v => v != null && v !== undefined && v.value !== null && v.value !== undefined),
        debounceTime(100))
      .subscribe(selected => this.findReleaseTrainById(selected.value))
  }

  private findReleaseTrainById(id: number) {
    this.isLoading = true;

    this.releaseTrainSubscription$?.unsubscribe();
    this.releaseTrainSubscription$ = this.service.findById<ReleaseTrainResponse>(id, { withHierarchy: '' })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (squad) => this.buildTreeOrganization(squad),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private buildTreeOrganization(rt: ReleaseTrainResponse) {
    const triad = ['TEAM_LEAD', 'TECH_LEAD', 'PRODUCT_OWNER'];

    this.organization = [
      {
        label: rt.name,
        expanded: true,
        data: rt,
        type: 'rt',
        children: rt.responsible.map<TreeNode>(resp => ({
          label: resp.name,
          expanded: true,
          type: 'rtResponsible',
          data: resp,
          children: resp.squads.map<TreeNode>(squad => ({
            label: squad.name,
            expanded: true,
            type: 'rtSquad',
            data: squad,
            children: squad.triad.map<TreeNode>(triadMember => ({
              label: triadMember.name,
              expanded: true,
              type: 'rtTriad',
              styleClass: 'triad-container',
              data: triadMember,
              children: triadMember.id !== squad.leader.id ? [] :
                squad.members.map<TreeNode>(member => ({
                  label: member.name,
                  expanded: true,
                  styleClass: 'non-triad-container',
                  type: 'rtSquadMember',
                  data: member,
                }))
            }))
          }))
          
        }))
      }
    ]
  }

}

interface ReleaseTrainProjection {
  id: number;
  name: string;
}

interface ReleaseTrainResponse {
  id: number;
  name: string;
  leader: ReleaseTrainResponsible;
  responsible: ReleaseTrainResponsible[];
}


interface ReleaseTrainResponsible {
  id: number;
  name: string;
  role: string;
  squads: ReleaseTrainSquad[]
}

interface ReleaseTrainSquad {
  id: number;
  name: string;
  leader: SquadMemberResponse;
  triad: SquadMemberResponse[];
  members: SquadMemberResponse[]
}

interface SquadMemberResponse {
  id: number;
  name: string;
  role: string;
  isExternal: boolean
}
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { finalize, filter, debounceTime } from 'rxjs/operators';
import { AutocompleteData } from 'src/app/shared/components/autocomplete/autocomplete/autocomplete.component';
import { ErrorHandlerService } from 'src/app/shared/services/error/error-handler.service';
import { CommunitiesService } from '../../service/communities.service';

@Component({
  selector: 'app-communities-org',
  templateUrl: './communities-org.component.html',
  styleUrls: ['./communities-org.component.scss']
})
export class CommunitiesOrgComponent implements OnInit {

  isLoading: boolean = false;

  communityOptions: AutocompleteData[] = [];
  searchControl: FormControl = new FormControl();

  communitySubscription$?: Subscription;
  searchSubscription$?: Subscription;

  organization!: TreeNode[];

  constructor(
    private service: CommunitiesService,
    private dialog: MatDialog,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.findAllCommunities();
    this.listenSearch();
  }

  ngOnDestroy() {
    this.communitySubscription$?.unsubscribe();
    this.searchSubscription$?.unsubscribe();
  }

  onNodeSelect({ node }: { node: TreeNode }) {
    const id = node.data.id;
    const community = this.searchControl.value?.value || '';
    // this.dialog.open(SquadMemberDialogComponent, { data: { id, squad: releaseTrain } });
  }

  private findAllCommunities() {
    this.isLoading = true;
    this.service.findAll<CommunityProjection>()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (squads) => this.communityOptions = (squads as CommunityProjection[]).map(s => ({ label: s.name, value: s.id })),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private listenSearch() {
    this.searchSubscription$ = this.searchControl.valueChanges
      .pipe(
        filter(v => v != null && v !== undefined && v.value !== null && v.value !== undefined),
        debounceTime(100))
      .subscribe(selected => this.findCommunityById(selected.value))
  }

  private findCommunityById(id: number) {
    this.isLoading = true;

    this.communitySubscription$?.unsubscribe();
    this.communitySubscription$ = this.service.findById<CommunityResponse>(id, { withHierarchy: '' })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(
        (community) => this.buildTreeOrganization(community),
        err => this.errorHandler.httpErrorResponseHandler(err))
  }

  private buildTreeOrganization(community: CommunityResponse) {
    this.organization = [
      {
        label: community.name,
        expanded: true,
        data: community,
        type: 'community',
        children: [{
          label: community.leader.name,
          data: community.leader,
          type: 'communityLeader',
          expanded: true,
          children: community.releaseTrains.map<TreeNode>(rt => ({
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
          }))
        }]
      }
    ]
  }

}

interface CommunityProjection {
  id: number;
  name: string;
}

interface CommunityResponse {
  id: number;
  name: string;
  leader: {
    id: number;
    name: string;
  }
  releaseTrains: ReleaseTrainResponse[]
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
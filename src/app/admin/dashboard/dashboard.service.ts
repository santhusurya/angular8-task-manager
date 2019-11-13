import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {
  getTeamMembersSummary(): any[] {
    const TeamMembersSummary = [
      { Region: 'East', TeamMembersCount: 20, TemporarilyUnavailableMembers: 1 },
      { Region: 'West', TeamMembersCount: 15, TemporarilyUnavailableMembers: 2 },
      { Region: 'South', TeamMembersCount: 17, TemporarilyUnavailableMembers: 3 },
      { Region: 'North', TeamMembersCount: 15, TemporarilyUnavailableMembers: 4 }
    ];
    return TeamMembersSummary; 
  }
}

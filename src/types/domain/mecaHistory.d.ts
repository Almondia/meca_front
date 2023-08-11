import type { CursorPaginationRequest, CursorPaginationResponse, TimestampedEntity } from '@/types/domain';
import type { Meca } from '@/types/domain/meca';

export interface MecaHistory extends TimestampedEntity {
  cardHistoryId: string;
  userAnswer: string;
  score: number;
}

export interface MecaHistoryCreateRequest {
  cardId: string;
  userAnswer: string;
}

interface MecaHistoryListContent {
  cardHistory: MecaHistory;
  solvedMember: {
    solvedMemberId: string;
    solvedMemberName: string;
  };
  card: Omit<Meca, 'description'> & { description?: string };
}

export interface MecaHistoryListPaginationRequest extends CursorPaginationRequest {
  id: string;
  resourceType: 'members' | 'cards';
}

export interface MecaHistoryListPaginationResponse extends CursorPaginationResponse {
  contents: MecaHistoryListContent[];
}

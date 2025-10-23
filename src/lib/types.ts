export interface PlayEvent {
    screen_id: string;
    campaign_id: string;
    timestamp: string;
}

export interface CampaignStats{
    campaign_id: string;
    play_count: number;
}


export interface ScreenStat{
    screen_id: string;
    impressions: number;
}

export const API_BASE_URL = '/api'

export const MOCK_PLAY_EVENTS: PlayEvent[] = [
    {
      "screen_id": "screen-101",
      "campaign_id": "cmp-2025-123",
      "timestamp": "2025-10-22T10:01:15Z"
    },
    {
      "screen_id": "screen-205",
      "campaign_id": "cmp-2025-456",
      "timestamp": "2025-10-22T10:01:18Z"
    },
    {
      "screen_id": "screen-102",
      "campaign_id": "cmp-2025-123",
      "timestamp": "2025-10-22T10:01:23Z"
    },
    {
      "screen_id": "screen-310",
      "campaign_id": "cmp-2025-789",
      "timestamp": "2025-10-22T10:02:05Z"
    },
    {
      "screen_id": "screen-101",
      "campaign_id": "cmp-2025-456",
      "timestamp": "2025-10-22T10:02:11Z"
    },
    {
      "screen_id": "screen-205",
      "campaign_id": "cmp-2025-123",
      "timestamp": "2025-10-22T10:02:30Z"
    },
    {
      "screen_id": "screen-102",
      "campaign_id": "cmp-2025-123",
      "timestamp": "2025-10-22T10:02:45Z"
    },
    {
      "screen_id": "screen-401",
      "campaign_id": "cmp-2025-999",
      "timestamp": "2025-10-22T10:03:01Z"
    },
    {
      "screen_id": "screen-310",
      "campaign_id": "cmp-2025-789",
      "timestamp": "2025-10-22T10:03:04Z"
    },
    {
      "screen_id": "screen-101",
      "campaign_id": "cmp-2025-123",
      "timestamp": "2025-10-22T10:03:19Z"
    },
    {
      "screen_id": "screen-205",
      "campaign_id": "cmp-2025-456",
      "timestamp": "2025-10-22T10:03:25Z"
    },
    {
      "screen_id": "screen-401",
      "campaign_id": "cmp-2025-999",
      "timestamp": "2025-10-22T10:03:55Z"
    },
    {
      "screen_id": "screen-102",
      "campaign_id": "cmp-2025-789",
      "timestamp": "2025-10-22T10:04:02Z"
    },
    {
      "screen_id": "screen-101",
      "campaign_id": "cmp-2025-456",
      "timestamp": "2025-10-22T10:04:18Z"
    },
    {
      "screen_id": "screen-310",
      "campaign_id": "cmp-2025-123",
      "timestamp": "2025-10-22T10:04:21Z"
    }
  ];
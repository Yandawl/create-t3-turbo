import mongoose, { Model, Schema } from "mongoose";

interface IGuild {
  SERVER_ID: string;
  OWNER_ID: string;
  DISABLED: boolean;
  CREATED_ON: string;
  MEMBERS: number;
  BOTADMINISTRATORS: string[];
  MUSIC: {
    ENABLED: boolean;
    VOTE_ENABLED: boolean;
    VOLUME: number;
  };
  ANALYTICS: {
    ENABLED: boolean;
  };
  ROLES: {
    ENABLED: boolean;
    REMOVE_REACTION: boolean;
    GROUPS: string[];
  };
  EVENTS: {
    MANAGERS: string[];
  };
  PROFILES: {
    ENABLED: boolean;
    SPEED: number;
    NOEXPROLES: string[];
    NOEXPCHANNELS: string[];
    LEVEL_REWARDS_ENABLED: boolean;
    REP_REWARDS_ENABLED: boolean;
    ANNOUNCE_LEVEL_UP_CHANNEL: boolean;
    DELETE_LEVEL_NOTIFICATIONS: boolean;
    DELETE_LEVEL_NOTIFICATIONS_AFTER: number;
    MESSAGE: string;
    REMOVE_PREVIOUS: boolean;
    LEVEL_5_ROLE: string;
    LEVEL_10_ROLE: string;
    LEVEL_20_ROLE: string;
    LEVEL_30_ROLE: string;
    LEVEL_40_ROLE: string;
    LEVEL_50_ROLE: string;
    LEVEL_60_ROLE: string;
    LEVEL_70_ROLE: string;
    LEVEL_80_ROLE: string;
    LEVEL_90_ROLE: string;
    LEVEL_100_ROLE: string;
    REP_5_ROLE: string;
    REP_10_ROLE: string;
    REP_20_ROLE: string;
    REP_30_ROLE: string;
    REP_40_ROLE: string;
    REP_50_ROLE: string;
    REP_60_ROLE: string;
    REP_70_ROLE: string;
    REP_80_ROLE: string;
    REP_90_ROLE: string;
    REP_100_ROLE: string;
  };
  MODERATION: {
    ENABLED: boolean;
    RAIDMODE: boolean;
    RAID_MESSAGE: string;
    ACCOUNT_AGE_REMOVE_ENABLED: boolean;
    ACCOUNT_AGE_REMOVE_DAYS: number;
    LOGJOINERS: boolean;
    LOGLEAVERS: boolean;
    LOGBANS: boolean;
    LOGUNBANS: boolean;
    LOGJOINVC: boolean;
    LOGLEAVEVC: boolean;
    LOGJOINERSCHANNEL: string;
    LOGLEAVERSCHANNEL: string;
    LOGBANSCHANNEL: string;
    LOGUNBANSCHANNEL: string;
    LOGJOINVCCHANNEL: string;
    LOGLEAVEVCCHANNEL: string;
    AUTOPURGEENABLED: boolean;
    AUTOPURGE: string[];
    AUTOPURGEAFTER: number;
  };
  STREAMERS: {
    STREAMERS: string[];
  };
  FEEDS: {};
  CUSTOMCOMMANDS: {
    COMMANDS: string[];
  };
  WELCOME: {
    ENABLED: boolean;
    MENTION_USER: boolean;
    MENTION_ROLE: boolean;
    MENTION_ROLE_ID: string;
    MESSAGE: string;
    IMAGE_URL: string;
    FIELDS: string[];
    SEND_CHANNEL: boolean;
    CHANNEL_ID: string;
    SEND_DM: boolean;
    JOIN_ROLE_ENABLED: boolean;
    JOIN_ROLE: string;
  };
  ANNOUNCEMENTS: {};
}

const GuildSchema = new Schema<IGuild>({
  SERVER_ID: { type: String, required: true },
  OWNER_ID: { type: String, required: true },
  DISABLED: { type: Boolean, required: true },
  CREATED_ON: { type: String, required: true },
  MEMBERS: { type: Number, required: true },
});

console.log("GuildSchema", mongoose.models.Guild);

const Guild: Model<IGuild> =
  mongoose.models.Guild || mongoose.model<IGuild>("Guild", GuildSchema);

export { type IGuild, Guild };

import { Options } from "@TechSupportIq/socket-client/lib/interfaces/options";

export const getOptionsKey = ({ userId, sessionId, channel }: Pick<Options, 'channel' | 'userId' | 'sessionId'>) => 
    JSON.stringify([channel, userId, sessionId]);
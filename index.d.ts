import { EventEmitter } from "events";

interface MpdConfig {
  host: string;
  port: number;
}

type SystemName =
  | "database"
  | "update"
  | "stored_playlist"
  | "playlist"
  | "player"
  | "mixer"
  | "output"
  | "options"
  | "sticker"
  | "subscription"
  | "message";

declare class mpd extends EventEmitter {
  constructor();

  sendCommand(
    command: mpd.Command | string,
    callback: (response: string) => any
  );

  sendCommands(
    commandList: (mpd.Command | string)[],
    callback: (response: string) => any
  );

  on(event: "error", callback: (err: Error) => any);
  on(event: "end", callback: () => any);
  on(event: "connect", callback: () => any);
  on(event: "ready", callback: () => any);
  on(event: "system", callback: (systemName: SystemName) => any);

  on(event: "system-database", callback: () => any);
  on(event: "system-update", callback: () => any);
  on(event: "system-stored_playlist", callback: () => any);
  on(event: "system-playlist", callback: () => any);
  on(event: "system-player", callback: () => any);
  on(event: "system-mixer", callback: () => any);
  on(event: "system-output", callback: () => any);
  on(event: "system-options", callback: () => any);
  on(event: "system-sticker", callback: () => any);
  on(event: "system-subscription", callback: () => any);
  on(event: "system-message", callback: () => any);
}

declare namespace mpd {
  declare class Command {
    name: string;
    args: string;
    constructor(name: string, args: string);
  }

  declare function cmd(name: string, args: string[]): Command;

  declare function connect(config: MpdConfig): mpd;

  declare function parseKeyValueMessage(msg: string): { [x: string]: any };
}

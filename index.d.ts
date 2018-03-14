import { EventEmitter } from "events";

declare module "mpd";

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
    callback: (err: any, response: string) => any
  ): void;

  sendCommands(
    commandList: (mpd.Command | string)[],
    callback: (err: any, response: string) => any
  ): void;

  on(event: "error", callback: (err: Error) => any): this;
  on(event: "end", callback: () => any): this;
  on(event: "connect", callback: () => any): this;
  on(event: "ready", callback: () => any): this;
  on(event: "system", callback: (systemName: SystemName) => any): this;

  on(event: "system-database", callback: () => any): this;
  on(event: "system-update", callback: () => any): this;
  on(event: "system-stored_playlist", callback: () => any): this;
  on(event: "system-playlist", callback: () => any): this;
  on(event: "system-player", callback: () => any): this;
  on(event: "system-mixer", callback: () => any): this;
  on(event: "system-output", callback: () => any): this;
  on(event: "system-options", callback: () => any): this;
  on(event: "system-sticker", callback: () => any): this;
  on(event: "system-subscription", callback: () => any): this;
  on(event: "system-message", callback: () => any): this;
}

declare namespace mpd {
  class Command {
    name: string;
    args: string;
    constructor(name: string, args: string);
  }

  function cmd(name: string, args: string[]): Command;

  function connect(config: MpdConfig): mpd;

  function parseKeyValueMessage(msg: string): { [x: string]: any };
}

export = mpd;

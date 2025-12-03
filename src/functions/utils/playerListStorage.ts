import fs from "fs";
import path from "path";

interface Constants {
  messages: {
    playerListMessageId?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

const constantsPath = path.resolve("constants.json");

function getConstants(): Constants {
  const raw = fs.readFileSync(constantsPath, "utf-8");
  return JSON.parse(raw);
}

function saveConstants(constants: Constants) {
  fs.writeFileSync(constantsPath, JSON.stringify(constants, null, 2), "utf-8");
}

export function getPlayerListMessageId(): string | null {
  const constants = getConstants();
  return constants.messages?.playerListMessageId ?? null;
}

export function setPlayerListMessageId(messageId: string) {
  const constants = getConstants();
  constants.messages = {
    ...constants.messages,
    playerListMessageId: messageId
  };
  saveConstants(constants);
}

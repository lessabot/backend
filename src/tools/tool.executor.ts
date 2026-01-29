import { createReminder } from "./calendar";
import { searchWeb } from "./web";

export async function executeTool(name: string, args: any) {
  switch (name) {
    case "create_reminder":
      return createReminder(args);

    case "search_web":
      return searchWeb(args);

    default:
      throw new Error("Tool desconhecida");
  }
}

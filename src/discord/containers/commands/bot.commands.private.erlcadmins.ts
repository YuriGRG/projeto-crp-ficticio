import { brBuilder, createContainer, createSeparator, createTextDisplay } from "@magicyan/discord";
import { TimestampStyles, time } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";


export type AdminListData = {
    CoOwners: string[];
    Admins: Record<string, string>;
    Mods: string[];
};

export function listaDeAdminsContainer(data: AdminListData) {
    const coOwners = data.CoOwners.length > 0
        ? data.CoOwners.map(id => `- \`${id}\``).join("\n")
        : "*Nenhum CoOwner*";

    const admins = Object.keys(data.Admins).length > 0
        ? Object.entries(data.Admins).map(([id, name]) => `- \`${id}\` (${name})`).join("\n")
        : "*Nenhum Admin*";

    const mods = data.Mods.length > 0
        ? data.Mods.map(id => `- \`${id}\``).join("\n")
        : "*Nenhum Moderador*";

    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `# ${icon.clipboard_check}  Lista de Equipe Administrativa`,
                    `${icon.clock} Atualizado ${time(new Date(), TimestampStyles.RelativeTime)}`
                )
            ),
            createSeparator(false, true),
            createTextDisplay(
                brBuilder(
                    `### ${icon.director} Co-Owners`,
                    `   ${coOwners}`,
                    "",
                    `### ${icon.admin} Admins`,
                    `   ${admins}`,
                    "",
                    `### ${icon.moderator} Moderadores`,
                    `   ${mods}`,
                )
            )
        ]
    });
}

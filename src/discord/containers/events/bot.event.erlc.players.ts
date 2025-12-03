import { brBuilder, createContainer, createSeparator, createTextDisplay } from "@magicyan/discord";
import { Guild, TimestampStyles, time } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export async function playersListContainer(
    data: Array<{ Team: string; Player: string; Callsign?: string; Permission: string }>,
    guild: Guild
) {
    const teamEmojis: Record<string, string> = {
        Civilian: "<:user:1428109794903851018>",
        Police: "<:RCPD:1428183039866835014>",
        Sheriff: "<:LCSO:1428183119781171262>",
        Fire: "<:RCFR:1428183167755489280>",
        DOT: "<:CET:1429119478897184818>"
    };

    const counts: Record<string, number> = {};
    for (const team of Object.keys(teamEmojis)) counts[team] = 0;

    async function getMemberByDisplayName(username: string) {
        username = username.toLowerCase();

        let member = guild.members.cache.find(
            m => m.displayName.toLowerCase() === username
        );
        if (member) return member;

        try {
            const found = await guild.members.search({ query: username, limit: 1 });
            return found.first() ?? null;
        } catch {
            return null;
        }
    }

    const lines = [];
    for (const d of data) {
        const [username] = d.Player.split(":");
        const team = d.Team;
        const emoji = teamEmojis[team] ?? ":grey_question:";

        counts[team] = (counts[team] ?? 0) + 1;

        const prefix = d.Permission !== "Normal" ? `${icon.moderatorpb} ` : "";
        const callsign = d.Callsign ? `[${d.Callsign}] ` : "";

        const member = await getMemberByDisplayName(username);

        // Tier por padrão
        let tier: "1" | "2" | "3" | "4" = "1";

        if (member) {
            if (member.roles.cache.has(constants.roles.tierIVRoleId)) tier = "4";
            else if (member.roles.cache.has(constants.roles.tierIIIRoleId)) tier = "3";
            else if (member.roles.cache.has(constants.roles.tierIIRoleId)) tier = "2";
            else if (member.roles.cache.has(constants.roles.tierIRoleId)) tier = "1";
        }

        const stars = {
            "1": "<:TierI:1428217104792027278>",
            "2": "<:TierII:1428217107799343245>",
            "3": "<:TierIII:1428217110374383686>",
            "4": "<:TierIV:1428217113176309933>",
        };

        const starsEmoji = stars[tier];

        const userDisplay = member ? member.user : username;

        const displayName =
            d.Permission !== "Normal"
                ? `**${prefix}${callsign}${userDisplay} ${starsEmoji}**`
                : `${prefix}${callsign}${userDisplay} ${starsEmoji}`;

        lines.push(`${emoji} ${displayName}`);
    }

    return createContainer({
        components: [
            createTextDisplay(
                brBuilder(
                    `## (${data.length}/39) Jogadores online:`,
                    Object.entries(teamEmojis)
                        .map(([team, emoji]) => ` ${emoji} ${counts[team] ?? 0}`)
                        .join("")
                )
            ),
            createSeparator(true, true),
            createTextDisplay(
                lines.length > 0
                    ? lines.join("\n")
                    : "*Nenhum jogador online no momento.*"
            ),
            createSeparator(true, true),
            createTextDisplay(
                `Atualizado por último ${time(new Date(), TimestampStyles.RelativeTime)}`
            )
        ]
    });
}

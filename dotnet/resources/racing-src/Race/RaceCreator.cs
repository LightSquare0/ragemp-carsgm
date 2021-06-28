using Dapper;
using GTANetworkAPI;
using MySql.Data.MySqlClient;
using racing_src.Admin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src.Race
{
    class RaceCreator : Script
    {
        [RemoteEvent("serverside:OnSaveRace")]
        public async Task OnSaveRace(Player player, string racename, string category, string creator, string currentCheckpoints)
        {
            using (IDbConnection db = new MySqlConnection(Tools.GetConnectionString()))
            {
                var raceParams = new
                {
                    racename = racename,
                    category = category,
                    creator = creator,
                    currentCheckpoints = currentCheckpoints
                };
                player.SendChatMessage(racename + category + creator);
                string insertRaceSQL = "INSERT INTO races (name, category, creator, checkpoints) VALUES (@racename, @category, @creator, @currentCheckpoints)";
                await db.ExecuteAsync(insertRaceSQL, raceParams);
                player.SendChatMessage("DEBUG: race inserted");
            }
        }

        [Command("creatormode")]
        public void CreateRace(Player player)
        {
            if (!AdminCommands.IsAdmin(player))
            {
                player.SendChatMessage("You are not an admin.");
                return;
            }

            if (player.GetSharedData<bool>("creatormode"))
            {
                player.SetSharedData("creatormode", false);
                player.SendChatMessage("You are no longer in creator mode.");

                return;
            }

            player.SetSharedData("creatormode", true);
            player.SendChatMessage("You are now in creator mode.");
            player.SendChatMessage("Use /pc to place a checkpoint at your current location.");
        }

        [Command("placecheckpoint", Alias = "pc")]
        public void PlaceCheckpoint(Player player)
        {
            if (!player.GetSharedData<bool>("creatormode"))
            {
                player.SendChatMessage("You are not in creator mode.");
                return;
            }

            player.TriggerEvent("clientside:PlaceCheckpoint", player.Position.X, player.Position.Y, player.Position.Z);
            player.SendChatMessage($"Placed checkpoint at: {player.Position.X}, {player.Position.Y}, {player.Position.Z}");
        }

        [Command("saverace")]
        public void SaveRace(Player player, string racename, string category, string creator)
        {
            if (!player.GetSharedData<bool>("creatormode"))
            {
                player.SendChatMessage("You are not in creator mode.");
                return;
            }

            player.TriggerEvent("clientside:SaveRace", racename, category, creator);
        }

    }
}

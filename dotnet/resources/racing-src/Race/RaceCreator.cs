using Dapper;
using GTANetworkAPI;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using racing_src.Admin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static racing_src.Race.RaceCreator;

namespace racing_src.Race
{

     

    class RaceCreator : Script
    {
        public class Checkpoint
        {
            public float X { get; set; }
            public float Y { get; set; }
            public float Z { get; set; }
        }

        public class Race
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Category { get; set; }
            public string Creator { get; set; }
            public string Checkpoints { get; set; }
        }

        public class TypeHandler<T> : SqlMapper.TypeHandler<T>
        {
            public override T Parse(object value)
            {
                return JsonConvert.DeserializeObject<T>(value.ToString());
            }

            public override void SetValue(IDbDataParameter parameter, T value)
            {
                parameter.Value = JsonConvert.SerializeObject(value);
            }
        }


        public static bool IsInCreatorMode(Player player)
        {
            if (!player.GetSharedData<bool>("creatormode"))
            {
                player.SendChatMessage("You are not in creator mode. Type /creatormode");
                return false;
            }

            return true;
        }

        public static async Task<Race> LoadRaceAsync(Player player, string racename)
        {
            using (IDbConnection db = new MySqlConnection(Tools.GetConnectionString()))
            {

                string selectRaceSQL = "SELECT * FROM races WHERE name = @racename";
                return await db.QueryFirstOrDefaultAsync<Race>(selectRaceSQL, new { racename });

            }
        }

        [Command("creatormode")]
        public void CreateRace(Player player)
        {
            if (!AdminCommands.IsAdmin(player))
                return;

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
            if (!IsInCreatorMode(player))
                return;

            player.TriggerEvent("clientside:PlaceCheckpoint", player.Position.X, player.Position.Y, player.Position.Z);
            player.SendChatMessage($"Placed checkpoint at: {player.Position.X}, {player.Position.Y}, {player.Position.Z}");
        }

        [RemoteEvent("serverside:OnSaveRace")]
        public static async Task OnSaveRace(Player player, string racename, string category, string creator, string currentCheckpoints)
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

        [Command("saverace")]
        public void SaveRace(Player player, string racename, string category, string creator)
        {
            if (!IsInCreatorMode(player))
                return;

            player.TriggerEvent("clientside:SaveRace", racename, category, creator);
        }

        [Command("loadrace", SensitiveInfo = true)]
        public static async Task LoadTrackAsync(Player player, string racename)
        {
           
            var race = await LoadRaceAsync(player, racename);
            
            if (race != null)
            {
                player.TriggerEvent("clientside:LoadRace", race.Checkpoints);
            }
           
        }

    }
}

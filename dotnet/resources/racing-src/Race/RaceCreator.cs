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
using static racing_src.Race.RaceManager;

namespace racing_src.Race
{



    class RaceCreator : Script
    {
       

        public class JsonTypeHandler : SqlMapper.ITypeHandler
        {
            public void SetValue(IDbDataParameter parameter, object value)
            {
                parameter.Value = JsonConvert.SerializeObject(value);
            }

            public object Parse(Type destinationType, object value)
            {
                return JsonConvert.DeserializeObject(value as string, destinationType);
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

        public static Tuple<List<Vector3>, List<Spawnpoint>> LoadTrackInfoAsync(Player player, string racename)
        {
            var template = RaceTemplates.Find(x => x.TrackName == racename);
            return Tuple.Create(template.Checkpoints, template.Spawnpoints);
        }

        [Command("loadrace", SensitiveInfo = true)]
        public static void LoadTrackAsync(Player player, string racename)
        {

            var race = LoadTrackInfoAsync(player, racename);

            if (race != null)
            {
                player.TriggerEvent("clientside:LoadRace", race.Item1);
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
            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
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

        

        [Command("addsp")]
        public static async Task AddSpawnPoint(Player player, int id)
        {
            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
            {
                if (!IsInCreatorMode(player))
                    return;

                string getSpawnpointsSQL = "SELECT spawnpoints FROM races WHERE id = @id LIMIT 1";
                string updateSpawnPointsSQL = "UPDATE races SET spawnpoints = @spawnpoints WHERE id = @id";
                var spawnpoints = NAPI.Util.FromJson<List<Spawnpoint>>(db.QueryFirst<string>(getSpawnpointsSQL, new { id }));
                //Vehicle veh = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey("neon"), player.Position, player.Heading, 200, 200, $"Test vehicle.");
                NAPI.Checkpoint.CreateCheckpoint(CheckpointType.Cyclinder, new Vector3(player.Position.X, player.Position.Y, player.Position.Z - 1), new Vector3(0, 1, 0), 2.5f, new Color(255, 0, 0), player.Dimension);
                spawnpoints.Add(new Spawnpoint(new Vector3(player.Position.X, player.Position.Y, player.Position.Z), player.Vehicle.Heading));
                foreach (var c in spawnpoints)
                {
                    Console.WriteLine($"{c.Position.X} {c.Position.Y} {c.Position.Z} {c.Heading}");
                }
                var toInsert = NAPI.Util.ToJson(spawnpoints);
                await db.ExecuteAsync(updateSpawnPointsSQL, new { spawnpoints = toInsert, id = id });
                player.SendChatMessage("inserted");
            }
        }

        [Command("clearconsole")]
        public void ClearConsole(Player player)
        {
            Console.Clear();
            player.SendChatMessage("Server console cleared");
        }

    }
}
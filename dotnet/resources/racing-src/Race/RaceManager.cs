using Dapper;
using GTANetworkAPI;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src.Race
{
    public class RaceManager : Script
    {

        public class Racer
        {
            public int Position { get; set; }
            public Player Name { get; set; }
        }

        public class Spawnpoint
        {
            public Vector3 Position { get; set; }
            public bool Occupied { get; set; }

            /*public Spawnpoint () { }*/
            public Spawnpoint (Vector3 position, bool occupied)
            {
                Position = position;
                Occupied = occupied;
            }

        }

        public class RaceTemplate
        {
            public int SQLid { get; set; }
            public string TrackName { get; set; }
            public string Category { get; set; }
            public string Creator { get; set; }
            public List<Vector3> Checkpoints { get; set; }
            public List<Spawnpoint> Spawnpoints { get; set; }
            public RaceTemplate() { }
            public RaceTemplate( int sqlid, string trackname, string category, string creator, List<Vector3> checkpoints, List<Spawnpoint> spawnpoints)
            {
                SQLid = sqlid;
                TrackName = trackname;
                Category = category;
                Creator = creator;
                Checkpoints = checkpoints;
                Spawnpoints = spawnpoints;
            }
        }

        public class Race : RaceTemplate
        {
            public Player Hoster { get; set; }
            public int MaxParticipants { get; set; }
            public int MaxDuration { get; set; }
            public List<Racer> Racers { get; set; }
            public Race(int sqlid, string trackname, string category, string creator, Player hoster, int max_participants, int max_duration)
            {
                SQLid = sqlid;
                TrackName = trackname;
                Category = category;
                Creator = creator;
                Hoster = hoster;
                MaxParticipants = max_participants;
                MaxDuration = max_duration;
            }
        }

        public static List<RaceTemplate> RaceTemplates = new();

        public List<Race> CurrentRaces = new();


        public static async Task LoadAllRaceTemplates()
        {

            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
            {
                string selectAllRacesSQL = "SELECT * FROM races";
                var reader = await db.ExecuteReaderAsync(selectAllRacesSQL);
                while (reader.Read())
                {
                    int index = 0;
                    RaceTemplate raceTemplate = new RaceTemplate();
                    raceTemplate.SQLid = reader.GetInt32(index++);
                    raceTemplate.TrackName = reader.GetString(index++);
                    raceTemplate.Category = reader.GetString(index++);
                    raceTemplate.Creator = reader.GetString(index++);
                    raceTemplate.Checkpoints = NAPI.Util.FromJson<List<Vector3>>(reader.GetString(index++));
                    raceTemplate.Spawnpoints = NAPI.Util.FromJson<List<Spawnpoint>>(reader.GetString(index++));
                    RaceTemplates.Add(raceTemplate);
                }
                reader.Close();
            }
                
        }

        [ServerEvent(Event.ResourceStart)]
        public async Task LoadRaces()
        {
            await LoadAllRaceTemplates();
            ConsoleInfo.WriteSuccess($"Loaded {RaceTemplates.Count} race templates from database.");
            
        }

        [Command("host")]
        public void HostRace(Player player, string racename, int max_participants, int max_duration)
        {
            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
            {
                
                var template = RaceTemplates.Find(x => x.TrackName == racename);
                var newRace = new Race(template.SQLid, template.TrackName, template.Category, template.Creator, player, max_participants, max_duration);

                CurrentRaces.Add(newRace);

                player.SendChatMessage($"Hosted new race with the TrackName:  {newRace.TrackName}, Hoster:  {newRace.Hoster.Name}, Duration:  {newRace.MaxDuration}s, MaxParticipants:  {newRace.MaxParticipants}.");

            }
        }

        [Command("cancelhost")]
        public void CancelHost(Player player)
        {
            var hostedrace = CurrentRaces.Find(x => x.Hoster == player);
            CurrentRaces.Remove(hostedrace);
            player.SendChatMessage("You are no longer hosting a race.");
        }


        [Command("displayraces")]
        public void DisplayRaces(Player player)
        {
            DisplayCurrentRaces();
        }

        public void DisplayCurrentRaces()
        {
            int id = 0;
            Console.WriteLine("\n=================================");
            CurrentRaces.ForEach(race => Console.WriteLine($"{id++}. Track name: {race.TrackName} | Category: {race.Category} | Track creator: {race.Creator} | Hoster: {race.Hoster.Name} | MaxDuration: {race.MaxDuration} | MaxParticipants: {race.MaxParticipants}\n"));
            Console.WriteLine("=================================\n");
        }
    }
}

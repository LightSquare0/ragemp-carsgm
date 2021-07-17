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
using System.Timers;

namespace racing_src.Race
{
    public class RaceManager : Script
    {

        public class Racer
        {
            public int RacePosition { get; set; }
            public Vector3 WorldPosition { get; set; }
            public Player Participant { get; set; }
            public int CurrentCheckpoint { get; set; }
            public bool HasFinished { get; set; }
            public Racer(int position, Player participant)
            {
                CurrentCheckpoint = 0;
                RacePosition = position;
                Participant = participant;
                HasFinished = false;
            }
        }

        public class Spawnpoint
        {
            public Vector3 Position { get; set; }
            public float Heading { get; set; }
            public bool Occupied { get; set; }
            public Spawnpoint(Vector3 position, float rotation, bool occupied)
            {
                Position = position;
                Heading = rotation;
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
            public RaceTemplate(int sqlid, string trackname, string category, string creator, List<Vector3> checkpoints, List<Spawnpoint> spawnpoints)
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
            public bool HasStarted { get; set; }
            public bool HasEnded { get; set; }
            public List<Spawnpoint> _Spawnpoints { get; set; }
            public List<Racer> Racers { get; set; }
            public Race(int sqlid, string trackname, string category, string creator, Player hoster, int max_participants, int max_duration)
            {
                Racers = new List<Racer>();
                SQLid = sqlid;
                TrackName = trackname;
                Category = category;
                Creator = creator;
                Hoster = hoster;
                HasStarted = false;
                HasEnded = false;
                MaxParticipants = max_participants;
                MaxDuration = max_duration;
            }

            public void AddRacer(int position, Player player)
            {
                Racers.Add(new Racer(position, player));
            }
            public void RemoveRacer(Player participant)
            {
                var racer = Racers.Find(x => x.Participant.Name == participant.Name);
                Racers.Remove(racer);
            }

            public int GetRacerPosition(Player participant)
            {
                foreach (var racer in Racers)
                {
                    if (racer.Participant.Name == participant.Name)
                        return racer.RacePosition;
                }
                return 0;
            }

            public void UpdateRacerPosition(Player participant, int position)
            {
                foreach (var racer in Racers)
                {
                    if (racer.Participant.Name == participant.Name)
                    {
                        racer.RacePosition = position;
                    }
                }
            }
        }

        public static List<RaceTemplate> RaceTemplates = new();

        public List<Race> CurrentRaces = new();


        [ServerEvent(Event.ResourceStart)]
        public void RaceTimers()
        {
            Timer raceTimer = new();
            raceTimer.Elapsed += UpdateRacerPositions;
            raceTimer.Interval = 1000;
            if (CurrentRaces.FindAll(race => race.HasStarted == true).Count > 0)
            {
                raceTimer.Enabled = false;
                Console.WriteLine("Race timer stopped.");
            }
            else
            {
                raceTimer.Enabled = true;
                Console.WriteLine("Race timer started.");
            }

        }

        public void UpdateRacerPositions(object sender, ElapsedEventArgs e)
        {

            var startedRaces = CurrentRaces.FindAll(race => race.HasStarted == true);


            foreach (var race in startedRaces)
            {
                var racersGroupedByCheckpoint = race.Racers.GroupBy(racer => racer.CurrentCheckpoint, racer => new { racer.Participant, racer.CurrentCheckpoint, racer.RacePosition }, (key, g) => new { CurrentCheckpoint = key, Participants = g.ToList() });

                foreach (var group in racersGroupedByCheckpoint)
                {
                    NAPI.Task.Run(() =>
                    {
                        group.Participants.ForEach(x => Console.WriteLine($"{x.Participant.Name} {x.CurrentCheckpoint} {x.RacePosition}"));
                        for (int i = 0; i < group.Participants.Count - 1; i++)
                        {
                            for (int j = i + 1; j < group.Participants.Count; j++)
                            {
                                var race = CurrentRaces.ElementAtOrDefault(group.Participants[i].Participant.GetSharedData<int>("raceId"));
                                var i_racePosition = race.GetRacerPosition(group.Participants[i].Participant);
                                var j_racePosition = race.GetRacerPosition(group.Participants[j].Participant);

                                if (group.Participants.Count <= 2)
                                {
                                    
                                    if (group.Participants[i].Participant.GetData<Vector3>("currentCheckpointCoords") == null)
                                        return;

                                    Console.WriteLine($"{group.Participants[i].Participant.GetData<Vector3>("currentCheckpointCoords").X} " +
                                        $"{group.Participants[i].Participant.GetData<Vector3>("currentCheckpointCoords").Y} " +
                                        $"{group.Participants[i].Participant.GetData<Vector3>("currentCheckpointCoords").Z}");

                                    if (group.Participants[i].Participant.Position.DistanceTo(group.Participants[i].Participant.GetData<Vector3>("currentCheckpointCoords"))
                                        >
                                group.Participants[j].Participant.Position.DistanceTo(group.Participants[j].Participant.GetData<Vector3>("currentCheckpointCoords")))
                                    {
                                        race.UpdateRacerPosition(group.Participants[i].Participant, /*i_racePosition++*/ 1);
                                        group.Participants[i].Participant.SendChatMessage("Esti pe locu 1");
                                        race.UpdateRacerPosition(group.Participants[j].Participant, /*i_racePosition - 1*/ 2);
                                        group.Participants[j].Participant.SendChatMessage("Esti pe locu 2");

                                    }
                                    else
                                    {
                                        race.UpdateRacerPosition(group.Participants[i].Participant, /*j_racePosition++*/ 2);
                                        group.Participants[i].Participant.SendChatMessage("Esti pe locu 2");
                                        race.UpdateRacerPosition(group.Participants[j].Participant, /*j_racePosition - 1*/ 1);
                                        group.Participants[j].Participant.SendChatMessage("Esti pe locu 1");
                                    }
                                }
                                

                            }
                        }

                    });
                    
                }
            }
        }

        public static async Task LoadAllRaceTemplates()
        {

            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
            {
                string selectAllRacesSQL = "SELECT * FROM races";
                var reader = await db.ExecuteReaderAsync(selectAllRacesSQL);
                while (reader.Read())
                {
                    int index = 0;
                    RaceTemplate raceTemplate = new()
                    {
                        SQLid = reader.GetInt32(index++),
                        TrackName = reader.GetString(index++),
                        Category = reader.GetString(index++),
                        Creator = reader.GetString(index++),
                        Checkpoints = NAPI.Util.FromJson<List<Vector3>>(reader.GetString(index++)),
                        Spawnpoints = NAPI.Util.FromJson<List<Spawnpoint>>(reader.GetString(index++))
                    };
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

                if (CurrentRaces.Exists(x => x.Hoster.Name == player.Name))
                {
                    player.Notify(Notifications.Type.Error, "You are already hosting a race.", "Please cancel it if you want to host another.");
                    return;
                }

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


        [Command("joinrace")]
        public void JoinRace(Player player, int raceId)
        {

            if (CurrentRaces.ElementAtOrDefault(raceId) == null)
            {
                player.SendChatMessage("The race with that id doesn't exist");
                return;
            }

            if(CurrentRaces.ElementAtOrDefault(raceId).Racers.Count == CurrentRaces.ElementAtOrDefault(raceId).MaxParticipants)
            {
                player.SendChatMessage("The lobby you are trying to join is full.");
                return;
            }

            CurrentRaces.ElementAtOrDefault(raceId).AddRacer(0, player);
            player.SetSharedData("raceId", raceId);

            var trackData = RaceCreator.LoadTrackInfoAsync(player, CurrentRaces.ElementAtOrDefault(raceId).TrackName);
            CurrentRaces.ElementAtOrDefault(raceId)._Spawnpoints = trackData.Item2;
            var spawnpoint = CurrentRaces.ElementAtOrDefault(raceId)._Spawnpoints.Find(spawnpoint => spawnpoint.Occupied == false);
            spawnpoint.Occupied = true;

            var veh = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey("neon"), spawnpoint.Position, spawnpoint.Heading, 200, 200, $"Race {raceId}");

            NAPI.Task.Run(() =>
            {
                Task.Delay(800);
                player.SetIntoVehicle(veh, 0);
            });
            
            player.SendChatMessage($"You joined the race with the id of {raceId} on the position {CurrentRaces.ElementAtOrDefault(raceId).Racers.Count()}, participant {player.Name}, rotation {spawnpoint.Heading}");
            //@TODO remove the hosted race from the list on host crash.
        }

        [Command("startrace")]
        public void StartRace(Player player)
        {
            var raceId = player.GetSharedData<int>("raceId");
            
            foreach (var racer in CurrentRaces.ElementAtOrDefault(raceId).Racers)
            {
                RaceCreator.LoadTrackAsync(racer.Participant, CurrentRaces.ElementAtOrDefault(raceId).TrackName);
                racer.Participant.SendChatMessage("Race started!");
            }
            CurrentRaces.ElementAtOrDefault(raceId).HasStarted = true;
        }

        [Command("getvehrot")]
        public void GetRot(Player player)
        {
            player.SendChatMessage($"player.Vehicle.Rotation: {player.Vehicle.Rotation}");
            player.SendChatMessage($"player.Vehicle.Heading: {player.Vehicle.Heading}");
            player.SendChatMessage($"player.Vehicle.Rotation.Z: {player.Vehicle.Rotation.Z}");
            player.SendChatMessage($"player.Heading: {player.Heading}");
        }

        [Command("setvehrot")]
        public void SetVehRot(Player player, float rot)
        {
            player.Vehicle.Rotation.Z = rot;
            player.SendChatMessage($"Rotation set to {rot}");
        }

        [Command("exitrace")]
        public void ExitRace(Player player)
        {
            CurrentRaces.ElementAtOrDefault(player.GetSharedData<int>("raceId")).RemoveRacer(player);
            player.ResetSharedData("raceId");
        }

        [Command("viewrace")]
        public void ViewRace(Player player, int raceId)
        {
            var race = CurrentRaces[raceId];
            player.SendChatMessage($"{race.TrackName} {race.SQLid} {race.Hoster.Name}");
        }

        [RemoteEvent("serverside:OnPlayerEnterCheckpoint")]
        public void PlayerGetCheckpoint(Player player, int currentCheckpoint, Vector3 currentCheckpointCoords)
        {
            player.SendChatMessage($"{player.Name} entered checkpoint {currentCheckpoint} with coords {NAPI.Util.ToJson(currentCheckpointCoords)}");
            player.SetData("currentCheckpointCoords", currentCheckpointCoords);
            CurrentRaces.ElementAtOrDefault(player.GetSharedData<int>("raceId")).Racers.Find(racer => racer.Participant.Name == player.Name).CurrentCheckpoint = currentCheckpoint;
        }

        [RemoteEvent("serverside:OnPlayerEnterFinishCheckpoint")]
        public void PlayerGetFinishCheckpoint(Player player)
        {
            var playerRace = CurrentRaces.ElementAtOrDefault(player.GetSharedData<int>("raceId"));

            playerRace.Racers.Find(racer => racer.Participant.Name == player.Name).HasFinished = true;
            foreach(var racer in playerRace.Racers)
            {
                racer.Participant.Notify(Notifications.Type.Success, $"{player.Name} has finished the race!", "");
            }

            if (playerRace.Racers.TrueForAll(racer => racer.HasFinished == true))
            {
                NAPI.Task.Run(() =>
                {
                    Task.Delay(2500);
                    CurrentRaces.Remove(playerRace);
                });
                
            }
        }

        public void DisplayCurrentRaces()
        {
            int id = 0;
            Console.WriteLine("\n=================================");

            foreach(var race in CurrentRaces)
            {
                Console.WriteLine($"{id++}. Track name: {race.TrackName} | Category: {race.Category} | Track creator: {race.Creator} | Hoster: {race.Hoster.Name} | MaxDuration: {race.MaxDuration} | MaxParticipants: {race.MaxParticipants}");
                Console.WriteLine("Racers:");
                foreach(var racer in race.Racers)
                {
                    NAPI.Task.Run(() =>
                    {
                        Console.WriteLine($"\n Name: {racer.Participant.Name} Position: {racer.RacePosition}");
                    });
                    
                }
            }

            Console.WriteLine("=================================\n");
        }
    }
}

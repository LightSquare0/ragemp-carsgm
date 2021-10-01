using Dapper;
using GTANetworkAPI;

using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Timers;

namespace racing_src.Race
{
    public class RaceManager : Script
    {

        public static List<RaceTemplate> RaceTemplates = new();

        public static List<TrackImage> TrackImages = new();

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
            NAPI.Task.Run(() =>
            {

                var startedRaces = CurrentRaces.FindAll(race => race.HasStarted == true);

                startedRaces.ForEach(race =>
                {
                    race.Racers.Sort(delegate (Racer a, Racer b)
                    {
                        if (a.CurrentCheckpoint == b.CurrentCheckpoint)
                        {
                            if (a.DistanceToCheckpoint(race.Checkpoints[a.CurrentCheckpoint]) > b.DistanceToCheckpoint(race.Checkpoints[a.CurrentCheckpoint]))
                            {
                                b.Participant.SendChatMessage("L-ai devansat pe " + a.Participant.Name);
                                a.Participant.SendChatMessage("Ai fost devansat de " + b.Participant.Name);

                                int old = b.RacePosition;
                                b.RacePosition = a.RacePosition;
                                a.RacePosition = old;
                                return 1;
                            }
                        }
                        else
                        {
                            if (a.Checkpoints < b.Checkpoints)
                            {
                                b.Participant.SendChatMessage("L-ai devansat pe " + a.Participant.Name);
                                a.Participant.SendChatMessage("Ai fost devansat de " + b.Participant.Name);

                                int old = b.RacePosition;
                                b.RacePosition = a.RacePosition;
                                a.RacePosition = old;
                                return 1;
                            }

                        }
                        return 0;
                    });
                    race.Racers.ForEach(x => Console.WriteLine(x.Participant.Name));
                });

            });
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
                        Spawnpoints = NAPI.Util.FromJson<List<Spawnpoint>>(reader.GetString(index++)),
                        Image = reader.GetString(index++) 
                    };
                    TrackImage trackImage = new()
                    {
                        name = (string) reader["name"],
                        image = (string) reader["image"],
                        state = ""
                    };
                    TrackImages.Add(trackImage);
                    RaceTemplates.Add(raceTemplate);
                }
                reader.Close();
            }

        }

        [ServerEvent(Event.ResourceStart)]
        public static async Task LoadRaces()
        {
            await LoadAllRaceTemplates();
            ConsoleInfo.WriteSuccess($"Loaded {RaceTemplates.Count} race templates and {TrackImages.Count} track images from database.");
        }

        [RemoteProc("serverside:SendTrackImages")]
        public static List<TrackImage> SendTrackImages(Player player)
        {
            return  TrackImages;
        }

        [RemoteEvent("serverside:HostRace")]
        public void HostRace(Player player, string trackname, bool mode, int laps, int max_duration, int max_participants, string type)
        {

            // if (CurrentRaces.Exists(x => x.Hoster.Name == player.Name))
            // {
            //     player.Notify(Notifications.Type.Error, "You are already hosting a race.", "Please cancel it if you want to host another.");
            //     return;
            // }
            
            var template = RaceTemplates.Find(x => x.TrackName == trackname);
            if (template is null)
            {
                player.Notify(Notifications.Type.Error, "Invalid track name", "Please contact an administrator.");
                return;
            }

            var raceImage = TrackImages.Find((image) => image.name == template.TrackName).image;
            
            var newRace = new Race(template.SQLid, template.TrackName, template.Category, template.Creator, player, mode, laps, max_duration, max_participants, type, raceImage);
            newRace.Checkpoints = template.Checkpoints;
            CurrentRaces.Add(newRace);

            player.SendChatMessage($"Hosted new race with the TrackName:  {newRace.TrackName}, Hoster:  {newRace.Hoster.Name}, Duration:  {newRace.MaxDuration}s, MaxParticipants:  {newRace.MaxParticipants}.");
            Console.WriteLine($"Hosted new race with the TrackName:  {newRace.TrackName}, Hoster:  {newRace.Hoster.Name}, Duration:  {newRace.MaxDuration}s, MaxParticipants:  {newRace.MaxParticipants}.");
            player.Notify(Notifications.Type.Success, "Success", "Your race is now publicly hosted.");
        }

        [RemoteProc("serverside:SendInitialRaces")]
        public List<Race> SendInitialRaces(Player player)
        {
            return CurrentRaces;
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

            if (CurrentRaces[raceId] == null)
            {
                player.SendChatMessage("The race with that id doesn't exist");
                return;
            }

            if (CurrentRaces[raceId].Racers.Count == CurrentRaces[raceId].MaxParticipants)
            {
                player.SendChatMessage("The lobby you are trying to join is full.");
                return;
            }
            player.SetData("currentCheckpoint", 0);
            CurrentRaces[raceId].AddRacer(0, player);
            player.SetSharedData("raceId", raceId);


            var trackData = RaceCreator.LoadTrackInfoAsync(player, CurrentRaces[raceId].TrackName);
            CurrentRaces[raceId]._Spawnpoints = trackData.Item2;
            var spawnpoint = CurrentRaces[raceId]._Spawnpoints.Find(spawnpoint => spawnpoint.Occupied == false);
            spawnpoint.Occupied = true;

            var veh = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey("neon"), spawnpoint.Position, spawnpoint.Heading, 200, 200, $"Race {raceId}");

            NAPI.Task.Run(() =>
            {
                player.SetIntoVehicle(veh, 0);
            }, 800);

            player.SendChatMessage($"You joined the race with the id of {raceId} on the position {CurrentRaces[raceId].Racers.Count()}, participant {player.Name}, rotation {spawnpoint.Heading}");
            //@TODO remove the hosted race from the list on host crash.
        }

        [Command("startrace")]
        public void StartRace(Player player)
        {
            var raceId = player.GetSharedData<int>("raceId");

            foreach (var racer in CurrentRaces[raceId].Racers)
            {
                RaceCreator.LoadTrackAsync(racer.Participant, CurrentRaces[raceId].TrackName);
                racer.Participant.SendChatMessage("Race started!");


            }
            CurrentRaces[raceId].HasStarted = true;
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
        public void PlayerGetCheckpoint(Player player, int checkpointIndex)
        {
            player.SendChatMessage($"{player.Name} entered checkpoint {checkpointIndex}.");
            player.SetData("currentCheckpoint", checkpointIndex);
            player.SetData<int>("Checkpoints", player.GetData<int>("Checkpoints") + 1);
        }

        [RemoteEvent("serverside:OnPlayerEnterFinishCheckpoint")]
        public void PlayerGetFinishCheckpoint(Player player)
        {
            var playerRace = CurrentRaces.ElementAtOrDefault(player.GetSharedData<int>("raceId"));

            playerRace.Racers.Find(racer => racer.Participant.Name == player.Name).HasFinished = true;
            if (playerRace.Racers.FindAll(racer => racer.HasWon == true).Count == 0)
            {
                playerRace.Racers.Find(racer => racer.Participant == player).HasWon = true;
                playerRace.Racers.ForEach(racer => racer.Participant.Notify(Notifications.Type.Success, $"{player.Name} has won the race!", ""));
            }
            
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

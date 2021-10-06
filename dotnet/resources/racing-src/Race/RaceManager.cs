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
        public static uint DimensionIncrementator = 1;
        public static List<RaceTemplate> RaceTemplates = new();

        public static List<TrackImage> TrackImages = new();

        public static List<Park> ParksSpots = new ()
                {
                    new Park(new Vector3(-1675.5154, -850.7286, 8.369419), -40.705467f),
                    new Park(new Vector3(-1673.0564, -852.54987, 8.373209), -40.482887f),
                    new Park(new Vector3(-1670.7449, -854.59564, 8.373298), -41.186665f),
                    new Park(new Vector3(-1668.2135, -856.4136, 8.380935), -41.10347f),
                    new Park(new Vector3(-1665.8779, -858.4992, 8.379945), -41.46373f),
                    new Park(new Vector3(-1663.687, -860.5467, 8.375846), -41.393505f),
                    new Park(new Vector3(-1661.3357, -862.5849, 8.375454), -40.660614f),
                    new Park(new Vector3(-1658.8596, -864.3582, 8.380709), -38.938908f),
                    new Park(new Vector3(-1656.4652, -866.3835, 8.384153), -40.897736f),
                    new Park(new Vector3(-1654.2086, -868.3383, 8.383664), -40.99948f),
                    new Park(new Vector3(-1651.841, -870.36694, 8.381306), -40.906116f),
                    new Park(new Vector3(-1649.4935, -872.3269, 8.381763), -40.96119f),
                    new Park(new Vector3(-1647.273, -874.3954, 8.379465), -41.490364f),
                    new Park(new Vector3(-1650.8127, -878.57806, 8.282423), 139.84204f),
                    new Park(new Vector3(-1653.151, -876.46277, 8.283349), 139.63913f),
                    new Park(new Vector3(-1655.434, -874.45575, 8.284184), 140.16585f),
                    new Park(new Vector3(-1657.9215, -872.6126, 8.280474), 138.815f),
                    new Park(new Vector3(-1660.2632, -870.5724, 8.281173), 139.1713f),
                    new Park(new Vector3(-1662.5804, -868.5763, 8.280627), 139.26164f),
                    new Park(new Vector3(-1664.819, -866.53455, 8.2823515), 139.3623f),
                    new Park(new Vector3(-1667.3436, -864.6168, 8.279401), 139.74202f),
                    new Park(new Vector3(-1669.5697, -862.58813, 8.281136), 139.73169f),
                    new Park(new Vector3(-1671.8643, -860.5159, 8.281811), 138.83727f),
                    new Park(new Vector3(-1674.238, -858.5728, 8.280104), 138.97034f),
                    new Park(new Vector3(-1676.4241, -856.3468, 8.284006), 139.18138f),
                    new Park(new Vector3(-1678.9159, -854.5146, 8.2791), 138.82787f),
                    new Park(new Vector3(-1666.0525, -839.4712, 8.760846), 139.57349f),
                    new Park(new Vector3(-1663.851, -841.6168, 8.759321), 140.04306f),
                    new Park(new Vector3(-1661.3188, -843.5513, 8.761374), 139.47502f),
                    new Park(new Vector3(-1658.9088, -845.3533, 8.751918), 138.7258f),
                    new Park(new Vector3(-1656.6761, -847.4479, 8.709894), 138.576f),
                    new Park(new Vector3(-1654.296, -849.41486, 8.675487), 138.80994f),
                    new Park(new Vector3(-1651.9806, -851.51086, 8.684595), 138.90031f),
                    new Park(new Vector3(-1649.583, -853.3958, 8.728194), 139.74005f),
                    new Park(new Vector3(-1647.298, -855.5132, 8.752234), 139.58057f),
                    new Park(new Vector3(-1645.0232, -857.43066, 8.762736), 140.47672f),
                    new Park(new Vector3(-1642.483, -859.2697, 8.77775), 138.84573f),
                    new Park(new Vector3(-1640.1719, -861.24304, 8.779289), 140.75264f),
                    new Park(new Vector3(-1637.8678, -863.3035, 8.7809105), 140.00482f),
                    new Park(new Vector3(-1634.2228, -866.2766, 8.784423), 139.32054f),
                    new Park(new Vector3(-1631.8751, -868.4786, 8.7801895), 139.27544f),
                    new Park(new Vector3(-1629.6501, -870.5197, 8.777534), 141.19724f),
                    new Park(new Vector3(-1627.2439, -872.569, 8.776804), 140.89418f),
                    new Park(new Vector3(-1624.8738, -874.52344, 8.777121), 140.66148f),
                    new Park(new Vector3(-1622.5295, -876.43976, 8.778378), 138.89636f),
                    new Park(new Vector3(-1620.2075, -878.4827, 8.777239), 138.56207f),
                    new Park(new Vector3(-1617.7434, -880.44794, 8.775561), 140.19456f),
                    new Park(new Vector3(-1615.4886, -882.4871, 8.76406), 140.19096f),
                    new Park(new Vector3(-1613.0752, -884.3368, 8.747496), 139.89305f),
                    new Park(new Vector3(-1610.8286, -886.47406, 8.726586), 139.89299f),
                    new Park(new Vector3(1608.4221, -888.25055, 8.733913), 140.57297f),
                    new Park(new Vector3(-1606.1626, -890.3116, 8.751074), 140.39485f),
                };
        
        public List<Race> CurrentRaces = new();
        

        [ServerEvent(Event.ResourceStart)]
        public void RaceTimers()
        {
            Timer raceTimer = new();
            raceTimer.Elapsed += UpdateRacerPositions;
            raceTimer.Interval = 1000;
            if (CurrentRaces.FindAll(race => race.HasStarted).Count > 0)
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
                    race.Racers.Values.ToList().Sort(delegate (Racer a, Racer b)
                    {
                        if (a.CurrentCheckpoint == b.CurrentCheckpoint)
                        {
                            if (a.DistanceToCheckpoint(race.Template.Checkpoints[a.CurrentCheckpoint]) > b.DistanceToCheckpoint(race.Template.Checkpoints[a.CurrentCheckpoint]))
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
                    race.Racers.Values.ToList().ForEach(x => Console.WriteLine(x.Participant.Name));
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
        public void HostRace(Player player, string trackname, bool mode, int laps, int max_duration,
            int max_participants, string type, string selected_vehicles)
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

            var newRace = new Race(ref template, player,
                mode, laps, max_duration, max_participants, type, NAPI.Util.FromJson<string[]>(selected_vehicles));
            CurrentRaces.Add(newRace);
            newRace.SendRaceToList();

            player.SendChatMessage(
                $"Hosted new race with the TrackName:  {newRace.Template.TrackName}, Hoster:  {newRace.Hoster.Name}, Duration:  {newRace.MaxDuration}s, MaxParticipants:  {newRace.MaxParticipants}.");
            Console.WriteLine(
                $"Hosted new race with the TrackName:  {newRace.Template.TrackName}, Hoster:  {newRace.Hoster.Name}, Duration:  {newRace.MaxDuration}s, MaxParticipants:  {newRace.MaxParticipants}. {newRace.SelectedVehicles.Count()}");
            player.Notify(Notifications.Type.Success, "Success", "Your race is now publicly hosted.");
            NAPI.Task.Run(
                () =>
                {
                    player.Notify(Notifications.Type.Success, "Hosted race", "You will now be teleported.");
                }, 2000);
        }

        [RemoteProc("serverside:SetIsInRaceList")]
        public bool SetIsInRaceManager(Player player, bool state)
        {
            player.SetData("inRaceList", state);
            Console.WriteLine(player.GetData<bool>("inRaceList"));
            return player.GetData<bool>("inRaceList");
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


        [RemoteProc("serverside:onJoinRace")] 
        public List<Vector3> JoinRace(Player player, int raceId)
        {

            if (CurrentRaces[raceId] == null)
            {
                player.Notify(Notifications.Type.Error, "Error", "The race with that id doesn't exist");
                return new List<Vector3>();
            }

            if (CurrentRaces[raceId].Racers.Count == CurrentRaces[raceId].MaxParticipants)
            {
                player.Notify(Notifications.Type.Error, "Error", "The lobby you are trying to join is full.");
                return new List<Vector3>();
            }
            
            // player.TriggerEvent("clientside:onJoinRace", CurrentRaces[raceId].Template.Checkpoints);
            player.Dimension = CurrentRaces[raceId].Dimension;
            var racer = CurrentRaces[raceId].AddRacer(player);
            player.SetData("currentCheckpoint", 0);
            player.SetSharedData("raceId", raceId);

            // var spawnpoint = CurrentRaces[raceId].FindEmptySpawnPoint();
            //  
            //
            // var veh = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey("neon"), spawnpoint.Position, spawnpoint.Heading, 200, 200, $"Race {raceId}");
            //
            // NAPI.Task.Run(() =>
            // {
            //    racer.SetVehicle(veh);
            //    racer.SpawnInVehicle();
            // }, 800);
            
            var parkSpot = CurrentRaces[raceId].FindEmptyParkSpot();
            Console.WriteLine(parkSpot.Coords);
            player.Position = parkSpot.Coords;
            var veh = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey("neon"), parkSpot.Coords, parkSpot.Heading, 200, 200, $"Race {raceId}", 255, false, true, CurrentRaces[raceId].Dimension);
            NAPI.Task.Run(() =>
            {
                racer.SetVehicle(veh);
                racer.SpawnInVehicle();
            }, 800);
            
            player.Notify(Notifications.Type.Success, "Success", $"Joined {CurrentRaces[raceId].Name}.");
            return CurrentRaces[raceId].Template.Checkpoints;
            
            //@TODO remove the hosted race from the list on host crash.
        }

        [Command("startrace")]
        public void StartRace(Player player)
        {
            var raceId = player.GetSharedData<int>("raceId");
            int startTime = 6000;
            
            foreach (var racer in CurrentRaces[raceId].Racers)
            {
                if (racer.Value.Participant is not null)
                {
                    racer.Value.Participant.TriggerEvent("clientside:onRaceStart", startTime - racer.Value.Participant.Ping);
                } 
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
            CurrentRaces[player.GetSharedData<int>("raceId")].RemoveRacer(player);
            player.ResetSharedData("raceId");
        }

        [Command("viewrace")]
        public void ViewRace(Player player, int raceId)
        {
            var race = CurrentRaces[raceId];
            player.SendChatMessage($"{race.Template.TrackName} {race.Template.SQLid} {race.Hoster.Name}");
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
            var playerRace = CurrentRaces[player.GetSharedData<int>("raceId")];

            playerRace.Racers[player.Id].HasFinished = true;
            if (!playerRace.Racers.Select(racer => racer.Value.HasWon).Any())
            {
                playerRace.Racers[player.Id].HasWon = true;
                foreach (var racer in playerRace.Racers.Values)
                {
                    racer.Participant.Notify(Notifications.Type.Success, $"{player.Name} has won the race!", "");
                }
            }
            
            foreach(var racer in playerRace.Racers)
            {
                racer.Value.Participant.Notify(Notifications.Type.Success, $"{player.Name} has finished the race!", "");
            }

            if (playerRace.Racers.Values.ToList().TrueForAll(racer => racer.HasFinished == true))
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
                Console.WriteLine($"{id++}. Track name: {race.Template.TrackName} | Category: {race.Template.Category} | Track creator: {race.Template.Creator} | Hoster: {race.Hoster.Name} | MaxDuration: {race.MaxDuration} | MaxParticipants: {race.MaxParticipants}");
                Console.WriteLine("Racers:");
                foreach(var racer in race.Racers)
                {
                    NAPI.Task.Run(() =>
                    {
                        Console.WriteLine($"\n Name: {racer.Value.Participant.Name} Position: {racer.Value.RacePosition}");
                    });
                    
                }
            }

            Console.WriteLine("=================================\n");
        }
    }
}

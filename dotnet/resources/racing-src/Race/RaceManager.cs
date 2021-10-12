using GTANetworkAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace racing_src.Race
{
    public class RaceManager : Script
    {

        [RemoteProc("serverside:SendTrackImages")]
        public static List<TrackImage> SendTrackImages(Player player)
        {
            return RaceData.TrackImages;
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

            var template = RaceData.RaceTemplates.Find(x => x.TrackName == trackname);
            if (template is null)
            {
                player.Notify(Notifications.Type.Error, "Invalid track name", "Please contact an administrator.");
                return;
            }

            var newRace = new Race(ref template, player,
                mode, laps, max_duration, max_participants, type, NAPI.Util.FromJson<string[]>(selected_vehicles));
            RaceData.CurrentRaces.Add(newRace);
            newRace.SendRaceToList();

            player.SendChatMessage(
                $"Hosted new race with the TrackName:  {newRace.Template.TrackName}, Hoster:  {newRace.Hoster.Name}, Duration:  {newRace.MaxDuration}s, MaxParticipants:  {newRace.MaxParticipants}.");
            Console.WriteLine(
                $"Hosted new race with the TrackName:  {newRace.Template.TrackName}, Hoster:  {newRace.Hoster.Name}, Duration:  {newRace.MaxDuration}s, MaxParticipants:  {newRace.MaxParticipants}. {newRace.SelectedVehicles.Count()}");
            player.Notify(Notifications.Type.Success, "Race hosted with success!", "Your race is now publicly hosted.");
            player.TriggerEvent("clientside:onJoinRace", RaceData.CurrentRaces.Count - 1);
        }

        [Command("cancelhost")]
        public void CancelHost(Player player)
        {
            var hostedrace = RaceData.CurrentRaces.Find(x => x.Hoster == player);
            RaceData.CurrentRaces.Remove(hostedrace);
            player.SendChatMessage("You are no longer hosting a race.");
        }


        [Command("displayraces")]
        public void DisplayRaces(Player player)
        {
            DisplayCurrentRaces();
        }


        [RemoteProc("serverside:onJoinRace")]
        public object JoinRace(Player player, int raceId)
        {

            if (RaceData.CurrentRaces[raceId] is null)
            {
                player.Notify(Notifications.Type.Error, "Error", "The race with that id doesn't exist");
                return null;
            }

            if (RaceData.CurrentRaces[raceId].Racers.Count == RaceData.CurrentRaces[raceId].MaxParticipants)
            {
                player.Notify(Notifications.Type.Error, "Error", "The lobby you are trying to join is full.");
                return null;
            }

            if (RaceData.CurrentRaces[raceId].HasStarted)
            {
                player.Notify(Notifications.Type.Error, "Error", "You cannot join a race that already started.");
                return null;
            }

            player.Dimension = RaceData.CurrentRaces[raceId].Dimension;
            var racer = RaceData.CurrentRaces[raceId].AddRacer(player);
            player.SetData("currentCheckpoint", 0);
            player.SetSharedData("raceId", raceId);
            player.SetData("inRaceList", false);
            player.SetSharedData("lap", 1);


            var parkSpot = RaceData.CurrentRaces[raceId].FindEmptyParkSpot(player);
            player.Position = parkSpot.Coords;
            var veh = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey("neon"), parkSpot.Coords, parkSpot.Heading, 200, 200, $"Race {raceId}", 255, false, true, RaceData.CurrentRaces[raceId].Dimension);
            NAPI.Task.Run(() =>
            {
                racer.SetVehicle(veh);
                racer.SpawnInVehicle();
            }, 800);

            player.SetData("inRaceList", false);
            player.Notify(Notifications.Type.Success, "Success", $"Joined {RaceData.CurrentRaces[raceId].Name}.");

            var playerRace = RaceData.CurrentRaces[raceId];

            return new { Checkpoints = playerRace.Template.Checkpoints, Mode = playerRace.Mode, Laps = playerRace.Laps };
        }

        //Event only for hoster
        [Command("preparerace")]
        public void PrepareRace(Player player)
        {
            if (!player.HasSharedData("raceId")) return;
            var raceId = player.GetSharedData<int>("raceId");

            foreach (var racer in RaceData.CurrentRaces[raceId].Racers)
            {
                racer.Value.Vehicle.Delete();
                var spawnPoint = RaceData.CurrentRaces[raceId].FindEmptySpawnPoint();
                racer.Value.Participant.Position = spawnPoint.Position;
                racer.Value.Participant.Transparency = 0;

                var vehicle = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey("seven70"), spawnPoint.Position,
                    spawnPoint.Heading, 0, 0, "ATH", 255, false, true, RaceData.CurrentRaces[raceId].Dimension);

                NAPI.Task.Run(() =>
                {
                    racer.Value.Participant.Transparency = 255;
                    racer.Value.SetVehicle(vehicle);
                    racer.Value.SpawnInVehicle();
                }, 800);
            }

            RaceData.CurrentRaces[raceId].InPreparation = true;

        }

        [Command("startrace")]
        public void StartRace(Player player)
        {
            var raceId = player.GetSharedData<int>("raceId");
            int startTime = 6000;

            foreach (var racer in RaceData.CurrentRaces[raceId].Racers)
            {
                if (racer.Value.Participant is not null)
                {
                    racer.Value.Participant.TriggerEvent("clientside:onRaceStart", startTime - racer.Value.Participant.Ping);
                }
            }
            RaceData.CurrentRaces[raceId].StartTimer();
            RaceData.CurrentRaces[raceId].HasStarted = true;
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
            return RaceData.CurrentRaces;
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
            RaceData.CurrentRaces[player.GetSharedData<int>("raceId")].RemoveRacer(player);
            player.SetSharedData("raceId", -1);
        }

        [Command("viewrace")]
        public void ViewRace(Player player, int raceId)
        {
            var race = RaceData.CurrentRaces[raceId];
            player.SendChatMessage($"{race.Template.TrackName} {race.Template.SQLid} {race.Hoster.Name}");
        }

        [RemoteEvent("serverside:OnPlayerEnterCheckpoint")]
        public void PlayerGetCheckpoint(Player player, int checkpointIndex)
        {
            player.SendChatMessage($"{player.Name} entered checkpoint {checkpointIndex}.");
            player.SetData("currentCheckpoint", checkpointIndex);
            player.SetData("Checkpoints", player.GetData<int>("Checkpoints") + 1);
        }

        [RemoteEvent("serverside:OnPlayerEnterFinishCheckpoint")]
        public void PlayerGetFinishCheckpoint(Player player)
        {
            var playerRace = RaceData.CurrentRaces[player.GetSharedData<int>("raceId")];

            playerRace.Racers[player.Id].HasFinished = true;
            if (!playerRace.Racers.Select(racer => racer.Value.HasWon).Any())
            {
                playerRace.Racers[player.Id].HasWon = true;
                foreach (var racer in playerRace.Racers.Values)
                {
                    racer.Participant.Notify(Notifications.Type.Success, $"{player.Name} has won the race!", "");
                }
            }

            foreach (var racer in playerRace.Racers)
            {
                racer.Value.Participant.Notify(Notifications.Type.Success, $"{player.Name} has finished the race!", "");
            }

            if (playerRace.Racers.Values.ToList().TrueForAll(racer => racer.HasFinished == true))
            {

                NAPI.Task.Run(() =>
                {
                    foreach (var racer in RaceData.CurrentRaces[player.GetSharedData<int>("raceId")].Racers)
                    {
                        racer.Value.Participant.SetSharedData("raceId", -1);
                        racer.Value.Vehicle.Delete();
                        racer.Value.Participant.TriggerEvent("clientside:GamemodeRacingSelected");
                    }

                    RaceData.CurrentRaces.Remove(playerRace);
                }, 10000);
            }

        }

        [ServerEvent(Event.PlayerDisconnected)]
        public void PlayerDisconnectedWhileInRace(Player player, DisconnectionType type, string reason)
        {
            if (player.GetSharedData<int>("raceId") == -1)
                return;

            var playerRace = RaceData.CurrentRaces[player.GetSharedData<int>("raceId")];

            if (playerRace.Hoster == player)
            {
                RaceData.CurrentRaces.Remove(RaceData.CurrentRaces[player.GetSharedData<int>("raceId")]);
                ConsoleInfo.WriteSuccess($"Hoster {player.Name} disconnected and his hosted race was removed.");
            }

            player.Vehicle.Delete();
            playerRace.RemoveRacer(player);
            playerRace.ParksStatus[player.GetSharedData<int>("raceId")] = false;
            Console.WriteLine($"Removed player {player.Name} from race.");
        }

        public static void DisplayCurrentRaces()
        {
            int id = 0;
            Console.WriteLine("\n=================================");

            foreach (var race in RaceData.CurrentRaces)
            {
                Console.WriteLine($"{id++}. Track name: {race.Template.TrackName} | Category: {race.Template.Category} | Track creator: {race.Template.Creator} | Hoster: {race.Hoster.Name} | MaxDuration: {race.MaxDuration} | MaxParticipants: {race.MaxParticipants}");
                Console.WriteLine("Racers:");
                foreach (var racer in race.Racers)
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

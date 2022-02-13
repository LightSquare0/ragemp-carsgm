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
            NAPI.ClientEvent.TriggerClientEventForAll("clientside:SendServerData");

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

            if (RaceData.CurrentRaces.ElementAtOrDefault(raceId) is null)
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

            return new { Checkpoints = playerRace.Template.Checkpoints, Mode = playerRace.Mode, Laps = playerRace.Laps, Duration = playerRace.MaxDuration, MaxParticipants = playerRace.MaxParticipants, HosterName = playerRace.Hoster.Name };
        }

        //Event only for hoster
        [RemoteEvent("serverside:PrepareRace")]
        public void PrepareRace(Player player)
        {
            if (player.GetSharedData<int>("raceId") < 0) return;

            var raceId = player.GetSharedData<int>("raceId");
            if (RaceData.CurrentRaces[raceId].Hoster != player) return;

            int posToBeAssigned = 1;
            foreach (var racer in RaceData.CurrentRaces[raceId].Racers)
            {
                racer.RacePosition = posToBeAssigned++;
                racer.Vehicle.Delete();
                var spawnPoint = RaceData.CurrentRaces[raceId].FindEmptySpawnPoint();
                racer.Participant.Transparency = 0;

                var vehicle = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey("cliors"), spawnPoint.Position,
                    spawnPoint.Heading, 0, 0, "ATH", 255, false, true, RaceData.CurrentRaces[raceId].Dimension);

                racer.SetVehicle(vehicle);
                racer.Participant.SetSharedData("IsInPreparedRace", true);
                vehicle.SetSharedData("assignedPlayer", racer.Participant.Id);
                NAPI.Task.Run(() =>
                {
                    racer.Participant.Transparency = 255;
                    racer.Participant.Position = spawnPoint.Position;
                }, 100);
            }

            RaceData.CurrentRaces[raceId].InPreparation = true;

        }

        [RemoteEvent("serverside:StartRace")]
        public void StartRace(Player player)
        {
            if (player.GetSharedData<int>("raceId") < 0) return;

            var raceId = player.GetSharedData<int>("raceId");
            int startTime = 6000;

            foreach (var racer in RaceData.CurrentRaces[raceId].Racers)
            {
                if (racer.Participant is not null)
                {
                    racer.Participant.TriggerEvent("clientside:onRaceStart", startTime - racer.Participant.Ping);
                }
            }

            NAPI.Task.Run(() =>
            {
                if (RaceData.CurrentRaces[raceId].Mode)
                    RaceData.CurrentRaces[raceId].StartTimer();
            }, startTime);

            RaceData.CurrentRaces[raceId].HasStarted = true;
        }

        [RemoteProc("serverside:SetIsInRaceList")]
        public bool SetIsInRaceManager(Player player, bool state)
        {
            player.SetData("inRaceList", state);
            return player.GetData<bool>("inRaceList");
        }

        [RemoteProc("serverside:SetIsInStartedRace")]
        public object SetIsInStartedRace(Player player, bool state)
        {
            player.SetSharedData("IsInStartedRace", state);
            return new { IsInStartedRace = player.GetSharedData<bool>("IsInStartedRace") };
        }

        [RemoteProc("serverside:SetIsInPreparedRace")]
        public object SetIsInPreparedRace(Player player, bool state)
        {
            player.SetSharedData("IsInPreparedRace", state);
            return new { SetIsInPreparedRace = player.GetSharedData<bool>("IsInPreparedRace") };
        }

        [RemoteProc("serverside:SendNumberOfParticipants")]
        public static int? SendNumberOfParticipants(Player player)
        {
            return RaceData.CurrentRaces[player.GetSharedData<int>("raceId")]?.Racers.Count;
        }

        [RemoteProc("serverside:SendInitialRaces")]
        public List<Race> SendInitialRaces(Player player)
        {
            return RaceData.CurrentRaces;
        }

        [RemoteEvent("serverside:SetCurrentLap")]
        public void SetCurrentLap(Player player, int lap)
        {
            var playerRace = RaceData.CurrentRaces.ElementAt(player.GetSharedData<int>("raceId"));
            if (playerRace is null) return;

            playerRace.Racers.Find(racer => racer?.Participant.Id == player.Id).Lap = lap;
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
            if (player.GetSharedData<int>("raceId") < 0) return;
            if (player.GetSharedData<int>("raceId") > RaceData.CurrentRaces.Count) return;

            var playerRace = RaceData.CurrentRaces[player.GetSharedData<int>("raceId")];

            player.SendChatMessage($"{player.Name} entered checkpoint {checkpointIndex}.");
            player.SetData("currentCheckpoint", checkpointIndex);
            player.SetData("Checkpoints", player.GetData<int>("Checkpoints") + 1);
            if (player.GetData<int>("Checkpoints") > playerRace.Template.Checkpoints.Count - 1)
                player.SetData("Checkpoints", 0);



            if (playerRace.Mode)
            {
                var racer = playerRace.Racers.Find(racer => racer.Participant.Id == player.Id);

                if (racer.CurrentCheckpoint == playerRace.Template.Checkpoints.Count && racer.RacePosition == 1 && playerRace.EndTimer.Enabled)
                {
                    playerRace.Laps++;
                    Console.WriteLine($"Updated lap to {playerRace.Laps}");
                }

            }

        }

        [RemoteEvent("serverside:OnPlayerEnterFinishCheckpoint")]
        public void PlayerGetFinishCheckpoint(Player player)
        {
            if (player.GetSharedData<int>("raceId") > RaceData.CurrentRaces.Count) return;

            var playerRace = RaceData.CurrentRaces[player.GetSharedData<int>("raceId")];

            playerRace.Racers.Find(racer => racer.Participant.Id == player.Id).HasFinished = true;
            if (!playerRace.Racers.Select(racer => racer.HasWon).Any())
            {
                playerRace.Racers[player.Id].HasWon = true;
                foreach (var racer in playerRace.Racers)
                {
                    racer.Participant.Notify(Notifications.Type.Success, $"{player.Name} has won the race!", "");
                }
            }

            foreach (var racer in playerRace.Racers)
            {
                racer.Participant.Notify(Notifications.Type.Success, $"{player.Name} has finished the race!", "");
            }

            if (playerRace.Racers.ToList().TrueForAll(racer => racer.HasFinished == true))
            {

                foreach (var racer in RaceData.CurrentRaces[player.GetSharedData<int>("raceId")].Racers)
                {
                    racer.Participant.TriggerEvent("clientside:RaceHasEnded");
                }
                NAPI.Task.Run(() =>
                {
                    foreach (var racer in RaceData.CurrentRaces[player.GetSharedData<int>("raceId")].Racers)
                    {
                        racer.Participant.SetSharedData("raceId", -1);
                        racer.Vehicle.Delete();
                        racer.Participant.TriggerEvent("clientside:GamemodeRacingSelected");
                    }
                    RaceData.CurrentRaces.Remove(playerRace);
                }, 10000);
            }
        }


        [ServerEvent(Event.PlayerDisconnected)]
        public void PlayerDisconnectedWhileInRace(Player player, DisconnectionType type, string reason)
        {
            if (!player.HasSharedData("raceId")) return;

            if (player.GetSharedData<int>("raceId") == -1)
                return;

            var playerRace = RaceData.CurrentRaces[player.GetSharedData<int>("raceId")];

            if (playerRace.HasStarted)
            {
                foreach (var racer in playerRace.Racers)
                {
                    racer.Participant.TriggerEvent("clientside:GetNumberOfParticipants");
                }
            }

            if (playerRace.Hoster == player)
            {
                RaceData.CurrentRaces.Remove(RaceData.CurrentRaces[player.GetSharedData<int>("raceId")]);
                ConsoleInfo.WriteSuccess($"Hoster {player.Name} disconnected and his hosted race was removed.");
            }

            if (player.IsInVehicle)
            {
                player.Vehicle.Delete();
            }
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
                        Console.WriteLine($"\n Name: {racer.Participant.Name} Position: {racer.RacePosition}");
                    });

                }
            }

            Console.WriteLine("=================================\n");
        }

    }
}

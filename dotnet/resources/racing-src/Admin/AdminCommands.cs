using GTANetworkAPI;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src.Admin
{
    class AdminCommands : Script
    {
        public static bool IsAdmin(Player player)
        {
            if(player.GetSharedData<int>("admin") <= 0)
            {
                player.SendChatMessage("You are not an admin");
                return false;
            }
            else
            {
                return true;
            }
        }

        public void SendMessageToAdmins(string message)
        {
            NAPI.Pools.GetAllPlayers().FindAll(player => IsAdmin(player)).ForEach(player => { player.SendChatMessage($"AdmCmd: {message}"); });
        }

        [Command("setadmin")]
        public void SetAdmin(Player player, Player target, int level)
        {
            
        }

        [Command("sveh")]
        public void SpawnAdminVehicle(Player player, string vehicle)
        {
            if (!IsAdmin(player))
                return;

            Vehicle veh = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey(vehicle), player.Position, player.Heading, 200, 200, "Admin", 255, false, true, player.Dimension);
            player.SetIntoVehicle(veh, 0);
        
        }

        [Command("arepair")]
        public void Arepair(Player player)
        {
            if (!IsAdmin(player))
                return;

            if (player.Vehicle.IsNull)
            {
                player.SendChatMessage("You are not in a vehicle");
                return;
            }

            player.Vehicle.Repair();
        }

        [Command("coords")]
        public void GetCoords(Player player)
        {
            if (!IsAdmin(player))
                return;

            player.SendChatMessage($"Current coords: {player.Position} | Heading: {player.Heading} | Dimension: {player.Dimension}.");
            if (player.IsInVehicle)
                Console.WriteLine($"POS: {player.Position} | Heading: {player.Heading} | Veh heading: {player.Vehicle.Heading}");
            else
                Console.WriteLine($"POS: {player.Position} | Heading: {player.Heading}");

        }

        [Command("gotocoords")]
        public void GotoCoords(Player player, float posx, float posy, float posz)
        {
            if (!IsAdmin(player))
                return;

            player.Position = new Vector3(posx, posy, posz);
            player.SendChatMessage($"Teleported to the following coords: {posx}, {posy}, {posz}");
        }

        [Command("weapon")]
        public void WeaponCommand(Player sender, WeaponHash hash)
        {
            NAPI.Player.GivePlayerWeapon(sender, hash, 500);
        }

        [Command("kill")]
        public void KillAdmin(Player player)
        {
            if (!IsAdmin(player))
                return;

            player.Health = 0;
        }

        [Command("vehicleremove", Alias = "vre")]
        public void RemoveVehicle(Player player)
        {
            if (!IsAdmin(player))
                return;

            if (!player.IsInVehicle)
            {
                player.SendChatMessage("You need to be in a vehicle.");
                return;
            }

            var vehicle = player.Vehicle;
            var id = vehicle.Id;
            vehicle.Delete();
            SendMessageToAdmins($"{player.Name} deleted a vehicle with the id {id}.");

        }

        [Command("vehiclearearemove", Alias = "va")]
        public void RemoveVehicleArea(Player player, int area)
        {
            if (!IsAdmin(player))
                return;

            var vehicles = NAPI.Pools.GetAllVehicles().Where(x => player.Position.DistanceTo(x.Position) < area);
            var count = vehicles.Count();
            var id = 0;
            foreach (var vehicle in vehicles)
            {
                id = vehicle.Id;
                vehicle.Delete();
            }
            SendMessageToAdmins($"{player.Name} deleted {count} vehicles in an area of {area}.");
        }

        [ServerEvent(Event.PlayerEnterColshape)]
        public void OnPlayerEnterColshape(ColShape shape, Player player)
        {
            player.SendChatMessage("asdas");
        }
    }
}

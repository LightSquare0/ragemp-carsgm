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

           bool toReturn = (player.GetSharedData<int>("admin") > 0);
            return toReturn;
        }

        [Command("sveh")]
        public void SpawnAdminVehicle(Player player, string vehicle)
        { 
            Vehicle veh = NAPI.Vehicle.CreateVehicle(NAPI.Util.GetHashKey(vehicle), player.Position, player.Heading, 200, 200, "Admin");
            player.SetIntoVehicle(veh, 0);
        
        }
        [Command("coords")]
        public void GetCoords(Player player)
        {
            player.SendChatMessage($"Current coords: {player.Position} | Heading: {player.Heading} | Dimension: {player.Dimension}.");
            Console.WriteLine($"{player.Position} {player.Heading}");
        }

        [Command("gotocoords")]
        public void GotoCoords(Player player, float posx, float posy, float posz)
        {
            player.Position = new Vector3(posx, posy, posz);
            player.SendChatMessage($"Teleported to the following coords: {posx}, {posy}, {posz}");
        }
    }
}

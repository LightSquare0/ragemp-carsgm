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
    }
}

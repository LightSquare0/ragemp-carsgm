using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GTANetworkAPI;

namespace racing_src.Players
{
    public class Players : Script
    {
        [RemoteEvent("serverside:SpawnPlayer")]
        public static void SpawnPlayer(Player player)
        {
            player.TriggerEvent("clientside:SpawnPlayer");
            player.Position = new Vector3(227.21216, 1172.314, 225.45993);
            player.Heading = -79;
        }

        [RemoteEvent("serverside:SetPlayerTransparency")]
        public static void SetPlayerTransparency(Player player, int transparency)
        {
            player.Transparency = transparency;
        }
    }
}

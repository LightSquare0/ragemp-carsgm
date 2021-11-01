using GTANetworkAPI;
using racing_src.Race;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src.Server
{
    public class ServerData : Script
    {
        public static int PlayerCount = 0;
        public static void IncreasePlayerCount() => PlayerCount++;

        public static void DecreasePlayerCount() => PlayerCount--;

        [RemoteProc("serverside:SendServerData")]
        public object SendServerData(Player player)
        {
            return new { Races = RaceData.CurrentRaces.Count, Online = PlayerCount };
        }
    }
}

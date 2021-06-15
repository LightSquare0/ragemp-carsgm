using System;
using GTANetworkAPI;

namespace racing_src
{
    public class Main : Script
    {
        [ServerEvent(Event.ResourceStart)]
        public void OnResourceStart()
        {
            Console.WriteLine("Server started");
            NAPI.Server.SetAutoSpawnOnConnect(false);
        }

    }
}

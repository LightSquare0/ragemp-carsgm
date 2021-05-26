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
            NAPI.Server.SetDefaultSpawnLocation(new Vector3(227.21216, 1172.314, 225.45993), -79);
        }

    }
}

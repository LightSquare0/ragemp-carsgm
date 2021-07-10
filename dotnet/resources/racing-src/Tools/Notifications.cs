using GTANetworkAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src
{
    public static class Notifications
    {
        public class Type
        {
            public const string Success = "success";
            public const string Error = "error";
        }

        public static void Notify(this Player player, string type, string title, string text)
        {
            player.TriggerEvent("clientside:DisplayNotification", type, title, text);
        }
    }
}

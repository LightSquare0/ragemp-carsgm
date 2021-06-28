using Dapper;
using GTANetworkAPI;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src
{
    public class AccountModel : Script
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public Player player { get; set; }
        public int Admin { get; set; }

        public AccountModel()
        {

        }

        public AccountModel(Player player)
        {
            this.player = player;
        }

        public static async Task LoadPlayerData(Player player, string username)
        {
            using (IDbConnection db = new MySqlConnection(Tools.GetConnectionString()))
            {
                string selectUserDataSQL = "SELECT * FROM accounts WHERE username = @username";

                var userParams = new
                {
                    username = username
                };

                var playerData = await db.QueryAsync<AccountModel>(selectUserDataSQL, userParams);
                foreach(var data in playerData)
                {
                    player.Name = data.Username;
                    player.SetSharedData("email", data.Email);
                    player.SetSharedData("admin", data.Admin);
                }
                player.SetSharedData("creatormode", false);

                player.SendChatMessage($"Welcome back, {player.Name}!");

            }
        }
    }
}

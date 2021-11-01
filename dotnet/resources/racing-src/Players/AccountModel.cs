using Dapper;
using GTANetworkAPI;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Threading.Tasks;

namespace racing_src
{
    public class AccountModel : Script
    {
        public string Username { get { return Player.Name; } set { Player.Name = value; } }
        public string Password { get; set; }
        public string Email { get { return Player.GetSharedData<string>("email"); } set { Player.SetSharedData("email", value); } }
        public int Admin { get { return Player.GetSharedData<int>("admin"); } set { Player.SetSharedData("admin", value); } }
        public Player Player { get; set; }
    
        public AccountModel() { }
        public AccountModel(Player player)
        {
           Player = player;
        }

        public static async Task LoadPlayerData(Player player, string username)
        {
            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
            {
                string selectUserDataSQL = "SELECT * FROM accounts WHERE username = @username";

                var userParams = new
                {
                    username = username
                };

                var reader = await db.ExecuteReaderAsync(selectUserDataSQL, userParams);
                while (reader.Read())
                {
                    AccountModel accountModel = new(player)
                    {
                        Username = (string)reader["username"],
                        Email = (string)reader["email"],
                        Admin = (int)reader["admin"]
                    };
                }
                reader.Close();
               
                player.SetSharedData("creatormode", false);
                player.SetSharedData("raceId", -1);
                player.SendChatMessage($"Welcome back, {player.Name}!");

            }
        }
    }
}

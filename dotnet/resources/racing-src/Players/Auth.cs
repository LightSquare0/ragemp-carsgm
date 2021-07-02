using Dapper;
using GTANetworkAPI;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src.Players
{
    public class Auth : Script
    {
        [ServerEvent(Event.PlayerConnected)]
        public void DisplayLogin(Player player)
        {
            player.Position = new Vector3(-640.68726, 36.51645, 61.35225);
            player.Transparency = 0;
        }

        [RemoteEvent("serverside:OnPlayerLogin")]
        public async Task OnPlayerLogin(Player player, string username, string password)
        {
            using (IDbConnection db = new MySqlConnection(Tools.GetConnectionString()))
            {
                string getUserSQL = "SELECT * FROM accounts WHERE username = @username AND password = @password";
                var loginParams = new
                {
                    username = username,
                    password = password
                };

                var exists = await db.ExecuteScalarAsync<bool>(getUserSQL, loginParams);
                if (exists)
                {
                    player.TriggerEvent("clientside:LoginResult", 1);
                    //player.SendChatMessage($"user exists: {username}, {password}");
                    player.Position = new Vector3(227.21216, 1172.314, 225.45993);
                    player.Heading = -79;
                    player.Transparency = 255;
                    await AccountModel.LoadPlayerData(player, username);
                }
                else
                {
                    //player.SendChatMessage($"user doesn't exist: {username}, {password}");
                    player.TriggerEvent("clientside:LoginResult", 0);
                }


            }
        }

        [RemoteEvent("serverside:OnPlayerRegister")]
        public async Task RegisterPlayer (Player player, string username, string password, string email)
        {
            using (IDbConnection db = new MySqlConnection(Tools.GetConnectionString()))
            {
                string selectUserSQL = "SELECT * FROM accounts WHERE username = @username OR email = @email";
                string insertUserSQL = "INSERT INTO accounts (username, password, email) VALUES (@username, @password, @email)";

                var userParams = new
                {
                    username = username,
                    email = email
                };

                var accountParams = new
                {
                    username = username,
                    password = password,
                    email = email
                };

                var exists = await db.ExecuteScalarAsync<bool>(selectUserSQL, userParams);
                if (exists)
                {
                    //player.SendChatMessage($"{username} already exists.");
                    player.TriggerEvent("clientside:RegisterResult", 0);
                }
                else
                {
                    await db.ExecuteAsync(insertUserSQL, accountParams);
                    player.TriggerEvent("clientside:RegisterResult", 1);
                    player.Position = new Vector3(227.21216, 1172.314, 225.45993);
                    player.Heading = -79;
                    player.Transparency = 255;
                    player.SendChatMessage($"Succesfully registered user with the following credentials: {username}, {password}, {email}.");
                }
            }
        }
    }
}

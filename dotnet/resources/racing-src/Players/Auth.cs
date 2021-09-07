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
        public void DisplayLogin(GTANetworkAPI.Player player)
        {
            player.Position = new Vector3(-45.322342, -824.4542, 1296.235);
            player.Transparency = 0;
        }

        [RemoteEvent("serverside:OnPlayerLogin")]
        public async Task OnPlayerLogin(GTANetworkAPI.Player player, string username, string password)
        {
            if (NAPI.Pools.GetAllPlayers().FindAll(x => x.Name == username).Count > 0)
            {
                player.Notify(Notifications.Type.Error, $"Already logged in!", $"A player with the name {username} is already logged in.");
                return;
            } 
            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
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
                    player.TriggerEvent("clientside:LoginResult", 1, player.Name);
                    await AccountModel.LoadPlayerData(player, username);
                    player.Notify(Notifications.Type.Success, $"Welcome {player.Name}", "Successfully logged in.");
                }
                else
                {
                    player.Notify(Notifications.Type.Error, "Wrong credentials!", "Please check your spelling and try again.");
                    player.TriggerEvent("clientside:LoginResult", 0);
                }

            }
        }

        [RemoteProc("serverside:samp")]
        public void SAMPPP()
        {

        }

        [RemoteEvent("serverside:OnPlayerRegister")]
        public async Task RegisterPlayer (GTANetworkAPI.Player player, string username, string password, string email)
        {
            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
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
                    player.Notify(Notifications.Type.Error, "An user with that name already exists", "Please pick another one and try again.");
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
                    player.Notify(Notifications.Type.Error, $"Welcome {username}", "Registered successfully.");

                }
            }
        }
    }
}

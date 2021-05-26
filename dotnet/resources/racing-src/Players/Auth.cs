﻿using Dapper;
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
                    player.SendChatMessage($"user exists: {username}, {password}");
                    await AccountModel.LoadPlayerData(player, username);
                }
                else
                {
                    player.SendChatMessage($"user doesn't exist: {username}, {password}");
                    player.TriggerEvent("clientside:LoginResult", 0);
                }


            }
        }

        //[RemoteEvent("serverside:OnPlayerRegister")]
        [Command("register")]
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
                    player.SendChatMessage($"{username} already exists.");
                }
                else
                {
                    await db.ExecuteAsync(insertUserSQL, accountParams);
                    player.SendChatMessage($"Succesfully registered user with the following credentials: {username}, {password}, {email}.");
                }
            }
        }
    }
}
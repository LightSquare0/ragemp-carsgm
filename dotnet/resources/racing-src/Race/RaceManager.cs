using Dapper;
using GTANetworkAPI;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src.Race
{

    

    public class RaceManager : Script
    {
        public class Race
        {
            public int SQLid { get; set; }
            public string TrackName { get; set; }
            public string Category { get; set; }
            public string Creator { get; set; }
            public Player Hoster { get; set; }
        }

        public List<Race> CurrentRaces = new();


        [Command("host")]
        public async Task HostRace(Player player, string racename)
        {
            using (IDbConnection db = new MySqlConnection(Database.GetConnectionString()))
            {

                string selectRaceSQL = "SELECT id SQLid, name TrackName, category Category, creator Creator FROM races WHERE name = @racename";
                var newRace = await db.QueryFirstOrDefaultAsync<Race>(selectRaceSQL, new { racename });
                Console.WriteLine(newRace.TrackName);
                newRace.Hoster = player;
                CurrentRaces.Add(newRace);

                player.SendChatMessage("Hosted new race with the name" + newRace.TrackName + newRace.Hoster.Name);

                foreach(var samp in CurrentRaces)
                {
                    Console.WriteLine(samp.TrackName);
                }
            }
        }

        [Command("cancelhost")]
        public void CancelHost(Player player)
        {
            var hostedrace = CurrentRaces.Find(x => x.Hoster == player);
            CurrentRaces.Remove(hostedrace);
        }

        [Command("displayraces")]
        public void DisplayRaces(Player player)
        {
            DisplayCurrentRaces();
        }

        public void DisplayCurrentRaces()
        {
            int id = 0;
            Console.WriteLine("\n=================================");
            CurrentRaces.ForEach(race => Console.WriteLine($"{id++}. Track name: {race.TrackName} | Category: {race.Category} | Track creator: {race.Creator} | Hoster: {race.Hoster.Name}"));
            Console.WriteLine("=================================\n");
        }
    }
}

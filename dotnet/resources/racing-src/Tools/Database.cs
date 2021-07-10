using Dapper;
using GTANetworkAPI;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static racing_src.Race.RaceCreator;

namespace racing_src
{
    public class Database : Script
    {
        public static string GetConnectionString() 
        {
            string server = "127.0.0.1";
            string database = "racing";
            string uid = "root";

            return $"Server={server}; Database={database}; Uid={uid};";
        }
            


        [ServerEvent(Event.ResourceStart)]
        public void TestConnection()
        {
            using (IDbConnection db = new MySqlConnection(GetConnectionString()))
            {
                try
                {
                    db.Open();
                    Console.WriteLine($"MySql connected to {db.Database}");
                }
                catch (MySqlException exception)
                {
                    Console.WriteLine(exception);
                }
            }
        }
        
    }
}

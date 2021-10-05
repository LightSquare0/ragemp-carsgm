using GTANetworkAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace racing_src.Race
{
    public class Park
    {
        public Vector3 Coords { get; set; }
        public double Heading { get; set; }
        public bool Occupied { get; set; }

        public Park(Vector3 coords, double heading, bool occupied)
        {
            Coords = coords;
            Heading = heading;
            Occupied = occupied;
        }
    }

    public class Racer
    {
        public float DistanceToCheckpoint(Vector3 point)
        {
            return Participant.Position.DistanceTo(point);
        }

        public int RacePosition
        {
            get { return Participant.GetData<int>("racePosition"); }
            set { Participant.SetData<int>("racePosition", value); }
        }

        public Player Participant { get; set; }
        public int CurrentCheckpoint
        {
            get { return Participant.GetData<int>("currentCheckpoint"); }
            set { Participant.SetData<int>("currentCheckpoint", value); }
        }
        public int Checkpoints
        {
            get { return Participant.GetData<int>("Checkpoints"); }
            set {  Participant.SetData<int>("Checkpoints", value); }
        }

        public bool HasFinished { get; set; }
        public bool HasWon { get; set; }
        public Racer(int position, Player participant)
        {
            Participant = participant;
            RacePosition = position;
            HasFinished = false;
            HasWon = false;
        }
    }

    public class Spawnpoint
    {
        public Vector3 Position { get; set; }
        public float Heading { get; set; }
        public bool Occupied { get; set; }
        public Spawnpoint(Vector3 position, float rotation, bool occupied)
        {
            Position = position;
            Heading = rotation;
            Occupied = occupied;
        }

    }

    public class RaceTemplate
    {
        public int SQLid { get; set; }
        public string TrackName { get; set; }
        public string Category { get; set; }
        public string Creator { get; set; }
        [JsonIgnore]
        public List<Vector3> Checkpoints { get; set; }
        [JsonIgnore]
        public List<Spawnpoint> Spawnpoints { get; set; }
        public string Image { get; set; }
        public RaceTemplate() { }
        public RaceTemplate(int sqlid, string trackname, string category, string creator, List<Vector3> checkpoints, List<Spawnpoint> spawnpoints)
        {
            SQLid = sqlid;
            TrackName = trackname;
            Category = category;
            Creator = creator;
            Checkpoints = checkpoints;
            Spawnpoints = spawnpoints;
        }
    }

    public class TrackImage
    {
        public string name { get; set; }
        public string image { get; set; }
        public string state { get; set; }
    }

    public class Race : RaceTemplate
    {
        public Guid Guid { get; set; }
        [JsonIgnore]
        public Player Hoster { get; set; }
        public int MaxParticipants { get; set; }
        public string Name { get; set; }
        public bool Mode { get; set; }
        public int Laps { get; set; }
        public int MaxDuration { get; set; }
        public bool HasStarted { get; set; }
        public bool HasEnded { get; set; }
        public string Type { get; set; }
        public string[] SelectedVehicles { get; set; }
        [JsonIgnore]
        public List<Spawnpoint> _Spawnpoints { get; set; }
        public List<Racer> Racers { get; set; }
        public Race(int sqlid, string trackname, string category, string creator, Player hoster, bool mode, int laps, int max_duration, int max_participants, string type, string image, string[] selected_vehicles)
        {
            Guid = Guid.NewGuid(); 
            Racers = new List<Racer>();
            SQLid = sqlid;
            TrackName = trackname;
            Category = category;
            Creator = creator;
            Hoster = hoster;
            Mode = mode;
            Laps = laps;
            HasStarted = false;
            HasEnded = false;
            MaxParticipants = max_participants;
            MaxDuration = max_duration;
            Type = type;
            Image = image;
            Name = Hoster.Name + "'s race";
            Checkpoints = new List<Vector3>();
            SelectedVehicles = selected_vehicles;
        }

        public void AddRacer(int position, Player player)
        {
            Racers.Add(new Racer(position, player));
        }
        public void RemoveRacer(Player participant)
        {
            var racer = Racers.Find(racer => racer.Participant == participant);
            if (racer == null)
            {
                Console.WriteLine("RemoveRacer: ERROR ! Tried to update non existent racer id.");
                return;
            }
            Racers.Remove(racer);
        }

        public void SendRaceToList()
        {
            foreach (var player in NAPI.Pools.GetAllPlayers())
            {
                if (player.HasData("inRaceList") && player.GetData<bool>("inRaceList"))
                {
                    player.TriggerEvent("clientside:SendRaceToList",  this);
                    Console.WriteLine("sa trimis");
                }
            }
        }
    }
    
}

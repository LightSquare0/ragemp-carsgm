using GTANetworkAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using Newtonsoft.Json;

namespace racing_src.Race
{
    public class Park
    {
        public Vector3 Coords { get; set; }
        public float Heading { get; set; }
        public Park(Vector3 coords, float heading)
        {
            Coords = coords;
            Heading = heading;
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
            get { return Participant.GetSharedData<int>("racePosition"); }
            set { Participant.SetSharedData("racePosition", value); }
        }
        public int Lap
        {
            get { return Participant.GetSharedData<int>("lap"); }
            set { Participant.SetSharedData("lap", value); }
        }
        public string ParticipantName { get; set; }
        [JsonIgnore]
        public Player Participant { get; set; }
        [JsonIgnore]
        public Vehicle Vehicle { get; set; }
        public int CurrentCheckpoint
        {
            get { return Participant.GetData<int>("currentCheckpoint"); }
            set { Participant.SetData("currentCheckpoint", value); }
        }
        public int Checkpoints
        {
            get { return Participant.GetData<int>("Checkpoints"); }
            set { Participant.SetData("Checkpoints", value); }
        }

        public bool HasFinished { get; set; }
        public bool HasWon { get; set; }
        public Racer(Player participant)
        {
            ParticipantName = participant.Name;
            Participant = participant;
            RacePosition = 0;
            HasFinished = false;
            HasWon = false;
        }

        public void SetVehicle(Vehicle veh)
        {
            Vehicle = veh;
        }

        public void SpawnInVehicle()
        {
            Participant.SetIntoVehicle(Vehicle, 0);
        }
    }

    public class Spawnpoint
    {
        public Vector3 Position { get; set; }
        public float Heading { get; set; }
        public Spawnpoint(Vector3 position, float rotation)
        {
            Position = position;
            Heading = rotation;
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

    public class Race
    {
        public Guid Guid { get; set; }
        public uint Dimension { get; set; }
        [JsonIgnore]
        public Player Hoster { get; set; }
        public int MaxParticipants { get; set; }
        public string Name { get; set; }
        public bool Mode { get; set; }
        public int Laps { get; set; }
        public int MaxDuration { get; set; }
        public Timer EndTimer { get; set; }
        public bool HasStarted { get; set; }
        public bool InPreparation { get; set; }
        public bool HasEnded { get; set; }
        public string Type { get; set; }
        public string[] SelectedVehicles { get; set; }
        [JsonIgnore]
        public bool[] SpawnPointsStatus { get; set; }
        [JsonIgnore]
        public bool[] ParksStatus { get; set; }
        public RaceTemplate Template { get; set; }
        public List<Racer> Racers { get; set; }

        public Race(ref RaceTemplate template, Player hoster, bool mode, int laps,
            int max_duration, int max_participants, string type, string[] selected_vehicles)
        {
            Template = template;
            Dimension = RaceData.DimensionIncrementator++;
            Guid = Guid.NewGuid();
            Hoster = hoster;
            Racers = new List<Racer>();
            Mode = mode;
            Laps = laps;
            HasStarted = false;
            HasEnded = false;
            MaxParticipants = max_participants;
            MaxDuration = max_duration;
            Type = type;
            Name = Hoster.Name + "'s race";
            SelectedVehicles = selected_vehicles;
            SpawnPointsStatus = new bool[Template.Spawnpoints.Count];
            ParksStatus = new bool[RaceData.ParksSpots.Count];
            EndTimer = new Timer();
        }

        public void StartTimer()
        {
            if (!Mode) return;


            EndTimer.Interval = (DateTime.Now.AddMinutes(MaxDuration) - DateTime.Now).TotalMilliseconds; /*10000*/;
            EndTimer.AutoReset = false;
            EndTimer.Elapsed += RunTimer;
            EndTimer.Start();
            NAPI.Task.Run(() =>
            {
                foreach (var racer in Racers)
                {
                    racer.Participant.TriggerEvent("clientside:SetTimerState", true);
                    racer.Participant.SendChatMessage("RACE TIMER STARTED!");
                }

            });

        }

        public void RunTimer(object sender, ElapsedEventArgs e)
        {
            EndTimer.Stop();
            NAPI.Task.Run(() =>
            {
                foreach (var racer in Racers)
                {
                    racer.Participant.TriggerEvent("clientside:SetTimerState", false);
                    racer.Participant.SendChatMessage("RACE TIMER ENDED!");
                }

            });
        }

        public Racer AddRacer(Player player)
        {
            var racer = new Racer(player);
            Racers.Add(racer);
            return racer;
        }
        public void RemoveRacer(Player participant)
        {
            var racer = Racers.Find(racer => racer.Participant.Id == participant.Id);
            if (racer is null)
            {
                Console.WriteLine("RemoveRacer: ERROR! Tried to update non existent racer id.");
                return;
            }
            Racers.Remove(racer);
        }

        public Spawnpoint FindEmptySpawnPoint()
        {
            for (int i = 0; i < Template.Spawnpoints.Count(); i++)
            {
                if (!SpawnPointsStatus[i])
                {
                    SpawnPointsStatus[i] = true;
                    return Template.Spawnpoints[i];
                }
            }

            return null;
        }

        public Park FindEmptyParkSpot(Player player)
        {
            for (int i = 0; i < Template.Spawnpoints.Count(); i++)
            {
                if (!ParksStatus[i])
                {
                    ParksStatus[i] = true;
                    player.SetData("parkId", i);
                    return RaceData.ParksSpots[i];
                }
            }

            return null;
        }

        public void SendRaceToList()
        {
            foreach (var player in NAPI.Pools.GetAllPlayers())
            {
                if (player.HasData("inRaceList") && player.GetData<bool>("inRaceList"))
                {
                    player.TriggerEvent("clientside:SendRaceToList", this);
                }
            }
        }
    }
}

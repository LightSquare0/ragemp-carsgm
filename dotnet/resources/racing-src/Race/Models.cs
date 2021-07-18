using GTANetworkAPI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace racing_src.Race
{
    public class Checkpoint
    {
        public double X { get; set; }
        public double Y { get; set; }
        public double Z { get; set; }
    }
    public class Racer
    {
        public float DistanceToCheckpoint(Vector3 point)
        {
            return Participant.Position.DistanceTo(point);
        }

        public int RacePosition
        {
            get
            {
                return Participant.GetData<int>("racePosition");
            }
            set
            {
                Participant.SetData<int>("racePosition", value);
            }
        }

        public Vector3 WorldPosition { get; set; }
        public Player Participant { get; set; }
        public int CurrentCheckpoint
        {
            get
            {
                return Participant.GetData<int>("currentCheckpoint");
            }
            set
            {
                Participant.SetData<int>("currentCheckpoint", value);
            }
        }
        public int Checkpoints
        {
            get
            {
                return Participant.GetData<int>("Checkpoints");
            }
            set
            {
                Participant.SetData<int>("Checkpoints", value);
            }
        }

        public bool HasFinished { get; set; }
        public Racer(int position, Player participant)
        {
            Participant = participant;
            RacePosition = position;
            HasFinished = false;
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
        public List<Vector3> Checkpoints { get; set; }
        public List<Spawnpoint> Spawnpoints { get; set; }
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

    public class Race : RaceTemplate
    {
        public Player Hoster { get; set; }
        public int MaxParticipants { get; set; }
        public int MaxDuration { get; set; }
        public bool HasStarted { get; set; }
        public bool HasEnded { get; set; }
        public List<Spawnpoint> _Spawnpoints { get; set; }
        public List<Racer> Racers { get; set; }
        public Race(int sqlid, string trackname, string category, string creator, Player hoster, int max_participants, int max_duration)
        {
            Racers = new List<Racer>();
            SQLid = sqlid;
            TrackName = trackname;
            Category = category;
            Creator = creator;
            Hoster = hoster;
            HasStarted = false;
            HasEnded = false;
            MaxParticipants = max_participants;
            MaxDuration = max_duration;
            Checkpoints = new List<Vector3>();
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

        
        
    }
}

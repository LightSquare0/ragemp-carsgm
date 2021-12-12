import { useContext, useState } from "react";
import { UserContext } from "../../../Globals/UserContext";

export interface ServerData {
  Player: {
    Name: string;
    Id: number;
  };
  Races: number;
  Online: number;
  Clock: {
    Year: string;
    Month: string;
    Day: string;
    Hour: string;
    Minute: string;
  };
}

export interface UserData {
  IsInStartedRace: boolean;
  CurrentRace: {
    Laps: number;
    Mode: boolean;
    TotalPoints: number;
    EndTime: number;
    MaxParticipants: number;
    NumberOfParticipants: number;
    Player: {
      CurrentLap: number;
      RacePosition: number;
      CurrentPoint: number;
    };
  };
}

export const UserDataProvider: React.FC = (props) => {
  const [ServerData, setServerData] = useState<ServerData>({
    Player: { Name: "loading", Id: -1 },
    Races: 0,
    Online: 0,
    Clock: {
      Year: "",
      Month: "",
      Day: "",
      Hour: "",
      Minute: "",
    },
  });

  mp.events.add("react:GetServerData", (playerName, playerId, _ServerData) => {
    let data = JSON.parse(_ServerData);
    setServerData({
      Player: { Name: playerName, Id: playerId },
      Online: data.Online,
      Races: data.Races,
      Clock: {
        Year: ServerData.Clock.Year,
        Month: ServerData.Clock.Month,
        Day: ServerData.Clock.Day,
        Hour: ServerData.Clock.Hour,
        Minute: ServerData.Clock.Minute,
      },
    });
  });

  const [userData, setUserData] = useState<UserData>({
    IsInStartedRace: false,
    CurrentRace: {
      Laps: 0,
      Mode: false,
      TotalPoints: 0,
      EndTime: 0,
      MaxParticipants: 0,
      NumberOfParticipants: 0,
      Player: { CurrentLap: 0, RacePosition: 0, CurrentPoint: 0 },
    },
  });

  mp.events.add("react:GetRacePosition", (racePosition) => {
    setUserData({
      ...userData,
      CurrentRace: {
        ...userData.CurrentRace,
        Player: { ...userData.CurrentRace.Player, RacePosition: racePosition },
      },
    });
  });

  mp.events.add(
    "react:GetCurrentRaceInformation",
    (totalPoints, mode, laps, maxParticipants) => {
      setUserData({
        ...userData,
        CurrentRace: {
          ...userData.CurrentRace,
          Mode: mode,
          Laps: laps,
          TotalPoints: totalPoints,
          MaxParticipants: maxParticipants,
        },
      });
      console.log(totalPoints, mode, laps);
    }
  );

  mp.events.add("react:SetIsInStartedRace", (state) => {
    setUserData({
      ...userData,
      IsInStartedRace: state,
    });
  });

  mp.events.add("react:GetNumberOfParticipants", (numberOfParticipants) => {
    setUserData({
      ...userData,
      CurrentRace: {
        ...userData.CurrentRace,
        NumberOfParticipants: numberOfParticipants,
      },
    });
  });

  mp.events.add("react:GetCurrentPoint", (currentPoint) => {
    setUserData({
      ...userData,
      CurrentRace: {
        ...userData.CurrentRace,
        Player: { ...userData.CurrentRace.Player, CurrentPoint: currentPoint },
      },
    });
  });

  mp.events.add("react:SetCurrentLap", (lap) => {
    setUserData({
      ...userData,
      CurrentRace: {
        ...userData.CurrentRace,
        Player: { ...userData.CurrentRace.Player, CurrentLap: lap },
      },
    });
  });

  return (
    <UserContext.Provider
      value={{ userData, setUserData, ServerData, setServerData }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

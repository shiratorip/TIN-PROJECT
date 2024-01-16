CREATE TABLE Gamer (
    id integer NOT NULL CONSTRAINT Gamer_pk PRIMARY KEY,
    nickname varchar(20) NOT NULL,
    avatar_url varchar(100) NOT NULL,
    password varchar(20) NOT NULL,
    description varchar(500) NOT NULL,
    platform varchar(20) NOT NULL
);

CREATE TABLE Tournament (
    id integer NOT NULL CONSTRAINT Tournament_pk PRIMARY KEY,
    name varchar(20) NOT NULL,
    start_date Date NOT NULL,
    end_date Date NOT NULL,
    game_name varchar(20) NOT NULL,
    banner_url varchar(100) NOT NULL,
    description varchar(500) NOT NULL
);
CREATE TABLE Participation (
    id integer NOT NULL CONSTRAINT Participation_pk PRIMARY KEY,
    position integer NOT NULL,
    prize varchar(20) NOT NULL,
    Tournament_id integer NOT NULL,
    Gamer_id integer NOT NULL,
    CONSTRAINT Participation_Tournament FOREIGN KEY (Tournament_id)
    REFERENCES Tournament (id),
    CONSTRAINT Participation_Gamer FOREIGN KEY (Gamer_id)
    REFERENCES Gamer (id)
);

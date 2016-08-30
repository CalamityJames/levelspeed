var levels = [ 0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    10,
    10,
    10,
    15,
    20,
    20,
    20,
    25,
    25,
    50,
    75,
    100,
    125,
    150,
    190,
    200,
    250,
    300,
    350,
    500,
    500,
    750,
    1000,
    1250,
    1500,
    2000,
    2500,
    3000,
    5000
];

levels = levels.map(x => 1000*x);

export default levels;

export var totalXp = {
    30 : levels.slice(0,30).reduce((x, y) => x+y, 0),
    40 : levels.reduce((x, y) => x+y, 0)
};
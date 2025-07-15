import React, { Component } from 'react'

import levels, {totalXp} from './levels';

var levelsToShow = {
    30 : [1,15,20,23,25,26,27,28,29,30],
    40 : [1,25,30,33,35,36,37,38,39,40],
    50 : [1,40,42,43,44,45,46,47,48,49,50]
}
var levelMajor = {
    30 : [1,15,20,25,30],
    40 : [1,25,30,35,40],
    50 : [1,30,40,45,50]
};

// Mobile-friendly levels - fewer levels to avoid clutter
var levelsToShowMobile = {
    30 : [1,15,20,25,30],
    40 : [1,25,30,35,40],
    50 : [1,40,42,43,44,45,46,47,48,49,50]
};

export default class Header extends Component {

    render() {

        var levelStats = [];
        var isMobile = window.innerWidth < 768; // Check if mobile
        var levelsToUse = isMobile ? levelsToShowMobile : levelsToShow;

        var xpSoFar = 0;
        levels.forEach((xp, index) => {
            var level = index+1;
            xpSoFar += xp;
            if (levelsToUse[this.props.goal].indexOf(level) !== -1) {
                levelStats.push({
                    level : level,
                    totalXp : xpSoFar,
                    perc : xpSoFar / totalXp[this.props.goal],
                    minor : levelMajor[this.props.goal].indexOf(level) === -1
                });
            }
        });
        var elems = [];
        levelStats.forEach((level) => {
            var levelStyle = {
                left : (100 * level.perc) + '%'
            };
            elems.push(
                <div 
                    className={`absolute transform -translate-x-1/2 ${level.minor ? 'opacity-60' : ''}`} 
                    style={levelStyle} 
                    key={level.level}
                >
                    <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 font-bold text-gray-700 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                        {level.level}
                    </div>
                    <div className={`rounded-full ${level.minor ? 'bg-gray-300' : 'bg-gray-500'} ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
                </div>
            );
        });
        var youStyle = {
            left : (100 * this.props.perc) + '%'
        };
        
        return (
            <div className="mt-8 px-2 md:px-4">
                <div className={`relative bg-gray-200 rounded-full mx-2 ${isMobile ? 'h-3' : 'h-4'}`} style={{marginTop: isMobile ? '20px' : '24px', marginBottom: isMobile ? '32px' : '40px'}}>
                    <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                    {elems}
                    <div className="absolute transform -translate-x-1/2 transition-all duration-300" style={youStyle}>
                        <div className={`bg-red-500 rounded-full ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
                        <div className={`absolute left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded-lg font-bold ${isMobile ? 'top-5 text-xs' : 'top-6 text-sm'}`}>
                            YOU
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-red-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
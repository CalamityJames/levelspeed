import React, { Component } from 'react'

import Input from "./Input";
import Result from "./Result";
import Visualization from './Visualization';
import Github from '../Github';

import levelXp, {totalXp} from './levels';
var MAX_LEVEL = levelXp.length;

// Utility function to format numbers with commas
function formatNumber(num) {
    if (num === '?' || num === '?????') return num;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calcStats(xp) {

    
    if (xp === '?') {
        return {
            level : '?',
            xpLeft : '?????',
            xpGoal : 176000000
        };
    }
    var level = 0;
    var xpLeft = xp;
    while (level < MAX_LEVEL && xpLeft - levelXp[level] >= 0) {
        xpLeft -= levelXp[level];
        level++;
    }
    if (level === 50) {
        xpLeft = levelXp[levelXp.length-1]
    }
    return {
        level : level,
        xpLeft : xpLeft,
        xpGoal : levelXp[level] || levelXp[levelXp.length-1]
    };
}

export default class Header extends Component {

    render() {

        var stats = calcStats(this.props.xp);
        
        var perc = stats.xpLeft / stats.xpGoal;
        var progressStyle = {
            width : (100*perc) + '%',
        };
        var totalPerc = Math.min(1, this.props.xp / totalXp[this.props.goal]);
        var validData = totalPerc >= 0 && this.props.date !== null
            && this.props.date < (new Date());

        var resultComponents = (
            <div className="transition-all duration-500 ease-in-out overflow-hidden" style={{maxHeight: validData ? '1000px' : '120px'}}>
                <div className="border-t border-gray-300 mx-4 my-6"></div>
                {validData ? (
                    <div className="space-y-6">
                        <Result startDate={this.props.date} xp={this.props.xp} goal={this.props.goal} />
                        <Visualization perc={totalPerc} goal={this.props.goal} />
                    </div>
                ) : (
                    <div className="text-gray-500 text-lg tracking-wide">
                        ENTER XP AND START DATE<br />
                        TO SEE YOUR RESULTS
                    </div>
                )}
            </div>
        );

        var isDisabled = this.props.xp === '?';

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-4 md:py-8 px-2 md:px-4">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-8">
                    <div className="text-center">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8 leading-tight">
                            POKEMON GO<br/>
                            <span className="text-blue-600">LEVEL SPEED CALCULATOR</span>
                        </h1>
                        
                        {/* XP Input Section */}
                        <div className="mb-8 px-4 md:px-0">
                            <div className="flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl px-4 md:px-6 py-3 cursor-text hover:border-blue-400 transition-colors w-full max-w-lg mx-auto"
                                 onClick={()=>{this.input1.focus();}}>
                                <Input 
                                    value={this.props.xp} 
                                    className="bg-transparent text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 outline-none flex-1 text-center min-w-0 overflow-hidden" 
                                    ref={(c) => {this.input1 = c}}
                                    onChange={(evt) => this.props.setXp(evt.target.value)}
                                />
                                <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 ml-2 flex-shrink-0">XP</span>
                            </div>
                        </div>

                        {/* Current Level Display */}
                        <div className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-300 ${isDisabled ? 'opacity-50 blur-sm' : 'text-blue-600'}`}>
                            Level {stats.level}
                        </div>

                        {/* Progress Bar */}
                        <div className={`mb-8 transition-all duration-300 ${isDisabled ? 'opacity-50 blur-sm' : ''}`}>
                            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out relative"
                                    style={progressStyle}
                                >
                                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-lg"></div>
                                </div>
                            </div>
                            <div className="mt-4 bg-gray-100 rounded-xl py-3 px-4">
                                <div className="text-lg font-medium text-gray-600">
                                    {formatNumber(stats.xpLeft)} / {formatNumber(stats.xpGoal)} XP
                                </div>
                            </div>
                        </div>

                        {/* Input Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Start Date */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Start Date
                                </label>
                                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 cursor-text hover:border-blue-400 transition-colors min-w-0"
                                     onClick={()=>{this.input2.focus();}}>
                                    <Input 
                                        value={this.props.dateStr} 
                                        className="bg-transparent text-lg font-semibold text-gray-700 outline-none w-full text-center min-w-0"
                                        ref={(c) => {this.input2 = c}}
                                        onChange={(evt) => this.props.setStartDate(evt.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Level Goal */}
                            <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">
                                    Target Level
                                </label>
                                <div className="flex rounded-xl overflow-hidden border-2 border-gray-200">
                                    {[30, 40, 50].map((level) => (
                                        <button
                                            key={level}
                                            className={`flex-1 py-3 px-4 text-lg font-semibold transition-all duration-200 ${
                                                this.props.goal === level
                                                    ? 'bg-blue-600 text-white shadow-lg'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                            onClick={() => this.props.setGoal(level)}
                                        >
                                            {level}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        {resultComponents}

                        {/* GitHub Link */}
                        <div className="mt-8 opacity-70">
                            <Github/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
/*
 <ContentEditable
 tagName="span"
 html="as"
 disabled={false}
 onChange={(evt) => this.props.setXp(evt.target.value)}
 /> XP*/
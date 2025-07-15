import React, { Component } from 'react'

import { totalXp } from './levels';

export default class Header extends Component {

    render() {

        var DAY = 1000*60*60*24;

        var today = new Date();
        var numberOfDays = Math.max(1, (Math.round((today - this.props.startDate)/DAY)-1));

        var xpPerDay = Math.floor(this.props.xp / numberOfDays);

        var xpTodo = totalXp[this.props.goal] - this.props.xp;

        var resultText = '';
        var secondLine = '';
        var firstLine = '';
        var isComplete = false;
        
        if (xpTodo > 0) {
            var daysUntil50 = Math.ceil(xpTodo / xpPerDay);

            if (xpPerDay !== 0) {
                secondLine = `(OR ${daysUntil50} DAYS)`;
            }
            if (daysUntil50 >= 365*20) { // years
                secondLine = 'SORRY...';
                firstLine = `YOU WILL NEVER REACH LEVEL ${this.props.goal}`;
            } else if (daysUntil50 >= 340) { // years
                var years = Math.floor(daysUntil50 / 365);
                var restMonths = Math.floor((daysUntil50 % 365) / 31);
                if (restMonths >= 9) {
                    restMonths = 0;
                    years++;
                }
                if (years === 1) {
                    resultText = '1 YEAR';
                } else {
                    resultText = years + ' YEARS';
                }
                if (restMonths >= 3 && years <= 2) {
                    resultText += ', ' + restMonths + ' MONTHS';
                }
                firstLine = `YOU WILL REACH LEVEL ${this.props.goal} IN`;
            } else if (daysUntil50 >= 30) { // months
                var months = Math.ceil(daysUntil50 / 30.5);
                if (months === 1) {
                    resultText = '1 MONTH';
                } else {
                    resultText = months + ' MONTHS';
                }
                firstLine = `YOU WILL REACH LEVEL ${this.props.goal} IN`;
            } else {
                resultText = daysUntil50 + ' DAYS';
                secondLine = '(KEEP IT UP!)';
                firstLine = `YOU WILL REACH LEVEL ${this.props.goal} IN`;
            }
        } else {
            firstLine = 'YOU DID IT!';
            secondLine = 'CONGRATULATIONS 🎉';
            isComplete = true;
        }

        return (
            <div className="space-y-4 text-center">
                <div className="bg-blue-50 rounded-xl p-6">
                    <div className="text-gray-700 mb-2">YOU ARE MAKING:</div>
                    <div className="text-2xl font-bold text-blue-600">{xpPerDay} XP / DAY</div>
                </div>
                
                <div className="space-y-2">
                    <div className="text-gray-700 text-lg tracking-wide">
                        {firstLine}
                    </div>
                    {resultText && (
                        <div className={`text-3xl md:text-4xl font-bold py-2 ${isComplete ? 'text-green-600' : 'text-purple-600'}`}>
                            {resultText}
                        </div>
                    )}
                    {secondLine && (
                        <div className={`text-lg tracking-wide ${isComplete ? 'text-green-600' : secondLine.includes('SORRY') ? 'text-red-600' : 'text-gray-600'}`}>
                            {secondLine}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
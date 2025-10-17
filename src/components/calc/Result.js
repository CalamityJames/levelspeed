import React, { Component } from 'react'

import { totalXp } from './levels';

// Utility function to format numbers with commas
function formatNumber(num) {
    if (num === '?' || num === '?????') return num;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

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
                secondLine = `(OR ${formatNumber(daysUntil50)} DAYS)`;
            }
            if (daysUntil50 >= 365*20) { // years
                secondLine = 'Sorry...';
                firstLine = `You will never reach  ${this.props.goal} 😔`;
            } else if (daysUntil50 >= 340) { // years
                var years = Math.floor(daysUntil50 / 365);
                var restMonths = Math.floor((daysUntil50 % 365) / 31);
                if (restMonths >= 9) {
                    restMonths = 0;
                    years++;
                }
                if (years === 1) {
                    resultText = '1 year';
                } else {
                    resultText = years + ' year';
                }
                if (restMonths >= 3 && years <= 2) {
                    resultText += ', ' + restMonths + ' months';
                }
                firstLine = `You will reach level ${this.props.goal} in`;
            } else if (daysUntil50 >= 30) { // months
                var months = Math.ceil(daysUntil50 / 30.5);
                if (months === 1) {
                    resultText = '1 month';
                } else {
                    resultText = months + ' month';
                }
                firstLine = `You will reach level ${this.props.goal} in`;
            } else {
                resultText = formatNumber(daysUntil50) + ' days';
                secondLine = '(keep it up! 🙌)';
                firstLine = `YYou will reach level ${this.props.goal} in`;
            }
        } else {
            firstLine = 'You did it!';
            secondLine = 'Congratulations 🎉';
            isComplete = true;
        }

        return (
            <div className="space-y-4 text-center">
                <div className="bg-blue-50 rounded-xl p-6">
                    <div className="text-gray-700 mb-2">You are making:</div>
                    <div className="text-2xl font-bold text-blue-600">{formatNumber(xpPerDay)} XP / day</div>
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
                        <div className={`text-lg tracking-wide ${isComplete ? 'text-green-600' : secondLine.includes('Sorry') ? 'text-red-600' : 'text-gray-600'}`}>
                            {secondLine}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

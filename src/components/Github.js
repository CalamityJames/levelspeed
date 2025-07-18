import React, { Component } from 'react'

export default class Github extends Component {

    render() {

        return (
            <div className="text-gray-500 text-sm">
                <div className="border-t border-gray-300 mb-4"></div>
                <div className="space-y-2">
                    <div>Made with ❤️ for Pokemon Go trainers</div>
                    <div className="text-xs opacity-75">
                        Based on trainerlevelspeed.de by <a href="https://github.com/thomasdondorf/poke-level-calc" target="_blank">thomasdondorf</a>
                    </div>
                </div>
            </div>
        );
    }
}
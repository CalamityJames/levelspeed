import React, { Component } from 'react';

export default class Input extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width : 0,
            className : props.className,
            startUp : true
        };
    }

    handleChange(evt) {
        if (this.props.onChange) {
            this.props.onChange(evt);
        }
    }

    realUpdateWidth() {
        var width = this.testElem.offsetWidth;
        var parentWidth = this.testElem.parentElement ? this.testElem.parentElement.offsetWidth : 0;
        var targetWidth = Math.max(width + 20, 120); // More padding and higher minimum
        
        // If parent has flex-1 class, use available space
        if (this.testElem.parentElement && this.testElem.parentElement.classList.contains('flex-1')) {
            targetWidth = Math.max(targetWidth, parentWidth - 100); // Leave space for "XP" label
        }
        
        if (Math.abs(this.state.width - targetWidth) > 2) {
            this.setState({
                width: targetWidth
            });
        }
    }

    updateWidth() {
        if (this.state.startUp) {
            setTimeout(() => { // wow, seems to be correct: http://stackoverflow.com/a/34999925/5627599
                window.requestAnimationFrame(() => {
                    this.realUpdateWidth();
                });
            }, 0);
        } else {
            this.realUpdateWidth();
        }
    }

    componentDidMount() {
        this.updateWidth();
        setTimeout(() => { // wow, seems to be correct: http://stackoverflow.com/a/34999925/5627599
            window.requestAnimationFrame(() => {
                this.setState({
                    startUp : false
                });
            });
        }, 0);
    }

    componentDidUpdate() {
        this.updateWidth();
    }

    focussed() {
        this.elem.select();
    }

    focus() {
        this.elem.focus();
    }

    render(){
        // For flex-1 inputs, don't constrain width - let it be flexible
        var hasFlexClass = this.props.className && this.props.className.includes('flex-1');
        var inputStyle = hasFlexClass ? {} : {
            width : this.state.width
        };
        
        return (
            <span>
                <span className="absolute left-[-1000px] top-[-100000px] pointer-events-none" style={{fontSize: 'inherit', fontFamily: 'inherit', fontWeight: 'inherit'}} ref={(c) => {this.testElem = c}}>{this.props.value}</span>
                <input type="text" className={this.props.className}
                       value={this.props.value} style={inputStyle}
                       onFocus={this.focussed.bind(this)}
                       ref={(c) => {this.elem = c}} onChange={this.handleChange.bind(this)} />
            </span>
        );
    }
};
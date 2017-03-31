var React = require('react');
var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
getInitialState: function () {
    return {
      count: 0,
      countdownStatus: 'stopped'
    };
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started': 
        this.startTimer();
        break;
        case 'stopped':
        this.setState({count: 0});
        case 'paused':
        clearInterval(this.timer)
        this.timer = undefined;
        break;
      }
    }
  },
  handleStatusChange: function (newStatus) {
    this.setState({countdownStatus: newStatus});
  },
  handleSetCountdown: function () {
     this.setState({
       countdownStatus: 'started'
     });
  }, 
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count+1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });
      if (newCount === 0) {
        this.setState({countdownStatus: 'stopped'});
      }
    }, 1000);
  },
  componentWillUnmount: function () {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  render: function () {
    var{count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if (countdownStatus !== 'started') {
        return <Controls countdownStatus={'paused'} onStatusChange={this.handleStatusChange}/>
      } else {
        return <Controls countdownStatus={'started'} onStatusChange={this.handleStatusChange}/>
      }
    };

    return (
     <div>
      <h1 className="page-title">Timer App</h1>
      <Clock totalSeconds={count}/>
     {renderControlArea()}
    </div>  
    );
  }
});

module.exports = Timer;
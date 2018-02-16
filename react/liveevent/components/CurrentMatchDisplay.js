import React from 'react'
import PropTypes from 'prop-types'

import PowerupCount from './PowerupCount'

const CurrentMatchDisplay = (props) => {
  const { match, matchState } = props

  if (match === null) {
    return <div><span className="glyphicon glyphicon-refresh glyphicon-refresh-animate" /></div>
  }
  if (!matchState) {
    return <div>Live match info not available</div>
  }

  const {
    mode,
    timeRemaining,
    redScore,
    redForceCount,
    redForcePlayed,
    redLevitateCount,
    redLevitatePlayed,
    redBoostCount,
    redBoostPlayed,
    redSwitchOwned,
    redScaleOwned,
    redCurrentPowerup,
    redPowerupTimeRemaining,
    redAutoQuest,
    redFaceTheBoss,
    blueScore,
    blueForceCount,
    blueForcePlayed,
    blueLevitateCount,
    blueLevitatePlayed,
    blueBoostCount,
    blueBoostPlayed,
    blueSwitchOwned,
    blueScaleOwned,
    blueCurrentPowerup,
    bluePowerupTimeRemaining,
    blueAutoQuest,
    blueFaceTheBoss,
  } = matchState

  let progressColor
  if (mode === 'post_match' || (timeRemaining === 0 && mode === 'teleop')) {
    progressColor = 'progress-bar-danger'
  } else if (timeRemaining <= 30 && mode === 'teleop') {
    progressColor = 'progress-bar-warning'
  } else {
    progressColor = 'progress-bar-success'
  }

  let progressWidth
  if (mode === 'post_match') {
    progressWidth = '100%'
  } else if (mode === 'teleop') {
    progressWidth = `${((150 - timeRemaining) * 100) / 150}%`
  } else if (mode === 'auto') {
    progressWidth = `${((15 - timeRemaining) * 100) / 150}%`
  } else {
    progressWidth = '0%'
  }

  let currentPowerup = null
  let powerupTimeRemaining = null
  let powerupColor = null
  if (redCurrentPowerup) {
    currentPowerup = redCurrentPowerup
    powerupTimeRemaining = redPowerupTimeRemaining
    powerupColor = 'red'
  } else if (blueCurrentPowerup) {
    currentPowerup = blueCurrentPowerup
    powerupTimeRemaining = bluePowerupTimeRemaining
    powerupColor = 'blue'
  }

  const year = match.key.substring(0, 4)
  return (
    <div className="row liveEventPanel">
      <div className="col-xs-4">
        <div className={`booleanIndicator ${redScaleOwned && 'red'}`}>Scale</div>
        <div className={`booleanIndicator ${redSwitchOwned && 'red'}`}>Switch</div>
        <div className="powerupsContainer">
          <PowerupCount color="red" type="force" count={redForceCount} played={redForcePlayed} />
          <PowerupCount color="red" type="levitate" count={redLevitateCount} played={redLevitatePlayed} isCenter />
          <PowerupCount color="red" type="boost" count={redBoostCount} played={redBoostPlayed} />
        </div>
        <div className={`booleanIndicator ${redAutoQuest && 'red'}`}>Auto Quest</div>
        <div className={`booleanIndicator ${redFaceTheBoss && 'red'}`}>Face The Boss</div>
      </div>
      <div className="col-xs-4 middleCol">
        <div className="progress">
          <div className={`progress-bar ${progressColor}`} style={{ width: progressWidth }} />
          <div className="timeRemainingContainer">
            <span className="timeRemaining">{ timeRemaining }</span>
          </div>
        </div>
        <div className="scoreContainer">
          <div className="redAlliance">
            {match.alliances.red.team_keys.map((teamKey) => {
              const teamNum = teamKey.substring(3)
              return <div key={teamKey} ><a href={`/team/${teamNum}/${year}`}>{teamNum}</a></div>
            })}
            <div className="score red">{ redScore }</div>
          </div>
          <div className="blueAlliance">
            {match.alliances.blue.team_keys.map((teamKey) => {
              const teamNum = teamKey.substring(3)
              return <div key={teamKey} ><a href={`/team/${teamNum}/${year}`}>{teamNum}</a></div>
            })}
            <div className="score blue">{ blueScore }</div>
          </div>
        </div>
        {currentPowerup &&
          <div className={`currentPowerup ${powerupColor}`}>
            <img src={`/images/2018_${currentPowerup}.png`} className="currentPowerupIcon" role="presentation" />
            { powerupTimeRemaining }
          </div>
        }
      </div>
      <div className="col-xs-4">
        <div className={`booleanIndicator ${blueScaleOwned && 'blue'}`}>Scale</div>
        <div className={`booleanIndicator ${blueSwitchOwned && 'blue'}`}>Switch</div>
        <div className="powerupsContainer">
          <PowerupCount color="blue" type="force" count={blueForceCount} played={blueForcePlayed} />
          <PowerupCount color="blue" type="levitate" count={blueLevitateCount} played={blueLevitatePlayed} isCenter />
          <PowerupCount color="blue" type="boost" count={blueBoostCount} played={blueBoostPlayed} />
        </div>
        <div className={`booleanIndicator ${blueAutoQuest && 'blue'}`}>Auto Quest</div>
        <div className={`booleanIndicator ${blueFaceTheBoss && 'blue'}`}>Face The Boss</div>
      </div>
    </div>
  )
}

CurrentMatchDisplay.propTypes = {
  match: PropTypes.object,
  matchState: PropTypes.object,
}

export default CurrentMatchDisplay
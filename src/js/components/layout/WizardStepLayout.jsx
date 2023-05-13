import React from "react"
import { times } from 'lodash'
import classNames from 'classnames'

import Card from '../standard/Card.jsx'

const WizardStepLayout = props => {
  const { numberOfSteps, activeStep } = props
  return (
    <Card>
      <div className="flex">
        <div className="flex-1">
          {props.children}
        </div>
        <div className="flex-0">
          <div className="flex gap-x-4">
            {
              times(numberOfSteps, step => {
                const stepClasses = classNames({
                  "w-10 h-10 rounded-full font-bold flex items-center justify-center text-white": true,
                  "bg-dark-50": step+1 != activeStep,
                  "bg-primary": step+1 == activeStep
                })
                return (
                  <div className={stepClasses}>{step+1}</div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Card>
  );
}

export default WizardStepLayout;